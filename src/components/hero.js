import React from "react"

import heroImg from "../images/hero-banner.jpeg"

const Hero = () => {
    const gotoAboutSection = (e) => {
        e.preventDefault();
        const positionY = document.querySelector('#about').offsetTop;
        const headerHeight = document.querySelector('.site-header nav').clientHeight;
        window.scroll({
          top: positionY,
          behavior: "smooth",
        })
    }
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="hero-container">
        <div className="hero-header">
          <h1>
            <span>
              Shafiqul Islam
              <span className="sub-span">
                <span>Software Developer</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="learn-more">
          <a href="#" onClick={gotoAboutSection}>
            <div className="text">Learn More</div>
            <div className="icon">
              <i className="fa fa-chevron-down"></i>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
