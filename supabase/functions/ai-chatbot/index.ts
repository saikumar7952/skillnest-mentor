
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

    // First try DeepSeek API key, then fall back to FAST API key
    const deepSeekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    const fastApiKey = Deno.env.get('FAST_API_KEY');
    
    if (!deepSeekApiKey && !fastApiKey) {
      throw new Error("No AI API key found (DEEPSEEK_API_KEY or FAST_API_KEY)");
    }
    
    // Check which API we'll use
    let apiUrl, apiKey, modelName;
    
    if (deepSeekApiKey) {
      console.log("Using DeepSeek API");
      apiUrl = 'https://api.deepseek.com/v1/chat/completions';
      apiKey = deepSeekApiKey;
      modelName = 'deepseek-chat';
    } else if (fastApiKey) {
      console.log("Using FAST API");
      apiUrl = 'https://api.fastai-hf.com/v1/chat/completions';
      apiKey = fastApiKey;
      modelName = 'mistralai/Mistral-7B-Instruct-v0.2';
    }

    console.log(`Processing chat with ${messages.length} messages using ${modelName}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant for SkillNest, a learning platform. Be concise, friendly, and helpful. Use markdown for formatting and code blocks where appropriate.' },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('AI API error:', error);
      throw new Error(`AI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message;
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
