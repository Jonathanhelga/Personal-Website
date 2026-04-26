export default function AboutMeUI(){
    return(
        <section className="full-section full-screen" id="section-two">
            <div className="aboutMe-column left-column">
                <div className="glass-card scrollable-content">
                    <p>
                        I am a <i>Computer Science student</i> who discovered my direction by actually building things, writing code,
                        breaking it, fixing it, and slowly understanding how real systems logic work.
                        I'm interested in programming to solve real problems and create something genuine that helps people.
                        <br/>
                        <br/>
                        My approach to learning is defined by <i>depth</i>. I prefer the discipline for <i>low-level programming</i>. I am willing to trade speed for the thorough learning required to write safe and efficient code.
                        This mindset allows me to build robust skill and maintain focus in an industry that often chases the next trend.
                        <br/>
                        <br/>
                        My technical passion is <b><i>Embedded Systems</i></b>. I am most proficient in C and C++, specifically enjoying the challenges and beauty of memory management and hardware constraints.
                        While I have experience building full-stack web applications, I view them primarily as a way for me to understand the full data lifecycle from the sensor to the server.
                        <br/>
                        <br/>
                        Beyond the programming, my part-time job experience in high-pressure service environments taught me the lessons that classrooms cannot:
                        humility, resilience, and the absolute necessity of reliability.
                        I have learned to thrive under pressure, own my mistakes, and treat every challenge as an opportunity to sharpen my character.
                    </p>
                    <p>Lastly, I am capable, adaptable, and ready to contribute immediately.</p>

                    <div className="resume-container">
                        <p>View my resume?</p>
                        <a
                            href="/resume27Nov.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-button"
                        >
                            ↗ Open PDF
                        </a>
                    </div>
                </div>
            </div>
            <div className="aboutMe-column right-column">
                <div className="hobby-wrapper">
                    <div className="glass-card scrollable-content-hobby">
                        <h1>My Hobby:</h1>
                        <p>
                            I love to move around, read philosophy books, and programming😁.
                            I do several sports (basketball, swimming, running, hiking, etc.)
                            I had joined a prestigious High School basketball competition (DBL) in Indonesia
                            and also completed a full 42.2 km marathon in Hsinchu, Taiwan.
                            In the future, I plan to participate in a triathlon when I'm free from the hustle and bustle of work👨🏽‍💻.
                        </p>
                    </div>
                    <div className="glass-card image-row">
                        <div className="image-wrapper">
                            <img src="./AboutMeImages/beforeMarathon.jpg" alt="Before marathon" />
                        </div>
                        <div className="image-wrapper">
                            <img src="./AboutMeImages/FMTraining.jpg" alt="FM training" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
