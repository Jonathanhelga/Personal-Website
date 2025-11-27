import * as THREE from 'three'
import {Text, Float, Html, Cloud} from "@react-three/drei"
import vertexShader from '../shaders/vertex.glsl?raw'
import fragmentShader from '../shaders/fragment.glsl?raw'
import { extend } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
extend({ RawShaderMaterial: THREE.RawShaderMaterial })
export default function IntroductionGeometry({objectsDistance, texture, sectionIndex}){
    const textureSelfImage = texture.current.selfImage;
    const textureFamilyPicture = texture.current.familyPhoto;
    const textureGirlfriend = texture.current.girlfriend;
    const [welcome, setWelcome] = useState('')
    const indexRef = useRef(0);
    const timeoutRef = useRef(null);
    const welcomingText = "WELCOME😊";

    useEffect(() => {
        function typeChar() {
            const i = indexRef.current
            if (i < welcomingText.length) {
                setWelcome(prev => prev + welcomingText.charAt(i))
                indexRef.current = i + 1
                timeoutRef.current = setTimeout(typeChar, 350)
            }
        }

        setTimeout(typeChar, 500)

        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [])

return (  
    <>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5,5,5]} intensity={0.8} /> 
        <Cloud
                position={[0, 0.85, 3]}
                scale={[0.1, 0.1, 0.1]}
                fade={2}
                opacity={0.5}
                speed={2}
                color={"rgb(168, 227, 249)"} 
        />
        <Float speed={0.7}>
            <Text
                font="./bangers-v20-latin-regular.woff"
                position={[0,2,2]}
                color={"rgb(168, 227, 249)"} 
                textAlign="center"
                fontSize={0.6}
            >
            {welcome}
            </Text>
            <Text
                font="./bangers-v20-latin-regular.woff"
                position={[0,1.5,2]}
                color={"rgb(168, 227, 249)"} 
                textAlign="center"
                fontSize={0.2}
            >
            I'm Jonathan Helga
            </Text>
            
            <group>
                <mesh position={    [0.7, -(objectsDistance * 0.1 * sectionIndex), 2]     }>
                    <planeGeometry args={[0.7, 1.2]}/>
                    <rawShaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader}
                        uniforms={{
                            uColorTexture: { value: textureFamilyPicture },
                            uOpacity: { value: 1 },
                            uTime: { value: 0 }
                        }}
                    />
                    <Html
                        position={[0,-0.6,0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                    >
                    Me & Family</Html>
                </mesh>
                <mesh position={   [1.3, -(objectsDistance * -0.22 * sectionIndex), 2]        }>
                    <planeGeometry args={[0.7, 1.2]}/>
                    <rawShaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader}
                        uniforms={{
                            uColorTexture: { value: textureSelfImage },
                            uOpacity: { value: 1 },
                            uTime: { value: 0 }
                        }}
                    />
                    <Html
                        position={[0,-0.6,0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                    >
                    Me in Kyoto</Html>
                </mesh>
                <mesh position={    [1.9, -(objectsDistance * 0.1 * sectionIndex), 2]      }>
                    <planeGeometry args={[0.7, 1.2]}/>
                    <rawShaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader}
                        uniforms={{
                            uColorTexture: { value: textureGirlfriend },
                            uOpacity: { value: 1 },
                            uTime: { value: 0 }
                        }}
                    />
                    <Html
                        position={[0,-0.6,0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                    >
                    Me & My girlfriend
                    </Html>
                </mesh>
            </group>
        </Float>
    </>
    )

}