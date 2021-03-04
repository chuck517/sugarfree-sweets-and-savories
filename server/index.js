require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET || 'I pity the foo who don\'t keep better SECRETs';

const routes = require('./routes');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(routes);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Server listening on PORT ${PORT}`);
  }
})

module.exports = server;