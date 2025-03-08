
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

    const deepSeekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepSeekApiKey) {
      throw new Error("DeepSeek API key not found");
    }

    let systemPrompt = "You are a helpful coding assistant. ";
    
    if (language) {
      systemPrompt += `You are specialized in ${language} programming. `;
    }
    
    systemPrompt += "Provide clear, concise explanations with relevant code examples when appropriate. Format code blocks with proper syntax highlighting using markdown triple backticks. Focus on best practices and clear explanations.";
    
    if (includeCode) {
      systemPrompt += " Always include practical code examples in your responses.";
    }

    console.log(`Processing prompt: "${prompt.slice(0, 50)}..." with DeepSeek's model`);

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepSeekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-coder', // Using DeepSeek's coder model for programming questions
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
      console.error('DeepSeek API error:', error);
      throw new Error(`DeepSeek API error: ${error.error?.message || 'Unknown error'}`);
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
