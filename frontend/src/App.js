import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Book } from './components/book/pages/Book';
import { AddBook } from './components/book/pages/AddBook';
import { EditBook } from './components/book/pages/EditBook';
import { Header } from './components/header/Header';

function App() {
  
  return (
      <Router>
        <Header />
        <Switch>
        <Route path="/" exact>
          <Book />
        </Route>
        <Route path="/book/new" exact>
          <AddBook />
        </Route>
        <Route path="/book/edit/:id" render={(props) => <EditBook {...props}/>}/>
        {/* </Route> */}
        </Switch>
      </Router>
  );
}

export default App;
