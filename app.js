var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Log         = require('./models/log');

mongoose.connect('mongodb://jtoledo3970:Ajsoccer1317!@ds143573.mlab.com:43573/flight-log');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX - Show All Logs
app.get('/logs', (req, res) => {
  Log.find({}, function(err, allLogs) {
    if (err) {
      console.log(err);
    } else {
      res.render('logs/index', {logs: allLogs});
    }
  });
});

// CREATE
app.post('/logs', (req, res) => {
  var date = req.body.date;
  var departure = req.body.departure;
  var destination = req.body.destination;
  var duration = req.body.duration;
  var remarks = req.body.remarks;

  var newLog = {date: date, departure: departure, destination: destination, duration: duration, remarks: remarks}

  Log.create(newLog, function(err, newlyCreatedLog) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/logs');
    }
  });
});

// NEW - form to create a new log
app.get('/logs/new', (req, res) => {
  res.render('logs/new');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
