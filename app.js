var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var indexCRouter = require('./routes/index_c');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var viewTendersMRouter = require('./routes/view_tenders_m');
var createNewTenderMRouter = require('./routes/create_new_tender');
var viewMyTendersCRouter = require('./routes/view_my_tenders_c');
var viewMunicipalitiesCRouter = require('./routes/view_municipalities_c');
var viewMunicipalitiProfileCRouter = require('./routes/view_municipaliti_profile_c');
var viewTenderResultCRouter = require('./routes/view_tender_result_c');
var viewTenderResultMRouter = require('./routes/view_tender_result_m');
var viewTenderDetailsCRouter = require('./routes/view_tender_details_c');
var viewRequestTenderCRouter = require('./routes/view_request_tender_c');
var createRequestTenderCRouter = require('./routes/create_request_tender_c');
var viewRequestTenderRouter = require('./routes/view_request_tender_m');
var setting_m = require('./routes/setting_m');
var setting_c = require('./routes/setting_c');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index_c', indexCRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/view_tenders_m', viewTendersMRouter);
app.use('/create_new_tender', createNewTenderMRouter);
app.use('/view_my_tenders_c', viewMyTendersCRouter);
app.use('/view_municipalities_c', viewMunicipalitiesCRouter);
app.use('/view_municipaliti_profile_c', viewMunicipalitiProfileCRouter);
app.use('/view_tender_result_c', viewTenderResultCRouter);
app.use('/view_tender_result_m', viewTenderResultMRouter);
app.use('/view_tender_details_c', viewTenderDetailsCRouter);
app.use('/view_request_tender_c', viewRequestTenderCRouter);
app.use('/create_request_tender_c', createRequestTenderCRouter);
app.use('/view_request_tender_m', viewRequestTenderRouter);
app.use('/setting_m', setting_m);
app.use('/setting_c', setting_c);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
