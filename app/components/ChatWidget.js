"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import {
  Chat,
  useCreateChatClient,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react";
import { Button } from "@nextui-org/react";
import { createToken } from "@/lib/action";
import "stream-chat-react/dist/css/v2/index.css";

function ChatWidget({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const hasShownWelcomeRef = useRef(false);
  const chatButtonRef = useRef(null);

  const tokenProvider = useCallback(async () => {
    return await createToken(userData.id);
  }, [userData.id]);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    tokenOrProvider: tokenProvider,
    userData,
  });

  // 처음 로딩 완료 시 알림 및 애니메이션 표시
  useEffect(() => {
    if (client && !hasShownWelcomeRef.current) {
      // 3초 후에 알림 표시
      const timer = setTimeout(() => {
        setShowNotification(true);
        
        // 버튼 애니메이션 적용
        if (chatButtonRef.current) {
          chatButtonRef.current.classList.add('animate-once');
          
          // 애니메이션 종료 후 클래스 제거
          setTimeout(() => {
            if (chatButtonRef.current) {
              chatButtonRef.current.classList.remove('animate-once');
            }
          }, 1000);
        }
      }, 3000);
      
      hasShownWelcomeRef.current = true;
      
      return () => clearTimeout(timer);
    }
  }, [client]);

  // 채팅방 생성 및 입장
  const createAndJoinChannel = async () => {
    if (!client) return;
    
    setIsLoading(true);
    setShowNotification(false);
    
    try {
      // 채널 ID 생성 (고유한 ID를 생성하기 위해 현재 시간과 랜덤 문자열 조합)
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // 채널 생성
      const newChannel = client.channel("messaging", uniqueId, {
        members: [userData.id, "ljj90703001"], // 사용자와 지원 담당자 추가
        name: "고객 문의",
        created_by_id: userData.id,
      });

      await newChannel.create();
      await newChannel.watch();
      
      // 자동 환영 메시지 전송 (서버 측에서 전송하는 것이 좋지만, 데모 목적으로 클라이언트에서 전송)
      try {
        await newChannel.sendMessage({
          text: "안녕하세요! 무엇을 도와드릴까요?",
          user_id: "support_agent"
        });
      } catch (messageError) {
        console.error("환영 메시지 전송 실패:", messageError);
      }
      
      setActiveChannel(newChannel);
      setIsOpen(true);
    } catch (error) {
      console.error("채널 생성 중 오류 발생:", error);
      alert("채팅방 연결에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (!isOpen && !activeChannel) {
      createAndJoinChannel();
    } else {
      setIsOpen(!isOpen);
    }
    
    // 알림 숨기기
    setShowNotification(false);
  };

  if (!client) {
    return (
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 z-50">
        <Button 
          onClick={() => alert("채팅 서비스를 초기화하는 중입니다. 잠시 후 다시 시도해주세요.")}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 z-50">
      {/* 채팅창 */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl fixed sm:absolute bottom-0 right-0 sm:bottom-16 sm:right-0 w-full sm:w-[320px] md:w-[350px] h-[90vh] sm:h-[450px] md:h-[500px] overflow-hidden flex flex-col">
          <Chat client={client} defaultLanguage={userData.language}>
            <Channel channel={activeChannel}>
              <Window hideOnThread>
                <div className="str-chat__header-livestream">
                  <div className="str-chat__header-livestream-left">
                    <h2 className="str-chat__header-livestream-title">고객 문의</h2>
                  </div>
                  <div className="str-chat__header-livestream-right">
                    <button 
                      className="str-chat__square-button"
                      onClick={toggleChat}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <img src="/character.png" alt="캐릭터 이미지" className="w-[200px] aspect-square object-contain" />
                </div>
                <MessageList />
                <MessageInput focus placeholder="메시지를 입력하세요..." />
              </Window>
              <Thread />
            </Channel>
          </Chat>
        </div>
      )}

      {/* 채팅 버튼 */}
      <div className="relative inline-block">
        {/* 알림 메시지 */}
        {/* {showNotification && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-md px-4 py-3 mb-2 w-48 text-sm">
            <div className="font-medium text-gray-900 mb-1">새 메시지</div>
            <div className="text-gray-600">무엇을 도와드릴까요?</div>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </div>
        )} */}
        
        <Button 
          ref={chatButtonRef}
          onClick={toggleChat}
          disabled={isLoading}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          )}
        </Button>
        
        {/* 알림 표시기 */}
        {showNotification && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
}

export default ChatWidget; 