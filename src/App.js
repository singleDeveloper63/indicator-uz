import React, { Component } from 'react';
import Header from './Components/Header/Header';
import SearchBar from './Components/SearchBar/SearchBar';
import Banner from './Components/Banner/Banner';
import { Route , Switch} from 'react-router-dom';
import Register from './Pages/Register/register';
import Login from './Pages/Login/login';
import ResetPage from './Pages/ResetPassword/reset';

 export default class App extends Component {
  render () {
    return (
      <div>
        <Header/>
        <SearchBar/>
        <Switch>
          <Route exact path='/' component={Banner}/>
          <Route exact path='/sign-up' component={ Register }/>
          <Route exact path='/sign-in' component={ Login}/>
          <Route exact path='/resetpassword/:token' component={ ResetPage }/>
        </Switch>
      </div>
    )
  }
}
