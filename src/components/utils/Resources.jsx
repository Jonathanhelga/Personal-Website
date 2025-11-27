import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
export default function Resources(sources = []){
    const itemsRef = useRef({})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!sources.length) return;
        const loaders = { 
            textureLoader: new THREE.TextureLoader(),
            gltfLoder: new GLTFLoader()
        };
        let loadedCount = 0
        itemsRef.current = {};
        setLoading(true)
        sources.forEach((source) => {
            if(source.type == 'texture'){
                loaders.textureLoader.load(source.path, 
                (image) => {
                    image.colorSpace = THREE.SRGBColorSpace;
                    image.magFilter = THREE.NearestFilter;
                    itemsRef.current[source.name] = image;
                    loadedCount++
                    if(loadedCount == sources.length) { setLoading(false) }
                },(err) => {
                    console.error(`Failed to load ${source.path}`, err);
                    loadedCount++;
                    if (loadedCount === sources.length) { setLoading(false); }
                }
            );
            }
            else if(source.type == 'gltf'){
                loaders.gltfLoder.load(source.path,
                    (gltf) => {
                        console.log('GLTF loaded:', gltf);
                        itemsRef.current[source.name] = gltf.scene;  // ✅ Store the scene
                        loadedCount++;
                        if (loadedCount === sources.length) { 
                            setLoading(false); 
                        }
                    },
                    undefined,  // ✅ Add progress callback (optional)
                    (err) => {
                        console.error(`Failed to load ${source.path}`, err);  // ✅ Fix template literal
                        loadedCount++;
                        if (loadedCount === sources.length) { 
                            setLoading(false); 
                        }
                    }
                )
            }
        })
    }, [sources])
    return {itemsRef, loading}
}