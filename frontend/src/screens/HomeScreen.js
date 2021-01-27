import React, { useEffect } from 'react';
import { useQuery } from '../helpers/queryHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const query = useQuery();

  const keyword = query.get('keyword') ? query.get('keyword') : '';
  const page = query.get('page') ? query.get('page') : '';

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, pagesCount, pageNumber } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, page));
  }, [dispatch, keyword, page]);

  return (
    <>
      {keyword === '' && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pageNumber={pageNumber} keyword={keyword} pagesCount={pagesCount} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
