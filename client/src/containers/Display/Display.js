import React, { Component } from "react";
import styles from "./Display.css";
import { connect } from "react-redux";
import ListItem from "../../components/ListItem/ListItem";

class Display extends Component {
  renderList = cityData => {
    return <ListItem key={cityData.id} data={cityData} />;
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
