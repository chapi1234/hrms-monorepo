const mongoose = require('mongoose');
const User = require('./src/models/User'); 
const Employee = require('./src/models/Employee'); 
const Department = require('./src/models/Department');
const Company = require('./src/models/Company');
const dotenv = require('dotenv');

dotenv.config();
 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/component-hrms';

async function seed() {
  try {
    console.log('Connecting to MongoDB...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected. Dropping previous collections to start fresh...');
    
    await mongoose.connection.db.dropDatabase();

    // 1. Create a Company
    console.log('Creating Admin Company...');
    const company = new Company({
      name: 'Component HRMS Inc',
      email: 'hello@hrms.com',
      phone: '+1-555-555-5555'
    });
    await company.save();

    // 2. Create a Department
    console.log('Creating Root Department...');
    const department = new Department({
      name: 'Administration',
      code: 'ADMIN',
      description: 'System Administration',
      company: company._id, // Fixed: attached company
      isActive: true
    });
    await department.save();

    // 3. Create the User
    console.log('Creating Admin User...');
    const adminUser = new User({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@hrms.com',
      password: 'password123', 
      company: company._id, // Fixed: attached company
      role: 'admin',
      isActive: true,
    });
    await adminUser.save();

    // 4. Create an Employee profile
    console.log('Creating Admin Employee profile...');
    const adminEmployee = new Employee({
      user: adminUser._id,
      company: company._id,
      department: department._id,
      employeeId: 'EMP-0001',
      position: 'Administrator',
      hireDate: new Date(),
      employmentType: 'full-time',
      status: 'active'
    });
    await adminEmployee.save();

    console.log('✅ Seed successful!');
    console.log('-----------------------------------');
    console.log('You can now login with:');
    console.log('Email: admin@hrms.com');
    console.log('Password: password123');
    console.log('-----------------------------------');
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
    process.exit(0);
  }
}

seed();
