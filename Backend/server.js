const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const uri="mongodb://localhost:27017"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRouter = require('./Routes/Routes');
app.use('/api', userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

