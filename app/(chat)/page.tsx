import { cookies, headers } from 'next/headers';

import { Chat } from '@/components/chat';
import { MobileChat } from '@/components/mobile-chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  // Check if user is on mobile
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  const chatModel = modelIdFromCookie?.value || DEFAULT_CHAT_MODEL;

  // Render mobile-first interface
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <MobileChat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={chatModel}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </div>
    );
  }

  // Fallback to desktop interface with mobile wrapper for desktop users who want mobile experience
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile preview for desktop */}
      <div className="hidden lg:flex items-center justify-center min-h-screen p-8">
        <div className="mr-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Experience Ride Mobile
          </h1>
          <p className="text-gray-600 mb-6">
            Our new mobile-first interface brings you a Maps-style experience
            optimized for transportation and travel queries.
          </p>
          <div className="space-y-3 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Interactive Maps Interface
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Voice Input Support
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Real-time Transportation Data
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Location-Aware Responses
            </div>
          </div>
        </div>

        <MobileChat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={chatModel}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </div>

      {/* Mobile interface for smaller screens */}
      <div className="lg:hidden flex items-center justify-center min-h-screen p-4">
        <MobileChat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={chatModel}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </div>
    </div>
  );
}
