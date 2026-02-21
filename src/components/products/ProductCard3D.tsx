import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { Product } from '@/types/product.types'
import { ProductModal } from './ProductModal'  // Make sure this import is correct

interface BottleModelProps {
  color: string
  glowColor: string
  hovered: boolean
}

const BottleModel: React.FC<BottleModelProps> = ({ color, glowColor, hovered }) => {
  const meshRef = useRef<THREE.Group>(null)
  const liquidRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation on hover
      if (hovered) {
        meshRef.current.rotation.y += (Math.PI / 4 - meshRef.current.rotation.y) * 0.1
      } else {
        meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.05
      }
    }
    
    // Animate liquid inside
    if (liquidRef.current) {
      liquidRef.current.rotation.y += 0.01
      liquidRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={meshRef}>
      {/* Bottle body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={hovered ? glowColor : 'black'}
          emissiveIntensity={hovered ? 0.5 : 0}
          transparent
          opacity={0.3}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />
        <meshPhysicalMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Bottle cap */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Label */}
      <mesh position={[0, 0, 0.85]}>
        <torusGeometry args={[0.6, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={color} emissive={hovered ? glowColor : 'black'} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

interface ProductCard3DProps {
  product: Product
  index: number
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({ product, index }) => {
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-[500px] w-full cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="rounded-3xl transition-transform duration-500 group-hover:scale-105"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <BottleModel 
            color={product.color} 
            glowColor={product.glowColor}
            hovered={hovered}
          />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
        
        {/* Product Info Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
        >
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{product.name}</h3>
          <p className="text-neon-mango text-lg drop-shadow-lg">${product.price}</p>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          animate={{ opacity: hovered ? 0.2 : 0 }}
          className="absolute inset-0 rounded-3xl bg-neon-mango blur-2xl -z-10"
        />
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProductModal 
            product={product} 
            onClose={() => setModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}