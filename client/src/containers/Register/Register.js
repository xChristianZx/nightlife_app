import React, { Component } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerUser } from "../../actions/index";
import { Route, Redirect } from "react-router-dom";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  };

  handleChange = e => {
    const input = e.target.name;
    this.setState({ [input]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstname, lastname, username, password } = this.state;
    const trimFirst = firstname.trim();
    const trimLast = lastname.trim();
    const trimUser = username.trim();
    const trimPassword = password.trim();
    this.props.registerUser({
      firstname: trimFirst,
      lastname: trimLast,
      username: trimUser,
      password: trimPassword
    });
    this.setState({ firstname: "", lastname: "", username: "", password: "" });
  };

  render() {
    return (
      <Route>
        {this.props.auth.isLoggedIn ? (
          <Redirect to="/venues" />
        ) : (
          <RegisterForm
            {...this.state}
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
  return bindActionCreators({ registerUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
