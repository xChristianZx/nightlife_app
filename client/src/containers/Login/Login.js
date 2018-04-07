import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/index";
import { Route, Redirect } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    const input = e.target.name;
    this.setState({ [input]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const trimUser = username.trim();
    const trimPassword = password.trim();
    this.props.fetchUser({ username: trimUser, password: trimPassword });
    this.setState({ username: "", password: "" });
  };

  render() {
    console.log("auth", this.props.auth);
    return (
      <Route>
        {this.props.auth.user ? (
          <Redirect to="/" />
        ) : (
          <LoginForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </Route>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
