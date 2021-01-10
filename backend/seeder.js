import dotenv from 'dotenv';
import colors from 'colors';
import Order from './models/orderModel.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import products from './data/products.js';
import users from './data/users.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminId = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.magenta.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
