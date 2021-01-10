import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Nikola Tesla',
    email: 'tesla@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Sigmund Freud',
    email: 'freud@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
