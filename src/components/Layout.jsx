import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './inc/Header';
import Footer from './inc/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 w-full bg-gray-900">
        <main className="max-w-screen-xl mx-auto p-4 md:py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
