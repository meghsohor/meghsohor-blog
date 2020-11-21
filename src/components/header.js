import React, {useState} from "react"
import PropTypes from "prop-types"
import { globalHistory as history } from "@reach/router"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import logo from '../images/logo.png'

const Header = ({ siteTitle }) => {
  const currentPage = history.location.pathname;
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <header className="site-header">
      <Navbar light expand="md">
        <div className="container">
          <NavbarBrand className="header-logo" href="/">
            <img src={logo} alt={siteTitle} />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/blog" active={currentPage.includes('/blog')}>
                  Blog
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/team" active={currentPage === "/team"}>
                  Team
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink href="/tags" active={currentPage === "/tags"}>
                  Tags
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink href="/about" active={currentPage === "/about"}>
                  About
                </NavLink>
              </NavItem> */}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
