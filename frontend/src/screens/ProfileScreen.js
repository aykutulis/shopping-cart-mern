import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Message from '../components/Message';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const loginUserInfo = userLogin.userInfo;

  useEffect(() => {
    if (!loginUserInfo) return history.push('/login?redirect=/profile');

    if (!user.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [loginUserInfo, history, user, dispatch]);

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
      console.log('update');
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
            {loading ? <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' /> : 'Update'}
          </Button>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
