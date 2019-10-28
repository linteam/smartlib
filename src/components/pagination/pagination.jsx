import React from "react";
import PropTypes from "prop-types";
//Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
import _ from "lodash"; //underscore isimli bir kütüphanenin optimize edilmiş hali

//Gelen props'u asagidaki sekilde dagitmasi cok mantikli
const Pagination = ({ 
  itemsCount, 
  pageSize, //her sayfada kac eleman olacak
  currentPage,  //active yapmak icin
  onPageChange 
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize); //0-1 arasi ise 1 e yuvarlasin.
  if (pagesCount === 1) return null; //1 page varsa pagination çıkmasın
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
