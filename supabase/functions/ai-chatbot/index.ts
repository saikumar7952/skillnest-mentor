
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Valid messages array is required");
    }

    // Try API keys in order: Gemini, DeepSeek, FAST
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyDWWJW4xqbHpW7LbFMS0PehZSNasLGPZZo';
    const deepSeekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    const fastApiKey = Deno.env.get('FAST_API_KEY');
    
    if (!geminiApiKey && !deepSeekApiKey && !fastApiKey) {
      throw new Error("No AI API key found (GEMINI_API_KEY, DEEPSEEK_API_KEY, or FAST_API_KEY)");
    }
    
    // Check which API we'll use
    let apiUrl, apiKey, modelName, requestBody, transformResponse;
    
    if (geminiApiKey) {
      console.log("Using Gemini API");
      apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
      apiKey = geminiApiKey;
      modelName = 'gemini-pro';
      
      // Format for Gemini API
      const systemPrompt = 'You are a helpful AI assistant for SkillNest, a learning platform. Be concise, friendly, and helpful. Use markdown for formatting and code blocks where appropriate.';
      
      // First message is the system prompt
      requestBody = {
        contents: [
          {
            parts: [
              { text: systemPrompt }
            ]
          },
          ...messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          }))
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      };
      
      // Transform Gemini API response to chat format
      transformResponse = (data) => {
        if (!data.candidates || data.candidates.length === 0) {
          throw new Error("No response generated from Gemini");
        }
        const content = data.candidates[0].content.parts[0].text;
        return { content };
      };
      
      // Add API key as query param for Gemini
      apiUrl = `${apiUrl}?key=${apiKey}`;
    } else if (deepSeekApiKey) {
      console.log("Using DeepSeek API");
      apiUrl = 'https://api.deepseek.com/v1/chat/completions';
      apiKey = deepSeekApiKey;
      modelName = 'deepseek-chat';
      
      requestBody = {
        model: modelName,
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant for SkillNest, a learning platform. Be concise, friendly, and helpful. Use markdown for formatting and code blocks where appropriate.' },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };
      
      // Transform DeepSeek API response to chat format
      transformResponse = (data) => {
        return data.choices[0].message;
      };
    } else if (fastApiKey) {
      console.log("Using FAST API");
      apiUrl = 'https://api.fastai-hf.com/v1/chat/completions';
      apiKey = fastApiKey;
      modelName = 'mistralai/Mistral-7B-Instruct-v0.2';
      
      requestBody = {
        model: modelName,
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant for SkillNest, a learning platform. Be concise, friendly, and helpful. Use markdown for formatting and code blocks where appropriate.' },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };
      
      // Transform FAST API response to chat format
      transformResponse = (data) => {
        return data.choices[0].message;
      };
    }

    console.log(`Processing chat with ${messages.length} messages using ${modelName}`);

    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header for DeepSeek and FAST APIs
    if (deepSeekApiKey || fastApiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('AI API error:', error);
      throw new Error(`AI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const answer = transformResponse(data);
    console.log(`Generated response of length: ${answer.content.length} characters`);

    return new Response(
      JSON.stringify(answer),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in AI chatbot function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
