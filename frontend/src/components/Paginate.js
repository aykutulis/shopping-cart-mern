import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pagesCount, pageNumber, isAdmin, keyword = '' }) => {
  return (
    pagesCount > 1 && (
      <Pagination>
        {[...Array(pagesCount).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin ? (keyword ? `?keyword=${keyword}&page=${x + 1}` : `?page=${x + 1}`) : `/admin/productlist?page=${x + 1}`}
          >
            <Pagination.Item active={x + 1 === pageNumber}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
