import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MoviesAction } from 'types';
import { getMovies } from 'api/movies';

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesCollection(): [MoviesState, React.Dispatch<MoviesAction>] {
  // TODO: Implement all action processing

  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'fetch':
        const data: Movie[] = action.payload.data
        return { movies: [...data], initialized: true};
      case 'add':
        const addData: Movie = {...action.payload.movie,
          id: uuid(),
          ratings: []}
        return { ...state, movies: [...state.movies, addData]};

      case 'delete':
        const result: Movie[] = state.movies.filter(movie => movie.id !== action.payload.movieId);
        return { ...state, movies: result};

      case 'rate':
        const movies: Movie[]  = state.movies.map(movie => {
          if(movie.id === action.payload.movieId)
            movie.ratings.push(action.payload.rating);
          return movie;
        })
        return { ...state, movies };

      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  const loadData = async () => {
    const result = await getMovies();
    dispatch({type: 'fetch', payload: {data: result}})
  }
  useEffect(() => {
    // TODO: Call fetch action
    loadData();
  }, []);

  return [state, dispatch];
}
