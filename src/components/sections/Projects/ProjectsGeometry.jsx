/* eslint-disable react-hooks/refs */
import { Text, Html } from '@react-three/drei'
import { useProjectsStore } from '../store';
import { useEffect, useRef, useState } from 'react';
import { VIMEO_PLAYER_PARAMS } from '../vimeo';
export default function ProjectsGeometry({objectsDistance = 4, sectionIndex = 3, itemsRef, spacingMultiplier}){
    const macbookModel = itemsRef.current.macbookModel;
    const iframeRef = useRef(null)

    const setIframeRef = useProjectsStore((s) => s.setIframeRef) 
    const currentProject = useProjectsStore((state) =>  state.projects[state.currentProjectIndex] );
    const VIMEO_BASE = import.meta.env.VITE_VIMEO_BASE_URL;
    const vimeoUrl = `${VIMEO_BASE}${currentProject.vimeoId}${VIMEO_PLAYER_PARAMS}`;
    const projectTitle = currentProject.title.toUpperCase();
    const [title, setTitle] = useState('');
    const indexRef = useRef(0);
    const timeoutRef = useRef(null);
    useEffect(()=>{
        console.log("Monitoring iframe ref...");
        setIframeRef(null);
        const checkIframe = setInterval(() => {
            if(iframeRef.current){
                console.log("New iframe found!", iframeRef.current);
                setIframeRef(iframeRef);
                clearInterval(checkIframe);
            }
        }, 400);
        return () => {
            clearInterval(checkIframe);
        };
    }, [setIframeRef]);
    useEffect(()=>{
        setTitle('');
        indexRef.current = 0
        timeoutRef.current = null;
        
        function typeChar(){
            const i = indexRef.current;
            if(i < projectTitle.length){
                setTitle(prev => prev + projectTitle.charAt(i));
                indexRef.current = i+1;
                timeoutRef.current = setTimeout(typeChar, 150);
            }
        }
        setTimeout(typeChar, 200);
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [currentProject.id, projectTitle]);


    return(
        <>
            <ambientLight></ambientLight>
            <Text
                font="./bangers-v20-latin-regular.woff"
                position={[-0.5, -(objectsDistance) * spacingMultiplier * sectionIndex * 0.595 , 2]}
                color={"rgb(168, 227, 249)"} 
                textAlign="center"
                fontSize={0.45}>
                    {title} 
            </Text>
            <primitive
                object={ macbookModel }
                scale={[0.07, 0.108, 0.08]}
                position={[-0.7, -(objectsDistance) * spacingMultiplier * sectionIndex * 0.72, 2]}
                rotation-x={0.25}
                rotation-y={0.015}
            >
                <Html                         
                    center
                    position={[-0.05, 11.57, -17]}
                >
                    <div style={{
                            width: '44.5vw',              
                            height: '43.7vh',             
                            maxWidth: '785px',            
                            maxHeight: '440px',
                            borderRadius: '15px',     
                            overflow: 'hidden',       
                            backgroundColor: '#000',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',

                    }}>
                        <iframe
                            key={currentProject.id}
                            ref={iframeRef}
                            src={vimeoUrl}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                display: 'block',
                            }}
                        />
                    </div>
                </Html>

            </primitive>
        </>
    )
}