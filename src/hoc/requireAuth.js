import React, { Component } from 'react';
import { connect } from 'react-redux';
// check if user is logged in
export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount(){
      this.shouldNavigateAway();
    }

    componentDidUpdate(){
      this.shouldNavigateAway();
    }

    shouldNavigateAway(){
      if(!this.props.auth && !localStorage.getItem("token")) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
  }
  return connect(mapStateToProps, null)(ComposedComponent);
}