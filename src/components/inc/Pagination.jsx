import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({ count, page, onChange }) {
  const handlePrev = () => {
    if (page > 1) {
      onChange(null, page - 1);
    }
  };

  const handleNext = () => {
    if (page < count) {
      onChange(null, page + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 mb-5">
      <button
        type="button"
        className={`flex items-center justify-center w-10 h-10 rounded-3xl font-semibold cursor-pointer ${
          page === 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
        }`}
        aria-label="Previous page"
        onClick={handlePrev}
        disabled={page === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <span className="text-indigo-500 font-semibold select-none">
        {page} / {count}
      </span>

      <button
        type="button"
        className={`flex items-center justify-center w-10 h-10 rounded-3xl font-semibold cursor-pointer ${
          page === count
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
        }`}
        aria-label="Next page"
        onClick={handleNext}
        disabled={page === count}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
