import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Admin from './views/Admin';
import VisitorDetails from './views/VisitorDetails';
import Notfound from './notFound'

const routing = (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/Admin" component={Admin} />
          <Route path="/VisitorDetails" component={VisitorDetails} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));