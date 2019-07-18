/* eslint-disable no-console */

const jsonServer = require('json-server');
const auth = require('json-server-auth');

const { getPathToDb, checkCreateDbFile } = require('./dbFileUtils');

checkCreateDbFile();

const app = jsonServer.create();
const router = jsonServer.router(getPathToDb());
app.db = router.db;

const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  // Permission rules
  users: 600,
  // Routes
});

app.use(jsonServer.bodyParser);

// Order is important
app.use(rules);
app.use(auth);
app.use(middlewares);
app.use(router);

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
