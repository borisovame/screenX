import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TYPE_LISTS } from '../../../constants';
import Error from '../../inc/Error';
import Loading from '../../inc/Loading';
import { useGetMoviesQuery } from '../../../service/api';
import MoviesGrid from '../../inc/MoviesGrid';

export default function MainTypeList() {
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.movieSlice,
  );
  const [page, setPage] = useState(1);
  const movieType = TYPE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

  const responseFilms = useGetMoviesQuery({
    type: movieType.value,
    countries,
    order,
    year,
    genreId: myGenreId,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error) return <Error />;

  if (responseFilms.isLoading) return <Loading />;

  return (
    <MoviesGrid
      films={responseFilms.data}
      serials={responseFilms.data}
      cartoons={responseFilms.data}
      currentPath={location.pathname}
      totalPages={responseFilms.data.totalPages}
      page={page}
      setPage={setPage}
    />
  );
}
