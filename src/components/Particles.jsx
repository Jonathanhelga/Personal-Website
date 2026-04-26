import * as THREE from 'three'
import { Float } from "@react-three/drei"
import { useRef, useMemo, useEffect } from 'react'
import useSizes from './utils/Sizes'

export default function Particles({
        particleCounts, 
        particleSize, 
        objectsDistance, 
        section, 
        texture, 
        spacingMultiplier
}){
        spacingMultiplier = spacingMultiplier * 2;
        const pointsRef = useRef();
        const { width, height } = useSizes();

        const { positions, colors} = useMemo(() => {
                const positions = new Float32Array(particleCounts * 3);
                const colors = new Float32Array(particleCounts * 3);

                // Derive spread from the camera's visible width in 3D space.
                // Camera: z=7, fov=35. visibleHalfWidth = tan(fov/2) * z * aspectRatio.
                // The old formula (-0.03*height+45) collapsed to 0 at height>=1500px.
                const aspectRatio = width > 0 && height > 0 ? width / height : 16 / 9;
                const visibleHalfWidth = Math.tan((35 / 2) * (Math.PI / 180)) * 7 * aspectRatio;
                const xScale = Math.max(8, visibleHalfWidth * 2.8);
                for(let i = 0; i < particleCounts; i++){
                        positions[i * 3 + 0] = (Math.random() - 0.5) * xScale
                        positions[i * 3 + 1] = 5 - Math.random() * objectsDistance * spacingMultiplier * section
                        positions[i * 3 + 2] = (Math.random()) * -10

                        colors[i * 3 + 0] = 0
                        colors[i * 3 + 1] = 0.163
                        colors[i * 3 + 2] = Math.random()
                }
                return { positions, colors }
        }, [particleCounts, objectsDistance, section, spacingMultiplier, width, height])

        useEffect(() => {
                const points = pointsRef.current
                if (!points) return

                const geometry = points.geometry
                if (!geometry) return

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

                geometry.attributes.position.needsUpdate = true
                geometry.attributes.color.needsUpdate = true

                geometry.computeBoundingSphere()
        }, [positions, colors])

        return (
                <Float speed={0.5} floatIntensity={27}>
                        <points ref={pointsRef}>
                                <bufferGeometry>
                                <bufferAttribute
                                        attach="attributes-position"
                                        count={particleCounts}
                                        itemSize={3}
                                        array={positions}
                                />
                                <bufferAttribute
                                        attach="attributes-color"
                                        count={particleCounts}
                                        itemSize={3}
                                        array={colors}
                                />
                                
                                </bufferGeometry>
                                <pointsMaterial
                                        sizeAttenuation={true}
                                        size={particleSize}
                                        transparent={true}
                                        alphaMap={texture.current.starTexture}
                                        blending={THREE.AdditiveBlending}
                                        vertexColors={true}
                                />
                        </points>
                </Float>
        )
}
//git commit -m "feat: optimize scroll navigation logic" -m "- Added laptop guard clause (disable on <1024px)" -m "- Implemented scroll isolation using .closest() for text containers" -m "- Prevented scroll chaining with CSS overscroll-behavior"