import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

export const myProvider = customProvider({
  languageModels: {
    'openai-gpt-4o': openai.chat('gpt-4o'),
    'gemini-pro': google.chat('models/gemini-pro'),
  },
});
