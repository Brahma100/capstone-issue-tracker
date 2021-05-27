
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer style={{borderTop:'2px solid rgb(39, 39, 39)' ,paddingTop:'10px'}} className="footer">
        <Container fluid>
          <nav className="pull-left">
            <ul >
              <li>
                <a href="/"><b>Home</b></a>
              </li>
              <li>
                <a href="#"><b>Issues</b></a>
              </li>
              <li>
                <a href="/aboutUs"><b>About Us</b></a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="/">
             <b> TrackerZ</b>
            </a>
            , Made with  <FontAwesomeIcon style={{color:'red'}} icon={faHeart}/> in <b> India</b>
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
