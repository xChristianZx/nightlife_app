import React, { Component } from "react";
import styles from "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../actions/index";
import { bindActionCreators } from "redux";

class NavBar extends Component {
  renderNavLink = () => {
    const { isLoggedIn, user } = this.props.auth;

    switch (isLoggedIn) {
      case true:
        return [
          <li key={"3"}>
            <p>Welcome {user.username}!</p>
          </li>,
          <li key={"4"}>
            <Link
              to="/logout"
              onClick={() => this.props.userLogout(user.username)}
            >
              Logout
            </Link>
          </li>
        ];
      default:
        return [
          <li key={"1"}>
            <Link to="/login">Login</Link>
          </li>,
          <li key={"2"}>
            <Link to="/register">Register</Link>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userLogout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
