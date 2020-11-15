import React from 'react'

const Footer = () => {
    return (
        <footer className="site-footer">
            <h4 className="text-center">MeghSohor</h4>
            <p className="text-center">Follow me on Social Media</p>

            <div className="footer-social-links">
                <ul className="social-links-list">
                    <li>
                        <a href="https://www.facebook.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="facebook"
                        >
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin"
                        >
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram"
                        >
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="twitter"
                        >
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.google.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="google"
                        >
                            <i className="fa fa-google"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
