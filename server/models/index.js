const mongoose = require('mongoose');

const dbName = process.env.DBNAME;

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to the bakery database');
})

module.exports = mongoose;