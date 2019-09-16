import React from "react";
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './components/forms/login_form_container';
import SignupFormContainer from './components/forms/signup_form_container';
import { AuthRoute, ProtectedRoute } from "./util/route_util.jsx";
import SplashPage from "./components/splash/splash";
import HomeIndex from './components/userIndex/homeIndex';
const App = () => (
  <div>
    <Switch>

      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path='/home' component={HomeIndex} />
      <AuthRoute path='/' component={SplashPage} />
      
    </Switch>

  </div>
);

export default App;