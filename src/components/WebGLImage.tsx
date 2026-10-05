'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    vec2 mouseDir = uv - uMouse;
    float dist = length(mouseDir);
    float strength = smoothstep(0.6, 0.0, dist) * uHover;
    
    // Organic wave distortion
    float wave = sin(dist * 12.0 - uTime * 2.5) * 0.012 * strength;
    float wave2 = cos(dist * 8.0 + uTime * 1.8) * 0.008 * strength;
    uv += normalize(mouseDir + 0.001) * (wave + wave2);
    
    // Chromatic aberration — RGB channel split
    float aberration = 0.006 * uHover * (1.0 - dist * 0.8);
    vec2 rOff = vec2(aberration, aberration * 0.5);
    vec2 bOff = vec2(-aberration, -aberration * 0.5);
    
    float r = texture2D(uTexture, uv + rOff).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv + bOff).b;
    float a = texture2D(uTexture, uv).a;
    
    gl_FragColor = vec4(r, g, b, a);
  }
`;

interface WebGLImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function WebGLImage({
  src,
  alt,
  className = '',
  priority = false,
}: WebGLImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [webglReady, setWebglReady] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Проверка на тач-устройства (отключаем тяжелые шейдеры)
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let THREE: any;
    let renderer: any, scene: any, camera: any, material: any, geometry: any, texture: any;
    let resizeObserver: ResizeObserver;

    const init = async () => {
      try {
        THREE = await import('three');
      } catch {
        return; 
      }

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
      camera.position.z = 1;

      const loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymous';

      texture = await new Promise((resolve, reject) => {
        loader.load(src, resolve, undefined, reject);
      }).catch(() => null);

      if (!texture) return; // Fallback to Next/Image

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      const uniforms = {
        uTexture: { value: texture },
        uHover: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
      };
      uniformsRef.current = uniforms;

      geometry = new THREE.PlaneGeometry(1, 1);
      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      setWebglReady(true);

      const clock = new THREE.Clock();
      const animate = () => {
        uniforms.uTime.value = clock.getElapsedTime();

        const mouse = uniforms.uMouse.value;
        mouse.x += (mouseRef.current.x - mouse.x) * 0.06;
        mouse.y += (mouseRef.current.y - mouse.y) * 0.06;

        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(animate);
      };

      animate();

      const onResize = () => {
        const { width: w, height: h } = container.getBoundingClientRect();
        if (w > 0 && h > 0 && renderer) {
          renderer.setSize(w, h);
        }
      };

      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: 1.0 - (e.clientY - rect.top) / rect.height,
        };
      };

      const onMouseEnter = () => {
        if (uniformsRef.current) {
          gsap.to(uniformsRef.current.uHover, {
            value: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
        }
      };

      const onMouseLeave = () => {
        if (uniformsRef.current) {
          gsap.to(uniformsRef.current.uHover, {
            value: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      };

      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseenter', onMouseEnter);
      container.addEventListener('mouseleave', onMouseLeave);

      return () => {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    let cleanupEvents: (() => void) | undefined;
    
    // Lazy initialization using Intersection Observer to save resources
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          init().then((cleanup) => { cleanupEvents = cleanup; });
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      if (cleanupEvents) cleanupEvents();
      if (resizeObserver) resizeObserver.disconnect();
      
      // Полная очистка памяти WebGL (Memory Leak Prevention)
      if (scene) scene.clear();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      if (renderer) {
        renderer.forceContextLoss();
        renderer.dispose();
      }
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {/* Оптимизированный фоллбэк через next/image для CLS=0 и ленивой загрузки */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-opacity duration-700 ease-out"
        style={{ opacity: webglReady && !isTouch ? 0 : 1 }}
      />

      {/* WebGL canvas — отключен на тач-устройствах */}
      {!isTouch && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
          style={{ opacity: webglReady ? 1 : 0 }}
        />
      )}
    </div>
  );
}
