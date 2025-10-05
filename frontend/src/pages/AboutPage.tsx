import React from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Intro */}
      <section className="about-intro wrapper">
        <h2 className="eyebrow">Who are we?</h2>
        <p className="intro-text">
          At Renart, we are a team of curious individuals with diverse backgrounds and various areas of expertise,
          all brought together by a shared can-do attitude. By collaborating across different fields and areas of
          know-how, together, we develop brands with unique value propositions and engineer sustainable, seamlessly
          tailored shopping experiences for the evolving and dynamic needs of modern-day customers.
        </p>
      </section>

      {/* Journey + copy */}
      <section className="about-journey wrapper">
        <div className="journey-left">
          <h1 className="display">Our Journey</h1>

          <div className="kpi big">
            <div className="kpi-value"><span className="muted">+</span>50</div>
            <div className="kpi-label">Years of Experience</div>
          </div>

          <Link to="/contact" className="cta-pill">
            <span>Get In Touch</span>
            <span className="arrow">↗</span>
          </Link>
        </div>

        <div className="journey-right">
          <p>
            Renart is a fully integrated group company, housing different brands under its roof. Our different brands
            are all connected by a culture of innovation, collaboration and a commitment to social and environmental
            responsibility. This shared foundation shapes everything we do and reflects across all functions.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="about-stats wrapper">
        <div className="kpi">
          <div className="kpi-value"><span className="muted">+</span>50</div>
          <div className="kpi-label">Years of Experience</div>
        </div>

        <div className="kpi">
          <div className="kpi-value">98<span className="muted">%</span></div>
          <div className="kpi-label">Client Satisfaction</div>
        </div>

        <div className="kpi">
          <div className="kpi-value"><span className="muted">+</span>13</div>
          <div className="kpi-label">Brands Created</div>
        </div>
      </section>
    </main>
  )
}
