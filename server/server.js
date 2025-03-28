
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const dashboardRoutes = require('./routes/dashboard');
const widgetRoutes = require('./routes/widgets');
const userRoutes = require('./routes/users');


app.use('/api/dashboard', dashboardRoutes);
app.use('/api/widgets', widgetRoutes);
app.use('/api/users', userRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
