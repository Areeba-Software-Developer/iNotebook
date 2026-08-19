import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <section className="about-hero">
                    <div>
                        <span className="about-badge">Built for focus</span>
                        <h1>Smart notes for your everyday work.</h1>
                        <p>
                            iNotebook helps you capture ideas, organise important thoughts,
                            and stay productive with a clean, distraction-free workspace.
                            Whether you are planning your day or saving a quick reminder,
                            everything stays simple, secure, and easy to access.
                        </p>
                    </div>

                    <div className="about-hero-panel">
                        <div className="mini-card">
                            <span className="mini-label">Fast access</span>
                            <strong>1 click</strong>
                            <span>to save and revisit your notes</span>
                        </div>

                        <div className="mini-card">
                            <span className="mini-label">Organised</span>
                            <strong>100%</strong>
                            <span>clear, readable, and productivity-first</span>
                        </div>
                    </div>
                </section>

                <section className="about-stats">
                    <div className="stat-card">
                        <h3>24/7</h3>
                        <p>Keep your thoughts available whenever inspiration strikes.</p>
                    </div>

                    <div className="stat-card">
                        <h3>Smart</h3>
                        <p>Capture and manage notes in a clean, focused workspace.</p>
                    </div>

                    <div className="stat-card">
                        <h3>Simple</h3>
                        <p>Designed to feel intuitive on every screen size and device.</p>
                    </div>
                </section>

                <section className="about-section">
                    <div className="about-section-header">
                        <h2>Why people use iNotebook</h2>
                        <p>
                            A modern note-taking app should feel effortless, organised, and built
                            around how people actually work and think.
                        </p>
                    </div>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">✦</div>
                            <h3>Capture ideas quickly</h3>
                            <p>Write notes instantly without stress, clutter, or extra steps.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">✓</div>
                            <h3>Stay organised</h3>
                            <p>Keep everything in one place and revisit your information anytime.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">☰</div>
                            <h3>Built for focus</h3>
                            <p>A clean interface removes distractions so you can stay in flow.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;