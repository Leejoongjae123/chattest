"use client";
import { useCallback, useState, useEffect } from "react";
import {
  Chat,
  useCreateChatClient,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import { createToken } from "@/lib/action";
import "stream-chat-react/dist/css/v2/index.css";

function StreamChat({ userData }) {
  const tokenProvider = useCallback(async () => {
    return await createToken(userData.id);
  }, [userData.id, createToken]);
  console.log(tokenProvider);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData,
  });

  const sort = { last_message_at: -1 };
  const filters = {
    type: "messaging",
    members: { $in: [userData.id] },
  };
  const options = {
    limit: 10,
  };

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client} theme='str-chat__theme-custom'>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default StreamChat;
