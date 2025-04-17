import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Human Team Foundation</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Human Team Foundation is dedicated to empowering communities through education, 
            healthcare, and sustainable development initiatives. We believe in creating lasting 
            positive change by working directly with local communities and fostering partnerships 
            that promote self-reliance and dignity.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <div className="initiatives-grid">
            <div className="initiative-card">
              <h3>Education</h3>
              <p>Providing quality education and learning resources to underprivileged children.</p>
            </div>
            <div className="initiative-card">
              <h3>Healthcare</h3>
              <p>Organizing medical camps and providing essential healthcare services.</p>
            </div>
            <div className="initiative-card">
              <h3>Community Development</h3>
              <p>Supporting local initiatives and building sustainable infrastructure.</p>
            </div>
            <div className="initiative-card">
              <h3>Women Empowerment</h3>
              <p>Creating opportunities for women through skill development and education.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <h3>1000+</h3>
              <p>Children Educated</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Villages Reached</p>
            </div>
            <div className="stat-card">
              <h3>5000+</h3>
              <p>Lives Impacted</p>
            </div>
            <div className="stat-card">
              <h3>100+</h3>
              <p>Volunteers</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><strong>Address:</strong> 123 NGO Street, Mumbai, Maharashtra, India</p>
            <p><strong>Email:</strong> info@humanteamfoundation.org</p>
            <p><strong>Phone:</strong> +91 123-456-7890</p>
          </div>
        </section>

        <section className="about-section">
          <h2>Support Our Cause</h2>
          <p>
            Your support helps us continue our mission of creating positive change. 
            All donations are eligible for tax benefits under 80G of the Income Tax Act.
          </p>
          <button className="donate-button" onClick={() => window.location.href = '/'}>
            Add a Donation
          </button>
        </section>
      </div>
    </div>
  );
};

export default About; 