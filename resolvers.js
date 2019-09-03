const db = require('./db')
const Query = {
   test: () => 'Test Success, GraphQL server is up & running !!',
   employees:() => db.employees.list(),
   //resolver function for employeebyId
   employeeById:(root,args,context,info) => {
      //args will contain parameter passed in query
      return db.employees.get(args.id);
   }
}

//for each single employee object returned,resolver is invoked
const Employee = {
   fullName:(root,args,context,info) => {
      return root.firstName+":"+root.lastName
   }
}
module.exports = {Query,Employee}
