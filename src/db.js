/**
 * @author José Miranda
 * @email chemalug@gmail.com
 * @create date 2020-02-27 15:43:35
 * @modify date 2020-02-27 15:43:35
 * @desc [description]
 */
const mongoose = require('mongoose');
const { mongodb } = require('./keys');
mongoose.connect(mongodb.URI ,{ useUnifiedTopology: true, useNewUrlParser: true  })
     .then(db => console.log('DB Connected'))
     .catch(err => console.error(err));