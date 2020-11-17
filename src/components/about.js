import React from "react"

import shuvo from "../images/shuvo.jpg"
import cv from "../images/CV_Shafiqul_Islam.pdf"

const About = () => {
  return (
    <section id="about" className="about-section bg-white py-5">
      <div className="container">
        <h2 className="section-heading">
          <span>About Me</span>
        </h2>
        <div className="row">
          <div className="col-sm-4 col-md-4">
            <img
              className="img-thumbnail"
              src={shuvo}
              alt="Shafiqul Islam Shuvo"
            />
          </div>
          <div className="col-sm-8 col-md-8">
            <p>
              I am a Software Developer focused and specialized on the Front-End
              stacks. My journey began in 2016 after completing the{" "}
              <strong>"Web Development"</strong> certification course from{" "}
              <strong>IDB-BISEW</strong>. So far, I have learned and worked with{" "}
              <strong>HTML</strong>, <strong>CSS/SCSS</strong>,{" "}
              <strong>JavaScript</strong>, <strong>jQuery</strong>,{" "}
              <strong>Angular</strong>, <strong>Typescript</strong>,{" "}
              <strong>React</strong>, <strong>Redux</strong>,{" "}
              <strong>WordPress</strong>, <strong>PHP</strong>,{" "}
              <strong>MySQL</strong> and many more.
            </p>
            <p>
              I am passionate about building new things and solving logical &
              technical problems. My passion drives me everyday to learn, read,
              practice new things as well as keep sharpening the things that I
              already know.
            </p>
            <p>
              I always look for the opportunity where I can work on and build
              something that is user-centric. Because I love being appreciated
              and this is one of the many things that keeps me motivated after
              doing all the hard works.
            </p>
            <p>
              At present, I am learning Node.js, Python, CI/CD pipeline, Web
              Security, Testing Tools and AWS.
            </p>
            <p>
              In my free times, I work on building small things{" "}
              <a
                href="https://github.com/meghsohor"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <br />
              And I am always keen to help others to solve their problems{" "}
              <a
                href="https://stackoverflow.com/users/7646942/shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium"
              >
                StackOverflow
              </a>
            </p>
            <p>
              Besides my profession, I like reading, cooking and travelling. I
              wish one day I will be able to travel to different countries. And
              I believe that is my ultimate dream!
            </p>
          </div>
        </div>
      </div>

      <div className="about-me-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-md-3">
              <div className="about-me-segment">
                <h5 className="text-center text-uppercase">Socials</h5>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/meghsohor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin social-link"
                  >
                    <i className="fa fa-lg fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/meghsohor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github social-link"
                  >
                    <i className="fa fa-lg fa-github"></i>
                  </a>
                  <a
                    href="https://stackoverflow.com/users/7646942/shuvo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stack-overflow social-link"
                  >
                    <i className="fa fa-lg fa-stack-overflow"></i>
                  </a>
                  <a
                    href="https://twitter.com/meghsohor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter social-link"
                  >
                    <i className="fa fa-lg fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-3 col-md-3">
              <div className="about-me-segment text-center">
                <h5 className="text-uppercase">Email</h5>
                <p className="mb-2">meghsohor@gmail.com</p>
              </div>
            </div>

            <div className="col-sm-3 col-md-3">
              <div className="about-me-segment text-center">
                <h5 className="text-uppercase">Resume</h5>
                <a href={cv} target="_blank" className="cv-link">
                  <i className="fa fa-lg fa-file-pdf-o"></i> View/Download
                </a>
              </div>
            </div>

            <div className="col-sm-3 col-md-3">
              <div className="about-me-segment text-center">
                <h5 className="text-uppercase">Phone</h5>
                <p className="mb-2">+880 1771123333</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
