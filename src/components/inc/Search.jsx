import React, { useEffect, useState } from 'react';
import { useGetMoviesQuery } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../features/searchSlice';
import Loading from './Loading';
import Error from './Error';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { type, countries, order, year, genreId, keyword } = useSelector(
    state => state.searchSlice,
  );

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const responseFilms = useGetMoviesQuery({
    type,
    countries,
    order,
    year,
    genreId,
    page,
    keyword,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: search }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, dispatch]);

  if (responseFilms.error) return <Error />;

  if (responseFilms.isLoading) return <Loading />;

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex space-x-4 flex-nowrap ml-auto w-full justify-center">
        <input
          type="text"
          placeholder="Введите название"
          className="mt-1 rounded-md bg-gray-800 px-2 py-1 w-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {search.trim() !== '' &&
        responseFilms.data &&
        Array.isArray(responseFilms.data.items) &&
        responseFilms.data.items.length > 0 && (
          <ul className="absolute z-10 w-full max-w-xs mt-1 bg-gray-900 rounded-md shadow-lg max-h-60 overflow-y-auto text-white text-sm">
            {responseFilms.data.items.map(movie => (
              <li
                key={movie.kinopoiskId}
                className="px-3 py-2 cursor-pointer hover:bg-indigo-600"
                onClick={() => {
                  navigate(`/movie/${movie.kinopoiskId}`);
                  setSearch('');
                }}
              >
                {movie.nameRu}, {movie.year}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
