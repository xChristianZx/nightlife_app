import React, { Component } from "react";
import styles from "./Search.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData } from "../../actions/index";

class Search extends Component {
  state = {
    input: ""
  };

  // temporary
  componentDidMount() {
    this.props.fetchData("Oakland");
  }

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.input);
    this.props.fetchData(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Where are you going tonight?</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Oakland, San Francisco, Austin"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchData }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
