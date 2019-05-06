
const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const history = require( 'connect-history-api-fallback' );
const Sequelize = require( 'sequelize' );
const sequelize = require( './server/db' );
const models = require( './server/read-models' );

const debug = require("debug")("node-angular");
const http = require("http");

// Initialize dotenv to set up access to environmental variables
const dotenv = require( 'dotenv' );
dotenv.config();

const routes = require( './server/routes' );

const app = express();

// Apply middleware
app.use( cors());
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use( '/', routes );
// app.use( function( req, res, next ) {
//   if ( req.url=='/404' ){
//     res.status( 404 );
//   }
//   next();
// });
app.use( history());

// // Use Webpack Dev/Hot Middleware if we are not in the production environment
// if ( process.env.npm_lifecycle_event === 'start' ) {
//   const webpack = require( 'webpack' );
//   const webpackConfig = require( '../webpack/dev.config' );
//   const compiler = webpack( webpackConfig );

//   // Attach the dev middleware to the compiler & the server
//   app.use(
//     require( 'webpack-dev-middleware' )( compiler, {
//       noInfo: true,
//       publicPath: webpackConfig.output.publicPath
//     })
//   );
//   // Enable hot reloading
//   app.use( require( 'webpack-hot-middleware' )( compiler ));
// } else {
//   // Make everything in the build directory available for use when in production
//   app.use( express.static( path.join( __dirname, '../build' )));

//   // Required for compatibility with AngularJS HTML5 mode
//   app.get( '*', ( req, res ) => {
//     res.sendFile( path.join( __dirname, '../build/index.html' ));
//   });
// }


const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;

  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

// sequelize.READsequelize.sync()
// .then(result => {
//   // console.log(result);
// })
// .catch(err => {
//   console.log(err);
// }) ;

