import React, { Component } from "react";
import styles from "./Display.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { venueAddUser, venueRemoveUser } from "../../actions/index";
import ListItem from "../../components/ListItem/ListItem";
import Search from "../Search/Search";

class Display extends Component {
  toggleUserRSVP = yelp_id => {
    const user_id = this.props.auth.user._id;
    const newAttendee = {
      yelp_id,
      _user: user_id
    };
    return newAttendee;
  };

  addUser = yelp_id => {
    this.props.venueAddUser(this.toggleUserRSVP(yelp_id));
  };
  removeUser = yelp_id => {
    this.props.venueRemoveUser(this.toggleUserRSVP(yelp_id));
  };

  renderList = cityData => {
    return (
      <ListItem
        key={cityData.id}
        data={cityData}
        auth={this.props.auth}
        addUser={this.addUser}
        removeUser={this.removeUser}
      />
    );
  };

  renderDisplay = () => {
    const { data, isFetching } = this.props.data;
    if (data === null && isFetching) {
      return <div className="ui active loader text">Loading...</div>;
    } else if (data === null && !isFetching) {
      return (
        <div className="ui message">
          <p>Please input a city or location</p>
        </div>
      );
    } else {
      return (
        <ul className={styles.list_container}>{data.map(this.renderList)}</ul>
      );
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Search />
        <div className={styles.container}>{this.renderDisplay()}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ venueAddUser, venueRemoveUser }, dispatch);
}

function mapStateToProps({ data, auth }) {
  return { data, auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
