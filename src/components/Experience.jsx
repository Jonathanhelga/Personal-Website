import Particles from "./Particles"
import CameraController from './CameraController'
import IntroductionGeometry from "./sections/Introduction/IntroductionGeometry";
import AboutMeGeometry from "./sections/AboutMe/AboutMeGeometry"
import ProjectsGeometry from "./sections/Projects/ProjectsGeometry";
import { useProjectsStore } from "./sections/store";
import { useEffect, useRef } from "react";
export default function Experience({itemsRef}){
    const section = 3;
    const objectsDistance = 4;
    const particleCount = 1700;
    const particleSize = 0.38
    const spacingMultiplier = 1.2;

    const iframeRef = useRef(null);
    const setIframeRef = useProjectsStore((state) => state.setIframeRef);
    useEffect(() => {
            setIframeRef(iframeRef); 
    }, [setIframeRef]);
    return(
        <>
            <CameraController objectDistance={objectsDistance} spacingMultiplier={spacingMultiplier} sections={section}/>
            <Particles 
                particleCounts={particleCount} 
                particleSize={particleSize} 
                objectsDistance={objectsDistance}
                section={section}
                texture={itemsRef} 
                spacingMultiplier={spacingMultiplier}
            />
            <IntroductionGeometry 
                objectsDistance={objectsDistance}
                texture={itemsRef}
                sectionIndex={1}
            />
            <AboutMeGeometry 
                objectsDistance={objectsDistance}
                sectionIndex={2}
                spacingMultiplier={spacingMultiplier}
            />
            <ProjectsGeometry
                objectsDistance={objectsDistance}
                sectionIndex={3}
                itemsRef={itemsRef}
                spacingMultiplier={spacingMultiplier}
            />
        </>
    )
}