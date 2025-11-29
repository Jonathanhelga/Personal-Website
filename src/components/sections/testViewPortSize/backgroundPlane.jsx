import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function ResponsivePlane({ z, color }) {
  const { viewport, camera } = useThree();

  // 1. Calculate the viewport measurements at this specific depth (z)
  // This tells us: "How big is the screen 10 units away?"
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  return (
    <mesh position={[0, 0, z]}>
      {/* 2. Apply those measurements to the geometry */}
      <planeGeometry args={[width/2, height/2]} />
      
      {/* 3. Use wireframe so we can see through them */}
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

export default function ViewportTest() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        
        {/* Plane 1: Close (Z = 0) - Red */}
        <ResponsivePlane z={0} color="red" />

        {/* Plane 2: Medium (Z = -5) - Green */}
        <ResponsivePlane z={-5} color="#00ff00" />

        {/* Plane 3: Far (Z = -10) - Blue */}
        <ResponsivePlane z={-10} color="cyan" />

        {/* OrbitControls lets you rotate the camera to see the truth */}
        <OrbitControls />
        
      </Canvas>
      
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'monospace' }}>
        <h3>The Viewport Test</h3>
        <p>1. Look straight on: They all match perfectly.</p>
        <p>2. Rotate (Left Click + Drag): See the size difference.</p>
      </div>
    </div>
  );
}