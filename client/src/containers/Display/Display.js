import React, { Component } from "react";
import styles from "./Display.css";
import { connect } from "react-redux";
import ListItem from "../../components/ListItem/ListItem";
import Search from "../Search/Search";

class Display extends Component {
  renderList = cityData => {
    return <ListItem key={cityData.id} data={cityData} />;
  };

  render() {
    const { data, isFetching } = this.props.data;
    return (
      <div>
        <Search />
        <div className={styles.container}>
          {data === null || isFetching ? (
            <div className="ui active loader text">Loading...</div>
          ) : (
            <ul>{data.businesses.map(this.renderList)}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps)(Display);
