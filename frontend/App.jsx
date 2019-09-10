import React from "react";
import GreetingContainer from './components/greeting/greeting_container';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './components/forms/login_form_container';
import SignupFormContainer from './components/forms/signup_form_container';
import { AuthRoute } from "./util/route_util.jsx";
import Navbar from "./components/navbar";
import SplashPage from "./components/splash/splash";
// import SearchIndexContainer from "./components/bench/search_container"
const App = () => (
  <div>
    <Switch>

      <AuthRoute path="/login" component={LoginFormContainer, Navbar} />
      <AuthRoute path="/signup" component={SignupFormContainer, Navbar} />
      <Route path='/' component={SplashPage} />
    </Switch>



    {/* <header>
      <Navbar />
      <GreetingContainer />
      <h1>OK CUTE PAW!!!!</h1>
    </header> */}

    {/* <Route exact path="/" component={SearchIndexContainer} /> */}
  </div>
);

export default App;