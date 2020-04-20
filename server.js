const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const db = require('./db/data_base');

db.connectDB((err) => {
  if (err){
    console.log('Unable to connect to database');
    process.exit(1);
  }
})

app.set('port', process.env.PORT || 3002);
app.engine('handlebars', expbs({
    defaultLayout: 'main'
  }));
app.set('view engine', 'handlebars');

//Routing
app.use(require('./routes/index'));
app.use(require('./routes/create_register'));
app.use(require('./routes/get_collection'));
app.use(require('./routes/modify_collection'));
app.use(require('./routes/delete_register'));
// Starting
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
  });