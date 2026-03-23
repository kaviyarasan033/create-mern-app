require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Item = require('../models/Item');

async function seed() {
  await connectDB();

  const email = 'demo@mernkit.dev';
  const password = 'Password123!';

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: 'Demo User',
      email,
      password,
      role: 'admin'
    });
  }

  const existingItems = await Item.countDocuments({ user: user._id });

  if (!existingItems) {
    await Item.insertMany([
      {
        name: 'Starter Dashboard',
        description: 'First seeded record for the built-in dashboard.',
        status: 'active',
        user: user._id
      },
      {
        name: 'Migration Checklist',
        description: 'Use the MERN guide and proapp commands to continue building.',
        status: 'draft',
        user: user._id
      }
    ]);
  }

  console.log('Demo account ready');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error('Failed to seed demo data:', error.message);
  await mongoose.connection.close();
  process.exit(1);
});
