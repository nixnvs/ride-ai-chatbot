import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat } from '@/components/chat';
import { MobileChat } from '@/components/mobile-chat';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import type { DBMessage } from '@/lib/db/schema';
import type { Attachment, UIMessage } from 'ai';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  if (chat.visibility === 'private') {
    if (!session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage['parts'],
      role: message.role as UIMessage['role'],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: '',
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get('chat-model');

  // Check if user is on mobile
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  const initialMessages = convertToUIMessages(messagesFromDb);
  const initialChatModel = chatModelFromCookie?.value || DEFAULT_CHAT_MODEL;
  const initialVisibilityType = chat.visibility;
  const isReadonly = session?.user?.id !== chat.userId;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <MobileChat
          id={chat.id}
          initialMessages={initialMessages}
          initialChatModel={initialChatModel}
          initialVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          session={session}
          autoResume={true}
        />
        <DataStreamHandler id={id} />
      </div>
    );
  }

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={initialMessages}
        initialChatModel={initialChatModel}
        initialVisibilityType={initialVisibilityType}
        isReadonly={isReadonly}
        session={session}
        autoResume={true}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
