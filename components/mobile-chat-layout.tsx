'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { generateUUID, fetchWithErrorHandlers } from '@/lib/utils';
import { toast } from './toast';
import { ChatSDKError } from '@/lib/errors';
import MobileMapsInterface from './mobile-maps-interface';

export default function ChatMobile({
  chatId,
  initialChatModel,
}: { chatId: string; initialChatModel: string }) {
  const [showChat, setShowChat] = useState(false);
  const { messages, input, setInput, handleSubmit, status, append } = useChat({
    id: chatId,
    generateId: generateUUID,
    sendExtraMessageFields: true,
    fetch: async (...args) => {
      // Log the request body
      if (typeof args[1]?.body === 'string') {
        try {
          const parsed = JSON.parse(args[1].body);
          // eslint-disable-next-line no-console
          console.log('[MobileChat] Sending request body:', parsed);
        } catch {}
      }
      const res = await fetchWithErrorHandlers(...args);
      // Log the response
      try {
        const data = await res.clone().json();
        // eslint-disable-next-line no-console
        console.log('[MobileChat] Received response:', data);
      } catch {}
      return res;
    },
    experimental_throttle: 100,
    experimental_prepareRequestBody: (body) => ({
      id: chatId,
      message: body.messages.at(-1),
      selectedChatModel: initialChatModel,
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
    <div className="relative w-full h-full min-h-screen">
      {/* Map as background */}
      <MobileMapsInterface />
      {/* Chat overlay as bottom sheet */}
      <div
        className={`fixed left-0 bottom-0 w-full max-w-[400px] mx-auto z-20 transition-transform duration-300 ${
          showChat
            ? 'translate-y-0'
            : 'translate-y-[70%] md:translate-y-[60%] pointer-events-none'
        }`}
        style={{ right: 0 }}
      >
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 p-0">
          {/* Drag handle and close button */}
          <div className="flex items-center justify-between px-4 pt-2 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />
            {showChat && (
              <button
                type="button"
                className="text-gray-400 text-xl ml-auto"
                onClick={() => setShowChat(false)}
                aria-label="Minimize chat"
              >
                ⬇️
              </button>
            )}
          </div>
          {/* Chat content */}
          <div
            className={`transition-opacity duration-200 ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Existing chat UI below */}
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
        </div>
      </div>
      {/* Message box overlay (when chat is minimized) */}
      {!showChat && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-10 pointer-events-none">
          <div className="bg-white rounded-t-2xl shadow-lg w-full max-w-md mx-auto p-4 mb-2 pointer-events-auto">
            <button
              type="button"
              className="w-full text-gray-500 text-center py-2 rounded-full border border-gray-200 bg-gray-50"
              style={{ fontSize: '1.1rem' }}
              onClick={() => setShowChat(true)}
            >
              Message Ride...
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
