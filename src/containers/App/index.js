import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ErrorToast from "../../components/ErrorToast";
import { actions as appActions, getError } from "../../redux/modules/app";
import asyncComponent from "../../utils/AsyncComponent";
import PrivateRoute from "../PrivateRoute";

const Home = asyncComponent(()=> import('../Home'))
const ProductDetail = asyncComponent(()=> import("../ProductDetail"))
const Search = asyncComponent(()=> import("../Search"))
const SearchResult = asyncComponent(()=> import('../SearchResult'))
const Login = asyncComponent(()=> import('../Login'))
const User = asyncComponent(()=> import('../User'))
const Purchase = asyncComponent(()=> import('../Purchase'))

class App extends Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/login' component={Login}/>
            <PrivateRoute path='/user' component={User}/>
            <Route path='/detail/:id' component={ProductDetail}/>
            <Route path='/search' component={Search}/>
            <Route path='/search_result' component={SearchResult}/>
            <PrivateRoute path='/purchase/:id' component={Purchase}/>
            <Route path='/' component={Home}/>
          </Switch>
        </Router>

        {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
