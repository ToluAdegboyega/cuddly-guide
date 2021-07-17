import React from "react";
import { Link } from "react-router-dom";

const PokemonLanding = () => {
  return (
    <main>
      <Link to={"/cuddly-guide"} className="main-button anotherAnimated bounce">
        explore.
      </Link>
    </main>
  );
};

export default PokemonLanding;
