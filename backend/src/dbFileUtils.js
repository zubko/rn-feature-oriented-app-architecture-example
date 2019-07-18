const path = require('path');
const fs = require('fs');

const DEFAULT_DB = {
  users: [],
};

function getPathToDb() {
  return path.resolve(__dirname, '../db.json');
}

function checkCreateDbFile() {
  const pathToDb = getPathToDb();
  if (!fs.existsSync(pathToDb)) {
    fs.writeFileSync(pathToDb, JSON.stringify(DEFAULT_DB));
  }
}

module.exports = { getPathToDb, checkCreateDbFile };
