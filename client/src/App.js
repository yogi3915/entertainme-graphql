import './App.css';
import { Route, Switch } from 'react-router-dom'
import NavigationComponent from './components/Navigation'
import HomeComponent from './components/Home'
import AddMovieComponent from './components/AddMovie'
import FavoritesComponent from './components/Favorites';
import UpdateComponent from './components/UpdateMovie'

import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'

function App() {
  return (
    <div>
      <ApolloProvider client={client}>

        <NavigationComponent />
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <Switch>
                <Route exact path="/">
                  <HomeComponent />
                </Route>
                <Route path="/favorites">
                  <FavoritesComponent />
                </Route>
                <Route path="/addMovie">
                  <AddMovieComponent />
                </Route>
                <Route path="/update/:id">
                  <UpdateComponent />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
