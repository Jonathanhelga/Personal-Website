import { Canvas } from '@react-three/fiber'
import useSizes from './components/utils/Sizes'
import { useEffect, useState, useRef } from 'react';
import useResources from './components/utils/Resources'
import sources from './components/utils/sources'
import Experience from './components/Experience';
import { IntroductionUI } from './components/sections/Introduction';
import AboutMeUI from './components/sections/AboutMe/AboutMeUI';
import './styles.css'
import ProjectsUI from './components/sections/Projects/ProjectsUI';
import useIsMobile from './components/utils/useIsMobile';

function App() {
    const isMobile = useIsMobile();
    const { width, height } = useSizes();
    const { itemsRef, loading } = useResources(sources);
    const [isReady, setIsReady] = useState(false)
    const [canvasKey, setCanvaskey] = useState(`${Math.round(width)}x${Math.round(height)}`)
    const lastSize = useRef({ w: width, h: height });
    useEffect(() => {
        if(!loading) {
          const timer = setTimeout(() => {
            setIsReady(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
    }, [loading]);
    
    useEffect(() => { 
        const widthDiff = Math.abs(width - lastSize.current.w);
        const heightDiff = Math.abs(height - lastSize.current.h);

        // THE RULES:
        // - If Width changes > 50px (Laptop resize / Full screen click) -> RESET
        // - If Height changes > 150px (Rotation) -> RESET
        // - If Height changes < 150px (iPad address bar) -> IGNORE (Don't crash)
        if (widthDiff > 50 || heightDiff > 150) {
            
            const timer = setTimeout(() => {
                console.log("Big Resize Detected: Resetting Canvas"); // Debug log
                setCanvaskey(`${Math.round(width)}x${Math.round(height)}`);
                // Update our memory so we don't reset again immediately
                lastSize.current = { w: width, h: height };
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [width, height]);
    if (loading || !isReady) {
        return (
            <div className="loading-screen">
                <h2 style={{ color: '#fff' }}>Loading resources...</h2>
                {!loading && <p style={{ color: '#fff' }}>Preparing scene...</p>}
            </div>
        )
    }
    if(isMobile){
        return (
        <> 
        </>);
    }

    return (
    <>
        <Canvas 
            key={canvasKey} 
            className="webgl"
            style={{
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: -1
            }}
        >

            <Experience itemsRef={itemsRef}/>
        </Canvas>
        
        <IntroductionUI/>
        <AboutMeUI/>
        <ProjectsUI/>
    </>
    )
}

export default App
