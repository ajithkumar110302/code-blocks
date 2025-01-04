const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);

// Database sync and server start
const PORT = process.env.PORT || 3000;

async function startServer() {
  let retries = 5;
  
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully');
      await sequelize.sync();
      console.log('Database synced successfully');
      
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      break;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
  }
}

startServer();