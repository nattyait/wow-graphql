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
   },
   company:(root) => {
      return db.companies.get(root.comId);
   }
}

const Mutation = {
   createEmployee:(root,args,context,info) => {
      return db.employees.create({comId:args.comId,
      firstName:args.firstName,
      lastName:args.lastName})
   }
}

module.exports = {Query,Employee,Mutation}
