import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tests from './pages/Tests.js';
import RecipePreferences from './pages/RecipePreferences.js';
import NotFound from './pages/NotFoundPage'
import './css/App.css';

class App extends Component {
  render() {
    


    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={RecipePreferences} exact />
            {/* <Route path="/home" component={HomePage}  /> */}
            {/* <Route path="/ingredient" component={IngredientPage} /> */}
            <Route path="/tests" component={Tests} />
            <Route component={NotFound}  />
          </Switch>
        </div>
       </Router>

    );
  }


}

export default App;
