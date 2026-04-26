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
                                <div key={index}>
                                    <span className="tech-item">{tech}</span>
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
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </div>
        </section>
    )
}