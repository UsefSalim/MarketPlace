require('dotenv').config({ path: './config/.env' });
require('./config/db.config');

const express = require('express');

const app = express();
require('./app')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app lisning : localhost:${PORT}`);
});
