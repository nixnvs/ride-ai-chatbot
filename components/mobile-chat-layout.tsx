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
    'Design a database schema',
    'Explain airplane turbulence',
    'Current traffic',
    'Rideshare prices',
  ];

  return (
    <div className="flex flex-col h-screen bg-[#fafbfc]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-2xl">
        <button type="button" className="text-2xl">
          ☰
        </button>
        <div className="font-semibold text-base text-gray-800">Ride</div>
        <button type="button" className="text-xl">
          ✏️
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center relative overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            {/* Centered Logo */}
            <div className="flex-1 flex items-center justify-center">
              <span className="text-5xl text-gray-400">◎</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full px-4 py-3 space-y-2">
            {messages.map((m, idx) => (
              <div
                key={m.id}
                className={`max-w-[80%] p-2 rounded-lg text-sm break-words ${
                  m.role === 'user'
                    ? 'bg-blue-100 self-end text-right ml-auto'
                    : 'bg-gray-100 self-start text-left mr-auto'
                }`}
              >
                <span className="font-medium">
                  {m.role === 'user' ? 'You:' : 'Ride:'}
                </span>{' '}
                {m.content}
              </div>
            ))}
            {status === 'streaming' && (
              <div className="text-sm text-gray-400 px-2">
                Ride is typing...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggestions (always visible, but overlay if keyboard is open) */}
      <div className="w-full px-2 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="px-3 py-2 text-sm bg-gray-200 rounded-full whitespace-nowrap border border-gray-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-white rounded-b-2xl"
        style={{ minHeight: 60 }}
      >
        {/* Icons */}
        <button type="button" className="text-xl px-1" tabIndex={-1}>
          📷
        </button>
        <button type="button" className="text-xl px-1" tabIndex={-1}>
          🖼️
        </button>
        <button type="button" className="text-xl px-1" tabIndex={-1}>
          🎧
        </button>
        {/* Input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message"
          className="flex-1 border-none outline-none bg-transparent px-3 py-2 text-sm"
        />
        {/* Send / Mic */}
        <button
          type="submit"
          disabled={status === 'submitted' || status === 'streaming'}
          className="text-blue-600 font-medium text-xl disabled:opacity-50"
        >
          {input.trim() ? '➤' : '🎤'}
        </button>
      </form>
    </div>
  );
}
