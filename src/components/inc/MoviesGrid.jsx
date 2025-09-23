import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Pagination from './Pagination';

export default function MoviesGrid({
  popular = [],
  family = [],
  romantic = [],
  catastrophe = [],
  films = [],
  serials = [],
  cartoons = [],
  currentPath = '',
  totalPages,
  page,
  setPage,
}) {
  const location = useLocation();
  const mainPage = location.pathname === '/';

  const truncateText = (text, maxLength = 14) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const renderCard = item => (
    <Link
      key={item.kinopoiskId}
      to={`/movie/${item.kinopoiskId}`}
      className="rounded-lg overflow-hidden shadow-md bg-gray-800 block"
    >
      <img
        className="max-w-full h-auto object-contain"
        src={item.posterUrl}
        alt={item.nameRu}
      />
      <div className="p-2">
        <h3 className="text-lg text-gray-300 font-semibold">
          {truncateText(item.nameRu)}
        </h3>
      </div>
    </Link>
  );

  const renderCardsWithButton = (items, category, path) => {
    const displayItems = mainPage ? items.slice(0, 5) : items;
    const showButton = mainPage ? items.length > 5 : false;

    const gridItems = displayItems.map(item => renderCard(item));

    if (showButton) {
      gridItems.push(
        <Link
          key="button"
          to={path}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 m-auto w-full rounded-3xl md:h-12 cursor-pointer"
        >
          <span>Смотреть все</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>,
      );
    }

    return (
      <div className="mb-8">
        <div className="grid gap-4 mb-4 grid-cols-3 md:grid-cols-6">
          {gridItems}
        </div>

        {!showButton && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        )}
      </div>
    );
  };

  const showPopular = currentPath === '/popular' || currentPath === '';
  const showFamily = currentPath === '/family' || currentPath === '';
  const showRomantic = currentPath === '/romantic' || currentPath === '';
  const showCatastrophe = currentPath === '/catastrophe' || currentPath === '';
  const showFilms = currentPath === '/films' || currentPath === '';
  const showSerials = currentPath === '/serials' || currentPath === '';
  const showCartoons = currentPath === '/cartoons' || currentPath === '';

  return (
    <div className="p-4 space-y-8">
      {showPopular && popular.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Популярные</h2>
          {renderCardsWithButton(popular.items, 'Популярные', '/popular')}
        </>
      )}

      {showFamily && family.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Семейные</h2>
          {renderCardsWithButton(family.items, 'Семейные', '/family')}
        </>
      )}

      {showRomantic && romantic.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Романтика</h2>
          {renderCardsWithButton(romantic.items, 'Романтика', '/romantic')}
        </>
      )}

      {showCatastrophe && catastrophe.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Катастрофы</h2>
          {renderCardsWithButton(
            catastrophe.items,
            'Катастрофы',
            '/catastrophe',
          )}
        </>
      )}

      {showFilms && films.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Фильмы</h2>
          {renderCardsWithButton(films.items, 'Фильмы', '/films')}
        </>
      )}

      {showSerials && serials.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Сериалы</h2>
          {renderCardsWithButton(serials.items, 'Сериалы', '/serials')}
        </>
      )}

      {showCartoons && cartoons.total > 0 && (
        <>
          <h2 className="text-2xl text-gray-300 font-bold mb-4">Мультфильмы</h2>
          {renderCardsWithButton(cartoons.items, 'Мультфильмы', '/cartoons')}
        </>
      )}
    </div>
  );
}

MoviesGrid.propTypes = {
  popular: PropTypes.arrayOf(PropTypes.object),
  family: PropTypes.arrayOf(PropTypes.object),
  romantic: PropTypes.arrayOf(PropTypes.object),
  catastrophe: PropTypes.arrayOf(PropTypes.object),
  films: PropTypes.arrayOf(PropTypes.object),
  serials: PropTypes.arrayOf(PropTypes.object),
  cartoons: PropTypes.arrayOf(PropTypes.object),
  currentPath: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number,
  setPage: PropTypes.func,
};
