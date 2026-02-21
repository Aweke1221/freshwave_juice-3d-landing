import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ShaderMaterial, Vector2, Color } from 'three'
import { useWindowSize } from '@/hooks/useWindowSize'

interface LiquidBackgroundProps {
  mousePosition: { x: number; y: number }
}

const LiquidShader: React.FC<{ mousePosition: { x: number; y: number } }> = ({ mousePosition }) => {
  const materialRef = useRef<ShaderMaterial>(null)
  const { width, height } = useWindowSize()
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uResolution: { value: new Vector2(width, height) },
      uColor1: { value: new Color('#0a0c0f') },
      uColor2: { value: new Color('#ffb347') },
      uColor3: { value: new Color('#ff8c42') },
    }),
    [width, height]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5
      materialRef.current.uniforms.uMouse.value.lerp(
        new Vector2(mousePosition.x / width, 1 - mousePosition.y / height),
        0.05
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * position;
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;

          float noise(vec2 p) {
            return sin(p.x * 10.0 + uTime) * sin(p.y * 8.0 + uTime * 0.7) * 0.5 + 0.5;
          }

          void main() {
            vec2 uv = vUv;
            
            // Liquid wave effect
            float wave1 = sin(uv.x * 5.0 + uTime * 2.0) * sin(uv.y * 3.0 + uTime * 1.5) * 0.15;
            float wave2 = sin(uv.x * 8.0 - uTime * 1.8) * cos(uv.y * 6.0 + uTime * 2.2) * 0.1;
            
            // Mouse influence
            float mouseInfluence = distance(uv, uMouse) * 2.0;
            float mouseGlow = exp(-mouseInfluence * 3.0) * 0.3;
            
            // Combine waves
            float liquid = wave1 + wave2 + mouseGlow;
            
            // Color mixing based on liquid value
            vec3 color = mix(uColor1, uColor2, liquid * 2.0);
            color = mix(color, uColor3, sin(uv.x * 3.0 + uTime) * 0.3 + 0.3);
            
            // Add glow
            float glow = sin(uv.x * 20.0 + uTime) * sin(uv.y * 20.0 + uTime) * 0.1;
            color += vec3(glow * 0.5, glow * 0.3, glow * 0.1);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ mousePosition }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ background: '#0a0c0f' }}
    >
      <LiquidShader mousePosition={mousePosition} />
    </Canvas>
  )
}