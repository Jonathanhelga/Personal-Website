export default function MobileView(){
    return (
        <div className="mobileView-screen">
            <svg className="mobileView-icon" width="44" height="44" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h1>Desktop Only</h1>
            <p>
                This portfolio uses immersive 3D graphics that require a larger screen.
                Please visit on a desktop or laptop.
            </p>
        </div>
    )
}
