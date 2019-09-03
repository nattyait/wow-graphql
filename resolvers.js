const db = require('./db')
const Query = {
   test: () => 'Test Success, GraphQL server is up & running !!',
   employees:() => db.employees.list()
}
module.exports = {Query}
