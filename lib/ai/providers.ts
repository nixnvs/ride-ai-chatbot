import { customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';

export const myProvider = customProvider({
  languageModels: {
    'chat-model': openai.chat('gpt-4'),
  },
});
