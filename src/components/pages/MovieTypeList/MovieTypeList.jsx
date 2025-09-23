import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIE_LISTS } from '../../../constants';
import Error from '../../inc/Error';
import Loading from '../../inc/Loading';
import { useGetMoviesCollectionsQuery } from '../../../service/api';
import MoviesGrid from '../../inc/MoviesGrid';

export default function MovieTypeList() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);

  const responseCollection = useGetMoviesCollectionsQuery({
    type: movieType.value,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseCollection.error) return <Error />;

  if (responseCollection.isLoading) return <Loading />;

  return (
    <MoviesGrid
      popular={responseCollection.data}
      family={responseCollection.data}
      romantic={responseCollection.data}
      catastrophe={responseCollection.data}
      currentPath={location.pathname}
      totalPages={responseCollection.data.totalPages}
      page={page}
      setPage={setPage}
    />
  );
}
