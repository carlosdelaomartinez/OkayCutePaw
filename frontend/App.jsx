import React from "react";
import GreetingContainer from './components/greeting/greeting_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './components/forms/login_form_container';
import SignupFormContainer from './components/forms/signup_form_container';
import { AuthRoute } from "./util/route_util.jsx";
import Navbar from "./components/navbar";
// import SearchIndexContainer from "./components/bench/search_container"
const App = () => (
  <div>
    <header>
      <Navbar />
      <GreetingContainer />
      <h1>OK CUTE PAW!!!!</h1>

    </header>
    <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} />
    {/* <Route exact path="/" component={SearchIndexContainer} /> */}
  </div>
);

export default App;