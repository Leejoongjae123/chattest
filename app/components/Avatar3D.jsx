"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Text, Float } from '@react-three/drei';

// 귀여운 캐릭터 아바타 컴포넌트
function SimpleAvatar({ color = "#FFD700", username }) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  
  useFrame((state) => {
    // 기본 애니메이션 - 부드럽게 좌우로 흔들기
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    
    // 호버 상태일 때 추가 애니메이션
    if (hover) {
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
    } else {
      ref.current.rotation.z = 0;
    }
  });
  
  return (
    <group ref={ref}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* 머리 */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* 몸통 */}
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 16, 16]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      
      {/* 눈 */}
      <mesh position={[0.18, 0.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      <mesh position={[-0.18, 0.6, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* 입 */}
      <mesh position={[0, 0.3, 0.45]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.05]} />
        <meshStandardMaterial color={hover ? "#FF0000" : "#FF5252"} />
      </mesh>
      
      {/* 팔 */}
      <mesh position={[0.5, -0.2, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.08, 0.5, 16, 16]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      
      <mesh position={[-0.5, -0.2, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.08, 0.5, 16, 16]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      
      {/* 사용자 이름 */}
      {username && (
        <Float
          position={[0, 1.3, 0]}
          rotation={[0, 0, 0]}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Text
            color="black"
            fontSize={0.3}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="center"
            anchorY="middle"
          >
            {username}
          </Text>
        </Float>
      )}
    </group>
  );
}

// 배경 컴포넌트
function Background() {
  return (
    <mesh position={[0, 0, -2]} receiveShadow>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color="#87CEEB" />
    </mesh>
  );
}

export default function Avatar3D({ height = 200, username = "사용자", color }) {
  // 랜덤 색상 생성 
  const getRandomColor = () => {
    const colors = ["#FFD700", "#FF6347", "#7B68EE", "#3CB371", "#FF69B4", "#1E90FF"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarColor = color || getRandomColor();
  
  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Background />
        <SimpleAvatar color={avatarColor} username={username} />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
} 