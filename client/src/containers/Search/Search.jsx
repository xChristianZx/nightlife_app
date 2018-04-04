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
      <div className={styles.wrapper}>
        <div className={`${styles.container}`}>
          <h2 className={""}>Where are you going tonight?</h2>

          <form
            className={`${styles.form} ui form`}
            onSubmit={this.handleSubmit}
          >
            <div className="inline field">
              <input
                className={"ui input"}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder={`Oakland, San Francisco, Austin`}
              />
              <button className={`ui button primary`} type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchData }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
