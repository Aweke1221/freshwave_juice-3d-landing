import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus } from '@react-three/drei'

interface FloatingFruitsProps {
  mousePosition: { x: number; y: number }
}

export const FloatingFruits: React.FC<FloatingFruitsProps> = ({ mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle movement based on mouse
      groupRef.current.rotation.y += 0.001
      groupRef.current.position.x = mousePosition.x * 0.01
      groupRef.current.position.y = mousePosition.y * 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {/* Mango slice */}
      <mesh position={[-2, 1, -1]} rotation={[0.5, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff8c42" emissiveIntensity={0.3} />
      </mesh>

      {/* Orange slice */}
      <mesh position={[2, -0.5, 0]} rotation={[0.3, 0.8, 0.2]}>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#ffa500" emissive="#ff8c00" emissiveIntensity={0.2} />
      </mesh>

      {/* Berry bunch */}
      <group position={[0, 1.5, -2]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.sin(i) * 0.3, Math.cos(i) * 0.3, 0]}>
            <sphereGeometry args={[0.2, 16]} />
            <meshStandardMaterial color="#c41e3a" emissive="#ff6b6b" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}