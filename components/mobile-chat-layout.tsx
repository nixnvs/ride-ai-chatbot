'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { generateUUID, fetchWithErrorHandlers } from '@/lib/utils';
import { toast } from './toast';
import { ChatSDKError } from '@/lib/errors';

export default function ChatMobile({ chatId }: { chatId: string }) {
  const { messages, input, setInput, handleSubmit, status, append } = useChat({
    id: chatId,
    generateId: generateUUID,
    sendExtraMessageFields: true,
    fetch: fetchWithErrorHandlers,
    experimental_throttle: 100,
    experimental_prepareRequestBody: (body) => ({
      id: chatId,
      message: body.messages.at(-1),
    }),
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast({ type: 'error', description: error.message });
      }
    },
  });

  const suggestions = [
    'Route to downtown',
    'Current traffic',
    'Rideshare prices',
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Message history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="text-sm p-2 rounded-md bg-gray-100">
            <span className="font-medium">
              {m.role === 'user' ? 'You:' : 'Ride:'}
            </span>{' '}
            {m.content}
          </div>
        ))}
      </div>

      {/* Suggestions (only if no messages yet) */}
      {messages.length === 0 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setInput(s)}
                className="px-3 py-2 text-sm bg-gray-200 rounded-full"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-4 border-t"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Ride..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={status === 'submitted' || status === 'streaming'}
          className="text-blue-600 font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}
