import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery, useGetStaffQuery } from '../../../service/api';
import Error from '../../inc/Error';
import Loading from '../../inc/Loading';
import Player from '../../inc/Player/Player';

export default function MovieDetails() {
  const { id } = useParams();
  const responseMovie = useGetMovieQuery(id);
  const responseStaff = useGetStaffQuery(id);
  if (responseMovie.isLoading || responseStaff.isLoading) return <Loading />;
  if (responseMovie.error || responseStaff.error) return <Error />;
  const movie = responseMovie.data;
  const staff = responseStaff.data;
  const directors = staff.filter(
    person => person.professionText === 'Режиссеры',
  );
  const actors = staff.filter(person => person.professionText === 'Актеры');

  return (
    <div className="text-gray-300 p-4">
      <button
        className="flex items-center mb-4 text-indigo-500"
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-2 stroke-indigo-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        Назад
      </button>

      <div className="sm:flex sm:flex-row flex-col">
        <div className="sm:mr-4 mb-4 sm:mb-0 flex-shrink-0 flex flex-col items-center">
          <img src={movie.posterUrl} alt={movie.nameRu} className="w-80" />
          <p className="mt-4 text-lg">
            <span className="text-3xl text-indigo-500">
              {movie.ratingKinopoisk ? movie.ratingKinopoisk : '-'}
            </span>
            /10, {movie.countries[0].country}
          </p>
        </div>
        <div>
          <h1 className="text-3xl text-white mb-2">
            {movie.nameRu}{' '}
            <span className="text-xl text-gray-400">{movie.year} г.</span>
          </h1>
          <p className="mb-2 sm:text-lg">{movie.description}</p>
          <p className="text-gray-400">
            Режиссеры:{' '}
            {directors.length > 0
              ? directors.map(d => d.nameRu).join(', ')
              : 'Неизвестен'}
          </p>
          <p className="text-gray-400">
            Актеры:{' '}
            {actors
              .slice(0, 6)
              .map(actor => actor.nameRu)
              .join(', ')}{' '}
            и др.
          </p>
          <p className="text-3xl mt-10 mb-5 text-center text-indigo-500">
            Смотреть онлайн
          </p>
          <div className="flex justify-center items-center space-x-4 mb-5">
            <a
              href={`https://www.imdb.com/title/${movie.imdbId}`}
              className="border border-white bg-gray-900 text-gray-400 px-2 py-1 rounded-md
               hover:border-indigo-500 hover:text-indigo-500 active:border-indigo-500 active:text-indigo-500"
            >
              Imdb
            </a>
            <a
              href={movie.webUrl}
              className="border border-white bg-gray-900 text-gray-400 px-2 py-1 rounded-md
               hover:border-indigo-500 hover:text-indigo-500 active:border-indigo-500 active:text-indigo-500"
            >
              Кинопоиск
            </a>
          </div>
          <Player />
        </div>
      </div>
    </div>
  );
}
