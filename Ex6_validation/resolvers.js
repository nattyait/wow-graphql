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
   },
   signUp:(root,args,context,info) => {
      const {email,firstName,password} = args.input;
      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidEmail =  emailExpression.test(String(email).toLowerCase())
      if(!isValidEmail)
      throw new Error("email not in proper format")

      if(firstName.length > 15)
      throw new Error("firstName should be less than 15 characters")

      if(password.length < 8 )
      throw new Error("password should be minimum 8 characters")
      
      return "success";
   }
}

module.exports = {Query,Employee,Mutation}
