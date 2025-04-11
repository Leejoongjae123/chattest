import React from "react";
import ChatWidget from "./components/ChatWidget";

function page() {
  const userData = {
    language: "it",
    id: "hellfir2",
    name: "client",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };

  return (
    <div className="w-screen h-full min-h-screen relative">
      {/* 헤더 섹션 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-800">멋진 회사</h1>
          <nav className="mt-4">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-blue-600 font-medium">
                  홈
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  서비스
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  제품
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  고객사례
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  문의하기
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            혁신적인 솔루션으로 비즈니스를 성장시키세요
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            고객 중심의 접근 방식과 최신 기술을 활용하여 비즈니스 성과를
            향상시켜 드립니다.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition">
            자세히 알아보기
          </button>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">주요 서비스</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 서비스 카드 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">맞춤형 솔루션</h3>
              <p className="text-gray-600">
                고객의 요구사항에 맞춰 최적화된 솔루션을 제공합니다.
              </p>
            </div>
            {/* 서비스 카드 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">전문 컨설팅</h3>
              <p className="text-gray-600">
                경험 많은 전문가들이 비즈니스 성장을 위한 전략을 제시합니다.
              </p>
            </div>
            {/* 서비스 카드 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">기술 지원</h3>
              <p className="text-gray-600">
                24/7 기술 지원으로 문제 발생 시 신속하게 대응합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">고객 후기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 후기 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "멋진 회사의 서비스를 도입한 이후 업무 효율성이 30% 이상
                향상되었습니다. 정말 만족스러운 결과입니다."
              </p>
              <div className="font-medium">김지훈 대표 | ABC 기업</div>
            </div>
            {/* 후기 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "전문적인 컨설팅과 맞춤형 솔루션 덕분에 시장에서 우위를 점할 수
                있었습니다. 감사합니다."
              </p>
              <div className="font-medium">이서연 이사 | XYZ 주식회사</div>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 섹션 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">멋진 회사</h3>
              <p>혁신적인 비즈니스 솔루션 제공</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">빠른 링크</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    서비스
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    제품
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    고객사례
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    문의하기
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">연락처</h3>
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>이메일: info@example.com</p>
              <p>전화: 02-123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">뉴스레터 구독</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="px-4 py-2 text-gray-800 w-full"
                />
                <button className="bg-blue-600 px-4 py-2 ml-2">구독</button>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700 text-center">
            <p>&copy; 2023 멋진 회사. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 채팅 위젯 */}
      <ChatWidget userData={userData} />
    </div>
  );
}

export default page;
