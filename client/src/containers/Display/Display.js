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
    console.log(this.props);
    console.log(this.props.data);
    // console.log(this.props.data.length);
    return (
      <div>
        <Search />
        <div className={styles.container}>
          <ul>
            {!!this.props.data ? (
              this.props.data.businesses.map(this.renderList)
            ) : (
              <div>Loading...</div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps)(Display);
