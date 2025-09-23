import React from 'react';
import getMovies from './getMovies';
import Error from '../../inc/Error';
import Loading from '../../inc/Loading';
import MoviesGrid from '../../inc/MoviesGrid';

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseFamily,
    responseRomantic,
    responseCatastrophe,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = getMovies();

  if (isLoading) return <Loading />;

  if (hasError) return <Error />;

  return (
    <MoviesGrid
      popular={responsePopular.data}
      family={responseFamily.data}
      romantic={responseRomantic.data}
      catastrophe={responseCatastrophe.data}
      films={responseFilms.data}
      serials={responseSerials.data}
      cartoons={responseCartoons.data}
    />
  );
}
