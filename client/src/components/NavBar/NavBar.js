import React, { Component } from "react";
import styles from "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  renderNavLink = () => {
    switch (this.props.auth.user) {
      case null:
        return [
          <li key={"1"}>
            <Link to="/login">Login</Link>
          </li>,
          <li key={"2"}>
            <Link to="/register">Register</Link>
          </li>
        ];
      default:
        return [
          <li key={"3"}>
            <p>Welcome {this.props.auth.user.username}!</p>
          </li>,
          <li key={"4"}>
            <a>Logout</a>
          </li>
        ];
    }
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <h2>uNight</h2>
            </Link>
          </div>
          <ul className={styles.routesContainer}>
            {/* <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li> */}
            {this.renderNavLink()}
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(NavBar);
