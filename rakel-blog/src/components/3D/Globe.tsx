import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { TextureLoader, Vector3 } from 'three';
import * as THREE from 'three';
import { travelData } from '../../data/travel';
import { TravelLocation } from '../../types';

interface GlobeProps {
  onLocationClick: (location: TravelLocation) => void;
  selectedLocation: TravelLocation | null;
}

interface LocationMarkerProps {
  location: TravelLocation;
  onClick: (location: TravelLocation) => void;
  isSelected: boolean;
}

// 将经纬度转换为3D球面坐标
const latLngToVector3 = (lat: number, lng: number, radius: number = 5): Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new Vector3(x, y, z);
};

const LocationMarker: React.FC<LocationMarkerProps> = ({ location, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const position = useMemo(() => {
    return latLngToVector3(location.coordinates[1], location.coordinates[0]);
  }, [location.coordinates]);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = (hovered || isSelected) ? 1.5 : 1;
      meshRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1);
      
      if (hovered || isSelected) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(location);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={location.color} />
      </mesh>
      
      {(hovered || isSelected) && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {location.name}
        </Text>
      )}
    </group>
  );
};

const EarthSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // 创建简单的地球纹理
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // 绘制简单的地球纹理
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(0.3, '#7CB342');
    gradient.addColorStop(0.7, '#8BC34A');
    gradient.addColorStop(1, '#4A90E2');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // 添加一些大陆形状
    ctx.fillStyle = '#2E7D32';
    ctx.fillRect(100, 80, 80, 60);
    ctx.fillRect(200, 100, 100, 40);
    ctx.fillRect(350, 90, 60, 50);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshLambertMaterial map={earthTexture} />
    </mesh>
  );
};

export const Globe: React.FC<GlobeProps> = ({ onLocationClick, selectedLocation }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ width: '100%', height: '500px' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <EarthSphere />
      
      {travelData.map((location) => (
        <LocationMarker
          key={location.id}
          location={location}
          onClick={onLocationClick}
          isSelected={selectedLocation?.id === location.id}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={25}
        autoRotate={false}
      />
    </Canvas>
  );
};

