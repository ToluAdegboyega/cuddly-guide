import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from '../redux/actions/pokemonActions';
import _ from 'lodash';

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);

    useEffect(() => {
       dispatch(GetPokemon(pokemonName));
    }, []);

    const showData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return (
                <div className={'pokemon-wrapper'}>
                    <div className={'pokemon-image'}>
                        <img src={pokeData.sprites.other['official-artwork'].front_default} alt='' />
                    </div>
                    <div className={'pokemon-text'}>
                        <div className={'pokemon-stat'}>
                            <h1>Stats</h1>
                            {pokeData.stats.map(el => {
                                return <p key={el.stat.name}>
                                    {el.stat.name.charAt(0).toUpperCase() + el.stat.name.slice(1)} - {el.base_stat}
                                </p>
                            })}
                        </div>
                        <div className={'pokemon-ability'}>
                            <h1>Abilities</h1>
                            {pokeData.abilities.map(el => {
                                return <p key={el.ability.name}>
                                    {el.ability.name.charAt(0).toUpperCase() + el.ability.name.slice(1)}
                                </p>
                            })}
                        </div>
                    </div>
                </div>
            )
        };

        if (pokemonState.loading) {
            return <p className={'loading-error'}>Loading...</p>
        }

        if (pokemonState.errorMsg !== '') {
            return <p className={'loading-error'}>{pokemonState.errorMsg}</p>
        }

        return <p className={'loading-error'}>Unable to Get Data.</p>
    }

    return (
        <div className={'poke'}>
           <h1 className={'poke-name'}>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
           {showData()}
        </div>
    )
}

export default Pokemon;
