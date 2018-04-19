import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchData } from "../../actions/index";
import { Route, Redirect } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";

class Search extends Component {
  state = {
    input: ""
  };

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
    const { isFetching } = this.props.data;
    return (
      <Route>
        {isFetching ? (
          <Redirect to="/venues" />
        ) : (
          <SearchForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.input}
          />
        )}
      </Route>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchData }, dispatch);
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
