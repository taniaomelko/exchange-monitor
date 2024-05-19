require('dotenv').config();
const express = require('express');
const rateRoutes = require('./routes/rateRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const sendEmailsRoutes = require('./routes/sendEmailsRoutes');
require('./jobs/emailJob');
const { connectDB } = require('./config/db');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/rate', rateRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/sendEmails', sendEmailsRoutes);

// Connect to Database
connectDB();

const initializeServer = async () => {
  try {
    const migrateMongo = () => {
      return new Promise((resolve, reject) => {
        const child = exec('npx migrate-mongo up', (error, stdout, stderr) => {
          if (error) {
            console.error('Migration error:', error);
            reject(error);
          } else {
            console.log('Migration successful:', stdout);
            resolve(stdout);
          }
        });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
      });
    };

    // Check if there are pending migrations
    const hasPendingMigrations = await checkPendingMigrations();

    // If there are pending migrations, run migration
    if (hasPendingMigrations) {
      await migrateMongo();
    }

    console.log('Server started successfully');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

const checkPendingMigrations = () => {
  return new Promise((resolve, reject) => { 
    const child = exec('npx migrate-mongo status', (error, stdout, stderr) => {
      if (error) {
        console.error('Error checking migrations:', error);
        reject(error);
      } else {
        // Parse the output to determine if there are pending migrations
        const hasPendingMigrations = !stdout.includes('No migrations');
        resolve(hasPendingMigrations);
      }
    });
    // Pipe the child process output to stdout and stderr
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });
};

// Initialize server
initializeServer();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
