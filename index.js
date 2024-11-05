const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();
require('colors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'.green))
  .catch((err) => console.log(err.red));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/advertisements', require('./routers/advertisementRouter'));
app.use('/api/products', require('./routers/productRouter'));
app.use('/api/orders', require('./routers/orderRouter'));
app.use('/api/ratings', require('./routers/ratingRouter'));
app.use('/api/reviews', require('./routers/reviewRouter'));
app.use('/api/users', require('./routers/userRouter'));
app.use('/api/riders', require('./routers/riderRouter'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.blue);
});
