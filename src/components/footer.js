import React from "react"

const Footer = () => {
  return (
    <footer className="site-footer">
      <h4 className="text-center">MeghSohor</h4>
      <p className="text-center mb-2">Follow me on Social Media</p>

      <div className="footer-social-links">
        <ul className="social-links-list">
          <li>
            <a
              href="https://www.linkedin.com/in/meghsohor/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/meghsohor"
              target="_blank"
              rel="noopener noreferrer"
              className="github"
            >
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/meghsohor"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/users/7646942/shuvo"
              target="_blank"
              rel="noopener noreferrer"
              className="stack-overflow"
            >
              <i className="fa fa-stack-overflow"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
