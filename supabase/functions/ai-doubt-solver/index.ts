
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
    const { prompt, language, includeCode } = await req.json();
    
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    // First try DeepSeek API key, then fall back to FAST API key
    const deepSeekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    const fastApiKey = Deno.env.get('FAST_API_KEY');
    
    // Check which API we'll use
    let apiUrl, apiKey, modelName;
    
    if (deepSeekApiKey) {
      console.log("Using DeepSeek API");
      apiUrl = 'https://api.deepseek.com/v1/chat/completions';
      apiKey = deepSeekApiKey;
      modelName = 'deepseek-coder'; // Using DeepSeek's coder model for programming questions
    } else if (fastApiKey) {
      console.log("Using FAST API");
      apiUrl = 'https://api.fastai-hf.com/v1/chat/completions';
      apiKey = fastApiKey;
      modelName = 'mistralai/Mistral-7B-Instruct-v0.2';
    } else {
      throw new Error("No AI API key found (DEEPSEEK_API_KEY or FAST_API_KEY)");
    }

    let systemPrompt = "You are a helpful coding assistant. ";
    
    if (language) {
      systemPrompt += `You are specialized in ${language} programming. `;
    }
    
    systemPrompt += "Provide clear, concise explanations with relevant code examples when appropriate. Format code blocks with proper syntax highlighting using markdown triple backticks. Focus on best practices and clear explanations.";
    
    if (includeCode) {
      systemPrompt += " Always include practical code examples in your responses.";
    }

    console.log(`Processing prompt: "${prompt.slice(0, 50)}..." with ${modelName}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('AI API error:', error);
      throw new Error(`AI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;
    console.log(`Generated response of length: ${answer.length} characters`);

    return new Response(
      JSON.stringify({ answer }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in AI doubt solver function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
