import {Text, Float, Html, Cloud} from "@react-three/drei"
export default function AboutMeGeometry({objectsDistance, sectionIndex, spacingMultiplier}){
    return(
        <>
            <ambientLight intensity={0.6}/>
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    position={[0, - objectsDistance * sectionIndex * spacingMultiplier * 0.29, 2]}
                    color={"rgb(168, 227, 249)"} 
                    textAlign="center"
                    fontSize={0.58}
                >
                    About Me
                </Text>
        </>
    )
}