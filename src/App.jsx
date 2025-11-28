import { Canvas } from '@react-three/fiber'
import useSizes from './components/utils/Sizes'
import { useEffect, useState } from 'react';
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
    useEffect(() => {
        if(!loading) {
          const timer = setTimeout(() => {
            setIsReady(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
    }, [loading]);
    useEffect(() => { setCanvaskey(`${Math.round(width)}x${Math.round(height)}`) }, [width, height])
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
            key={`${Math.round(width)}x${Math.round(height)}`} 
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
