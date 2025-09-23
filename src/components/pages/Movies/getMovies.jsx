import {
  useGetMoviesCollectionsQuery,
  useGetMoviesQuery,
} from '../../../service/api';
import { MOVIE_LISTS } from '../../../constants';
import { useSelector } from 'react-redux';

export default function getMovies() {
  const { countries, order, year, page } = useSelector(
    state => state.movieSlice,
  );

  const responsePopular = useGetMoviesCollectionsQuery({
    type: MOVIE_LISTS[0].value,
    page,
  });

  const responseFamily = useGetMoviesCollectionsQuery({
    type: MOVIE_LISTS[1].value,
    page,
  });

  const responseRomantic = useGetMoviesCollectionsQuery({
    type: MOVIE_LISTS[2].value,
    page,
  });

  const responseCatastrophe = useGetMoviesCollectionsQuery({
    type: MOVIE_LISTS[3].value,
    page,
  });

  const responseFilms = useGetMoviesQuery({
    type: 'FILM',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });

  const responseSerials = useGetMoviesQuery({
    type: 'TV_SERIES',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });

  const responseCartoons = useGetMoviesQuery({
    type: 'FILM',
    countries,
    genreId: '18',
    order,
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseFamily.isFetching ||
    responseRomantic.isFetching ||
    responseCatastrophe.isFetching ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseFamily.error ||
    responseRomantic.error ||
    responseCatastrophe.error ||
    responseFilms.isFetching ||
    responseSerials.isFetching ||
    responseCartoons.isFetching;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseFamily,
    responseRomantic,
    responseCatastrophe,
    responseFilms,
    responseSerials,
    responseCartoons,
  };
}
