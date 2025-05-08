import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
 Channel,
 ChannelHeader,
 Chat as ChatStream,
 MessageInput,
 MessageList,
 Thread,
 Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import CallBtn from "../components/CallBtn";
import ChatLoader from "../components/ChatLoader";

export const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const Chat = () => {
 const { id: targetUserId } = useParams();
 const [chatClient, setChatClient] = useState(null);
 const [channel, setChannel] = useState(null);
 const [loading, setLoading] = useState(true);

 const { authUser } = useAuthUser();

 const { data: tokenData } = useQuery({
  queryKey: ["streamToken"],
  queryFn: getStreamToken,
  enabled: !!authUser, // this will run only when authUser is available
 });

 useEffect(() => {
  const initChat = async () => {
   if (!tokenData?.token || !authUser) return;
   try {
    console.log("Initializing stream chat client...");
    const client = StreamChat.getInstance(STREAM_API_KEY);
    await client.connectUser(
     {
      id: authUser._id,
      name: authUser.username,
      image: authUser.avatar,
     },
     tokenData.token
    );
    const channelId = [authUser._id, targetUserId].sort().join("-");
    const currChannel = client.channel("messaging", channelId, {
     members: [authUser._id, targetUserId],
    });
    await currChannel.watch();
    setChatClient(client);
    setChannel(currChannel);
   } catch (error) {
    console.error("Error initializing chat:", error);
    toast.error("Could not connect to chat. Please try again.");
   } finally {
    setLoading(false);
   }
  };

  initChat();
 }, [tokenData, authUser, targetUserId]);

 const handleVideoCall = () => {
  toast.dismiss();
  if (channel) {
   const callUrl = `${window.location.origin}/call/${channel.id}`;
   channel.sendMessage({
    text: `I've started a video call. Join me here: ${callUrl}`,
   });
   toast.success("Video call link sent successfully!");
  }
 };

 if (loading || !chatClient || !channel) return <ChatLoader />;

 return (
  <div className="h-[94vh]">
   <ChatStream client={chatClient}>
    <Channel channel={channel}>
     <div className="w-full relative">
      <CallBtn handleVideoCall={handleVideoCall} />
      <Window>
       <ChannelHeader />
       <MessageList />
       <MessageInput focus />
      </Window>
     </div>
     <Thread />
    </Channel>
   </ChatStream>
  </div>
 );
};

export default Chat;
