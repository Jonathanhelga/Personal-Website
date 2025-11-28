import useSizes from './utils/Sizes'
import useCursor from './utils/Cursor'
import {useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin);
export default function  CameraController({objectDistance, spacingMultiplier, sections}){
    const { height } = useSizes();
    const {x , y } = useCursor();
    const { set } = useThree();
    const groupRef = useRef();
    const customCameraRef = useRef()
    const [isSceneActive, setIsSceneActive] = useState(true)
    const MAX_PARALLAX_X = 0.22;
    const MAX_PARALLAX_Y = 0.22;
    useEffect(() => {
        const handleBlur = () => { setIsSceneActive(false); }
        const handleClick = () => { setIsSceneActive(true); }

        window.addEventListener('blur', handleBlur);
        document.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('click', handleClick);
        }
    }, [setIsSceneActive]);

    useEffect(() => {
        if(customCameraRef.current) {
            groupRef.current.add(customCameraRef.current );
            set({ camera: customCameraRef.current });
        }
        let currentSection = 0;
        let isAnimating = false;
        const handleWheel = (event) => {
            if (window.innerWidth < 1024) return;
            const scrollableDiv = event.target.closest('.scrollable-content, .scrollable-content-hobby, .scrollable-content-description');

            if(scrollableDiv){ 
                const isOverflowing = scrollableDiv.scrollHeight > scrollableDiv.clientHeight;
                if (isOverflowing) { return;  }
            }
            event.preventDefault();
            setIsSceneActive(true);
            if(isAnimating) {return; }
            isAnimating = true;
            currentSection = event.deltaY > 0 ? 
            Math.min(currentSection + 1, sections - 1)  // go to next page (scrolling up the page go down)
            :
            Math.max(currentSection-1, 0)  //go to previous page (scrolling down the page go up)
            gsap.to(window, {
                duration: 2,
                scrollTo: {y: currentSection * height, autoKill: false},
                ease: 'power2.inOut',
                onComplete: () => { isAnimating = false}
            });
        }
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => { window.removeEventListener('wheel', handleWheel); }

    }, [setIsSceneActive, set, height, sections])

    useFrame((state, delta) => {
        if(customCameraRef.current){
            const maxScroll = Math.max(document.body.clientHeight - height, 0);
            const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            const totalMove = objectDistance * spacingMultiplier * (sections - 1);
            const position = -progress * totalMove;
            customCameraRef.current.position.y = position
        }
        if (groupRef.current && isSceneActive) {
            const targetX = Math.max(-MAX_PARALLAX_X, Math.min(MAX_PARALLAX_X, x));
            const targetY = Math.max(-MAX_PARALLAX_Y, Math.min(MAX_PARALLAX_Y, -y));
            groupRef.current.position.x += (targetX - groupRef.current.position.x) * 5 * delta * 0.15;
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * 5 * delta * 0.15;
        }
    })
    return (
        <group ref={groupRef}>
            <perspectiveCamera ref={customCameraRef} position={[0, 0, 7]} fov={35} />
        </group>
    )
}   