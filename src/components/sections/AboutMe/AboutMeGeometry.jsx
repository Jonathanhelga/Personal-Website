import {Text, Float, Html, Cloud} from "@react-three/drei"
export default function AboutMeGeometry({objectsDistance, sectionIndex, spacingMultiplier}){
    return(
        <>
            <ambientLight intensity={0.6}/>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    position={[1.3, - objectsDistance * sectionIndex * spacingMultiplier * 0.33, 2]}
                    color={"rgb(168, 227, 249)"} 
                    textAlign="center"
                    fontSize={0.5}
                >
                    About Me
                </Text>
        </>
    )
}