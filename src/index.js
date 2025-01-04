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
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer();