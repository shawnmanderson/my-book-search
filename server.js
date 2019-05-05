const express = require( "express" );
const path = require( "path" );
const mongoose = require( "mongoose" );
const routes = require( "./routes" );
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use( express.urlencoded({ extended: true }));
app.use( express.json() ); 
// Serve up static assets (usually on heroku)
if ( process.env.NODE_ENV === "production" ) {
  app.use( express.static( "client/build" ));
}
// add routes, both API and view
app.use( routes );

app.get( "*", ( req, res ) => {
  res.sendFile( path.join( __dirname, "./client/build/index.html" ));
});

// connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googleBooks"
);

// start the API server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});