import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './ui/Home'
import Admin from './admin/Admin';
import User from './admin/User';
import Books from './admin/Books';
import Evaluations from './admin/Evaluetions';
import NewBook from './admin/NewBook';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/user" component={User}/>
        <Route exact path="/admin/livros" component={Books}/>
        <Route exact path="/admin/avaliacoes" component={Evaluations}/>
        <Route exact path="/admin/livros/novo" component={NewBook}/>
        
        </div>
    </Router>
    )
  }
}

export default App;
