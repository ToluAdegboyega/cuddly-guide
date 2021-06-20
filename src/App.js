import './assets/css/App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';
import PokeLogo from './assets/images/International_Pokémon_logo-300x110.webp';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={'/'}>
          <img src={PokeLogo} width="100" height="50" />
        </NavLink>
      </nav>
      <Switch>
        <Route path={'/'} exact component={PokemonList} />
        <Route path={'/pokemon/:pokemon'} exact component={Pokemon} />
        {/* /pokemon/test
         /pokemon/anything
        */}
        <Redirect to={'/'} />
      </Switch>
    </div>
  );
}

export default App;
