import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Movies from './pages/Movies/Movies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { MOVIE_LISTS, TYPE_LISTS } from '../constants';
import MainTypeList from './pages/MainTypeList/MainTypeList';
import MovieTypeList from './pages/MovieTypeList/MovieTypeList';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Movies />,
        },
        ...TYPE_LISTS.map(el => ({
          path: el.url,
          element: <MainTypeList />,
        })),
        ...MOVIE_LISTS.map(el => ({
          path: el.url,
          element: <MovieTypeList />,
        })),
        {
          path: '/movie/:id',
          element: <MovieDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
