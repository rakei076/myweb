import { useRef, useMemo, useState, useEffect, type FC } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import {
  Vector3,
  Vector2,
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  RingGeometry,
  SphereGeometry,
  TextureLoader,
  SRGBColorSpace,
  MeshPhongMaterial,
  AdditiveBlending,
  Group,
  BufferGeometry,
  Float32BufferAttribute
} from 'three';
import { travelData } from '../../data/travel';
import type { TravelLocation } from '../../types';

const EARTH_TEXTURES = {
  day: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
  normal: 'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg',
  specular: 'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg',
  night: 'https://threejs.org/examples/textures/planets/earth_lights_2048.png',
  clouds: 'https://threejs.org/examples/textures/planets/earth_clouds_1024.png'
} as const;

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

const LocationMarker: FC<LocationMarkerProps> = ({ location, onClick, isSelected }) => {
  const markerRef = useRef<Mesh<SphereGeometry, MeshStandardMaterial>>(null);
  const ringRef = useRef<Mesh<RingGeometry, MeshBasicMaterial>>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(() => latLngToVector3(location.coordinates[1], location.coordinates[0]), [location.coordinates]);
  const markerColor = useMemo(() => new Color(location.color), [location.color]);

  useFrame((state) => {
    if (markerRef.current) {
      const targetScale = hovered || isSelected ? 1.6 : 1;
      markerRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.15);
      if (hovered || isSelected) {
        markerRef.current.rotation.y = state.clock.elapsedTime * 2;
      }
    }

    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.12;
      ringRef.current.scale.set(scale, scale, scale);
      const material = ringRef.current.material;
      if (material) {
        material.opacity = hovered || isSelected ? 0.9 : 0.55 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
        onClick={(event) => {
          event.stopPropagation();
          onClick(location);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={markerColor}
          emissive={markerColor.clone().multiplyScalar(0.4)}
          emissiveIntensity={1.2}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshBasicMaterial color={markerColor} transparent opacity={0.6} side={DoubleSide} />
      </mesh>

      {(hovered || isSelected) && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.24}
          color="#f9fbff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#0b225c"
        >
          {location.name}
        </Text>
      )}
    </group>
  );
};

const EarthSphere: FC = () => {
  const [dayMap, normalMap, specularMap, nightMap, cloudsMap] = useLoader(TextureLoader, [
    EARTH_TEXTURES.day,
    EARTH_TEXTURES.normal,
    EARTH_TEXTURES.specular,
    EARTH_TEXTURES.night,
    EARTH_TEXTURES.clouds
  ]);

  dayMap.colorSpace = SRGBColorSpace;
  nightMap.colorSpace = SRGBColorSpace;
  cloudsMap.colorSpace = SRGBColorSpace;

  const cloudsRef = useRef<Mesh<SphereGeometry, MeshPhongMaterial>>(null);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0007;
    }
  });

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[5, 256, 256]} />
        <meshPhongMaterial
          map={dayMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={18}
          normalScale={new Vector2(0.6, 0.6)}
          bumpMap={normalMap}
          bumpScale={0.02}
          emissiveMap={nightMap}
          emissiveIntensity={0.6}
          emissive={new Color('#0d1a2b')}
        />
      </mesh>

      <mesh scale={1.003}>
        <sphereGeometry args={[5.02, 256, 256]} />
        <meshBasicMaterial map={nightMap} blending={AdditiveBlending} transparent opacity={0.55} />
      </mesh>

      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[5.05, 128, 128]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const Atmosphere: FC = () => (
  <mesh scale={1.02}>
    <sphereGeometry args={[5.2, 128, 128]} />
    <meshPhongMaterial
      color="#7cc9ff"
      transparent
      opacity={0.18}
      side={DoubleSide}
      emissive="#1d6feb"
      emissiveIntensity={0.2}
    />
  </mesh>
);

const Graticule: FC<{ radius?: number }> = ({ radius = 5.08 }) => {
  const positions = useMemo(() => {
    const points: number[] = [];
    const segments = 128;

    const pushSegment = (p1: Vector3, p2: Vector3) => {
      points.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    };

    for (let lat = -80; lat <= 80; lat += 10) {
      for (let i = 0; i < segments; i++) {
        const lng1 = -180 + (i / segments) * 360;
        const lng2 = -180 + ((i + 1) / segments) * 360;
        pushSegment(
          latLngToVector3(lat, lng1, radius),
          latLngToVector3(lat, lng2, radius)
        );
      }
    }

    for (let lng = -180; lng < 180; lng += 10) {
      for (let i = 0; i < segments; i++) {
        const lat1 = -90 + (i / segments) * 180;
        const lat2 = -90 + ((i + 1) / segments) * 180;
        pushSegment(
          latLngToVector3(lat1, lng, radius),
          latLngToVector3(lat2, lng, radius)
        );
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
    return geometry;
  }, [radius]);

  useEffect(() => {
    return () => {
      positions.dispose();
    };
  }, [positions]);

  return (
    <lineSegments geometry={positions}>
      <lineBasicMaterial color="#6aa8ff" opacity={0.42} transparent />
    </lineSegments>
  );
};

const GlobeScene: FC<GlobeProps> = ({ onLocationClick, selectedLocation }) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const speed = selectedLocation ? 0.00025 : 0.0012;
      groupRef.current.rotation.y += speed;
    }
  });

  return (
    <>
      <Stars radius={120} depth={50} count={2000} factor={4} fade speed={1} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[10, 12, 6]} intensity={1.2} castShadow />
      <directionalLight position={[-8, -10, -5]} intensity={0.35} />

      <group ref={groupRef}>
        <EarthSphere />
        <Atmosphere />
        <Graticule />

        {travelData.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onClick={onLocationClick}
            isSelected={selectedLocation?.id === location.id}
          />
        ))}
      </group>
    </>
  );
};

export const Globe: FC<GlobeProps> = ({ onLocationClick, selectedLocation }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 14], fov: 55 }}
      style={{ width: '100%', height: '520px', borderRadius: '18px', background: 'linear-gradient(160deg, #0a1747 0%, #020615 100%)' }}
      dpr={[1, 2]}
    >
      <GlobeScene onLocationClick={onLocationClick} selectedLocation={selectedLocation} />

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={8}
        maxDistance={22}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={0.18}
      />
    </Canvas>
  );
};

