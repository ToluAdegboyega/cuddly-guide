import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { GetPokemonList } from '../redux/actions/pokemonActions';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);

    const [search, setSearch] = useState('');

    const fetchData = (page = 1) => {
        dispatch(GetPokemonList(page));
    }

    useEffect(() => {
        fetchData(1);
    }, []);

    const showData = () => {
        if (!_.isEmpty(pokemonList.data)) {
            return (
                <div className={'list-wrapper'}>
                    {pokemonList.data.map(el => {
                        return (
                            <div className={'pokemon-item'} key={el.name}>
                                <p>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</p>
                                <Link to={`/pokemon/${el.name}`}>View</Link>
                            </div>
                        );
                    })}
                </div>
            )
        };

        if (pokemonList.loading) {
            return <p>Loading...</p>
        }

        if (pokemonList.errorMsg !== '') {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>Unable to Get Data.</p>
    }

    return (
        <div>
            <div className={'search-wrapper'}>
                <input type ="text" onChange={e => setSearch(e.target.value)} />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {showData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => fetchData(data.selected + 1)}
                    containerClassName={'pagination'}
                />
            )}
        </div>
    )
}

export default PokemonList;
