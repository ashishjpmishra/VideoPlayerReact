import React from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import VideoWatchPage from './VideoWatchPage/VideoWatchPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Link to='/'>Home</Link>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/Video/watch/1' />} />
        <Route exact path='/Video/watch/:videoId' component={VideoWatchPage} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
