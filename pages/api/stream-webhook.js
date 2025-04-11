import { StreamChat } from "stream-chat";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { STREAM_API_KEY, STREAM_API_SECRET } = process.env;
  const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

  const { type, channel_id } = req.body;

  // 특정 이벤트 (channel.created)인지 확인
  if (type === "channel.created" && channel_id) {
    try {
      // Stream SDK를 사용하여 채널에 접근
      const channel = client.channel("messaging", channel_id);

      // ljj90703001 계정으로 환영 메시지 보내기
      await channel.sendMessage({
        text: "환영합니다! 🎉",
        user_id: "ljj90703001",
      });

      return res.status(200).json({ status: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ status: "Error sending message", error: error.message });
    }
  }

  return res.status(200).json({ status: "Event ignored" });
}
