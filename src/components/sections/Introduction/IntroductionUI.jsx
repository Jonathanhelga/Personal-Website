export default function IntroductionUI(){
    return(
        <section className="full-section">
            <div className="half-screen" id="section-one">
                <div id="self-introduction">
                    <h2><b>Hi there, Reader!</b> 😊</h2>
                    <p>
                    I'm currently a 4th-year Bachelor's student at Tamkang University in Taiwan, majoring in Computer Science and Information Engineering. I will graduate in June 2026.
                    <br/>
                    <br/>
                    I'm currently open to internship opportunities. My primary interests lie in C/C++ programming and embedded systems, and I'm excited to have the chance to work on hands-on projects.
                    <br/>
                    <br/>
                    Thank you for taking the time to visit my portfolio.
                    I hope you get to know me better. If you have any questions or opportunities,
                    please don't hesitate to <a href="mailto:jonathanhelgalie@gmail.com">contact me here</a>.
                    </p>
                </div>
            </div>
            <div className="scroll-indicator">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>scroll</span>
            </div>
        </section>
    )
}
