const mongoose = require('mongoose');

const dbName = 'bakeryDB';

mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to the Bakery\'s Database');
})

module.exports = mongoose;