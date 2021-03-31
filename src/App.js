import React  from "react";
import './assets/css/c3.css'
import './assets/css/semantic.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from "./Home";

function App() {
  return (
    <div>
        <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
