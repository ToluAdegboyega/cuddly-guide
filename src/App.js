import "./assets/css/App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";
import PokemonLanding from "./containers/PokemonLanding";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path={"/cuddly-guide/landing"}
          exact
          component={PokemonLanding}
        />
        <Route path={"/cuddly-guide"} exact component={PokemonList} />
        <Route
          path={"/cuddly-guide/pokemon/:pokemon"}
          exact
          component={Pokemon}
        />
        {/* /pokemon/test
         /pokemon/anything
        */}
        <Redirect to={"/cuddly-guide"} />
      </Switch>
    </div>
  );
}

export default App;
