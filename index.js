const app = require('express')();
const bodyParser = require('body-parser');
const swaggerTools = require('swagger-tools');
const path = require('path');
const fs = require('fs');
const jsYaml = require('js-yaml');
const helmet = require('helmet');
require('express-async-errors');
require('dotenv').config();

const controllers = [
  path.join(__dirname, '/controllers/healthCheck'),
  path.join(__dirname, '/controllers/user'),
  path.join(__dirname, '/controllers/products'),
  path.join(__dirname, '/controllers/trolleytotal'),
];
const options = {
  controllers: controllers,
  useStubs: true,
};

var swaggerYaml = fs.readFileSync(
  path.join(__dirname, '/api/swagger.yaml'),
  'utf8'
);

const swaggerDoc = jsYaml.safeLoad(swaggerYaml);

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(helmet());

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(
    middleware.swaggerSecurity({
      // oauth2: function (req, def, scopes, callback) {
      //   // Do real stuff here
      // }
    })
  );

  //   app.use(middleware.swaggerValidator({
  //     validateResponse: true
  //   }));

  app.use(middleware.swaggerRouter(options));

  // error and logging purposes. logging is yet to be implemented
  // app.use(error)

  // Serve the Swagger documents and Swagger UI
  console.log('http://localhost:3000/docs => Swagger UI');
  console.log('http://localhost:3000/api-docs => Swagger document');
  app.use(middleware.swaggerUi());
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
