import React, { Component } from "react";
import styles from "./Display.css";
import { connect } from "react-redux";

class Display extends Component {
  renderList = cityData => {
    const name = cityData.name;
    return <li key={cityData.id}>{name}</li>;
  };

  render() {
    console.log(this.props);
    console.log(this.props.data);
    // console.log(this.props.data.length);
    return (
      <div className={styles.container}>
        <ul>
          {!!this.props.data
            ? this.props.data.businesses.map(this.renderList)
            : null}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ data }) {
  return { data };
}

export default connect(mapStateToProps)(Display);
