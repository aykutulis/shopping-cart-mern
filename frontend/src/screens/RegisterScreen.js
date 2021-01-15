import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { register } from '../actions/userActions';

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const loginUserInfo = userLogin.userInfo;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (loginUserInfo) history.push(redirect);
  }, [loginUserInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (!password || password === '') {
      setMessage('Please enter password');
    } else if (!name || name === '') {
      setMessage('Please enter name');
    } else if (!email || email === '') {
      setMessage('Please enter email');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' disabled={loading}>
          {loading ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' /> : 'Register'}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={redirect ? `/Login?redirect=${redirect}` : '/Login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
