/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { useProjectsStore } from "../store";

export default function ProjectsUI(){
    const { 
        isPlaying, 
        isReady,
        setIsPlaying, 
        setIsReady,
        nextProject, 
        previousProject,
    } = useProjectsStore();

    const currentProjectIndex = useProjectsStore((state) => state.currentProjectIndex); 
    const technologies = useProjectsStore((state) => state.projects[currentProjectIndex].technologies);
    const name = useProjectsStore((state) => state.projects[currentProjectIndex].name);
    const descriptions = useProjectsStore((state) => state.projects[currentProjectIndex].description);
    const githubLink = useProjectsStore((state) => state.projects[currentProjectIndex].githubUrl)
    const localPlayerRef = useRef(null);
    const iframeRef = useProjectsStore((s) => s.iframeRef)
    const playerInstance = useProjectsStore((s) => s.playerInstance)
    const setPlayerInstance = useProjectsStore((s) => s.setPlayerInstance)
    const trigger = useProjectsStore((s) => s.trigger);
    function tryInitPlayer(iframe){
        try{
            const p = new Player(iframe.current)
            localPlayerRef.current = p
            setPlayerInstance(p)
            p.ready().then(() => {
                console.log('Vimeo player ready!')
                setIsReady(true)

                p.getPaused().then((paused) => setIsPlaying(!paused))
            }).catch((err) => {
                console.error('Player ready error: ', err);
            })
            p.on('play', () => setIsPlaying(true));
            p.on('pause', () => setIsPlaying(false));
            p.on('ended', () => setIsPlaying(false));
        }catch(error){
            console.error('Error creating Vimeo Player:', error)
        }
    }
    function cleanupPlayer(){
        if(localPlayerRef.current){
            try{
                localPlayerRef.current.destroy();
                console.log('Player destroyed successfully');
            }catch(e){ 
                console.warn('Error destroying existing player:', e)
            }
            localPlayerRef.current = null;
            setPlayerInstance(null);
            setIsReady(false);
        }
    }

    useEffect(() => {
        console.log("iframeRef changed:", iframeRef?.current ? "Available" : "Null");
        cleanupPlayer();
        if(iframeRef && iframeRef.current){
            const timer = setTimeout(() => {
                tryInitPlayer(iframeRef);
            }, 100);
            
            return () => clearTimeout(timer);
        }

    }, [iframeRef, trigger])


    const handlePlayPause = () => {
        console.log("play or pause the video");
        const p = localPlayerRef.current || playerInstance
        if (!p || !isReady){
            console.warn("Player not ready yet!")
            return;
        }
        if (isPlaying) p.pause()
        else p.play()
    }

    return(
        <section className="full-section-right">
                <div className="half-screen" id="section-three">
                    <div className="project-column">
                        <div id="technology" className="tech-list">
                            {technologies.map((tech, index) => (
                                <div>
                                    <span key={index} className="tech-item">{tech}</span>
                                    <span>{index < technologies.length - 1 && <span className="separator"> ◆ </span>}</span>
                                </div>
                            ))}
                        </div>
                        <div id="project-description" className="scrollable-content-description">
                            <h1>{name}</h1>

                            <ul className="description-list">
                                {descriptions.map((description, index) => (
                                    <li key={index}>{description}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="project-controls">
                            <button
                                className="control-btn prev-btn" 
                                onClick={previousProject}
                                aria-label="Previous project"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button
                                className="control-btn play-pause-btn" 
                                onClick={handlePlayPause}
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    // Pause Icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                                        <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                                    </svg>
                                ) : (
                                    // Play Icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                                    </svg>
                                )}

                            </button>
                            <button
                                className="control-btn next-btn" 
                                onClick={nextProject}
                                aria-label="Next project"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className="github-link">
                        <a 
                            href={githubLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >Check out Github Repository</a>
                    </div>
                </div>
        </section>
    )
}