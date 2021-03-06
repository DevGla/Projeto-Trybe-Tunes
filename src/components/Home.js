import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import NotFound from '../pages/NotFound';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ Login } />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="/search" component={ Search } />
        <Route path="*" component={ NotFound } />
      </div>
    );
  }
}

export default Home;
