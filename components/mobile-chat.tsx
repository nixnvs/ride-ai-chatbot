'use client';

import type { UIMessage } from 'ai';
import type { VisibilityType } from './visibility-selector';
import type { Session } from 'next-auth';
import ChatMobileLayout from './mobile-chat-layout';

export function MobileChat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}) {
  return <ChatMobileLayout chatId={id} />;
}
