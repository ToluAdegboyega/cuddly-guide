import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

import PokeLogo from "../assets/images/International_Pokémon_logo-300x110.webp";
import { GetPokemonList } from "../redux/actions/pokemonActions";

const PokemonList = (props) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const perPage = 15;
  const offset = currentPage * perPage;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const fetchData = () => {
    dispatch(GetPokemonList());
  };

  useEffect(() => {
    fetchData();
  }, []);

  function compare(a, b) {
    let comparison = 0;
    if (a.name > b.name) {
      comparison = 1;
    } else if (a.name < b.name) {
      comparison = -1;
    }
    return comparison;
  }

  const showData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data
            .sort(compare)
            .slice(offset, offset + perPage)
            .map((el) => {
              return (
                <div className={"pokemon-item"} key={el.name}>
                  <p>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</p>
                  <Link to={`cuddly-guide/pokemon/${el.name}`}>View</Link>
                </div>
              );
            })}
        </div>
      );
    }

    if (pokemonList.loading) {
      return <p className={"loading-error"}>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p className={"loading-error"}>{pokemonList.errorMsg}</p>;
    }

    return <p className={"loading-error"}>Unable to Get Data.</p>;
  };

  return (
    <div>
      <nav>
        <NavLink to={"/cuddly-guide"}>
          <img src={PokeLogo} width="100" height="50" />
        </NavLink>
      </nav>
      <div className={"search-wrapper"}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter A Pokemon Name"
        />
        <button
          onClick={() => props.history.push(`cuddly-guide/pokemon/${search}`)}
        >
          Search
        </button>
      </div>
      {showData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / perPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
        />
      )}
    </div>
  );
};

export default PokemonList;
