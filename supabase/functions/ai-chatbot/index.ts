
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

    // Use only Gemini API
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyDWWJW4xqbHpW7LbFMS0PehZSNasLGPZZo';
    
    if (!geminiApiKey) {
      throw new Error("Gemini API key is required");
    }
    
    console.log("Using Gemini API");
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    // Format for Gemini API
    const systemPrompt = 'You are a helpful AI assistant for SkillNest, a learning platform. Be concise, friendly, and helpful. Use markdown for formatting and code blocks where appropriate.';
    
    // Create Gemini-formatted messages
    const requestBody = {
      contents: [
        {
          parts: [
            { text: systemPrompt }
          ]
        },
        ...messages.map(msg => ({
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    };

    console.log(`Processing chat with ${messages.length} messages using Gemini API`);

    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add API key as query param for Gemini
    const response = await fetch(`${apiUrl}?key=${geminiApiKey}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Transform Gemini API response
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response generated from Gemini");
    }
    
    const answer = { content: data.candidates[0].content.parts[0].text };
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
