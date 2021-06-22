import './assets/css/App.css';
import {Switch, Route, NavLink, Redirect} from 'react-router-dom';
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';
import PokeLogo from './assets/images/International_Pokémon_logo-300x110.webp';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={'/cuddly-guide'}>
          <img src={PokeLogo} width="100" height="50" />
        </NavLink>
      </nav>
      <Switch>
        <Route path={'/cuddly-guide'} exact component={PokemonList} />
        <Route path={'/cuddly-guide/pokemon/:pokemon'} exact component={Pokemon} />
        {/* /pokemon/test
         /pokemon/anything
        */}
        <Redirect to={'/cuddly-guide'} />
      </Switch>
    </div>
  );
}

export default App;
