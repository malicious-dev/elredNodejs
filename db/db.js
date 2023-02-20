const mongoose = require('mongoose')


try{
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
    err => {
      if (err) throw err;
      console.log('connected to MongoDB Database')
    });
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Database connecting...');
  }).on('error', function (err) {
    console.log(err);
  });
}catch(err) {
  console.log(err);
} 
