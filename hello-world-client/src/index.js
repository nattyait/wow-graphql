import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// apollo client
// with the change in this file, we can ignore App.js since we 
// don't call the App dom here.

import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client = new ApolloClient({
   link: new HttpLink({uri:endPointUrl}),
   cache:new InMemoryCache()
});

async function loadEmployeesAsync() {
   const query = gql`
   {
      employees{
         id
         firstName
         lastName
         company{
            name
         }
      }
   }
   `
   const {data} = await client.query({query}) ;
   return data.employees;
}
class  App  extends Component {
   constructor(props) {
      super(props);
      this.state = {
         employees:[]
      }
      this.employeeTemplate =  [];
   }
   async loadEmployees() {
      const employeeData =  await loadEmployeesAsync();
      this.setState({
        employees: employeeData
      })
      console.log("loadEmployees")
   }
   render() {
      return(
         <div>
            <input type = "button"  value = "loadEmployees" onClick = {this.loadEmployees.bind(this)}/>
            <div>
               <br/>
               <hr/>
               <table border = "3">
                  <thead>
                     <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Company Name</td>
                     </tr>
                  </thead>
                  
                  <tbody>
                     {
                        this.state.employees.map(s => {
                           return (
                              <tr key = {s.id}>
                                 <td>
                                    {s.firstName}
                                 </td>
                                 <td>
                                    {s.lastName}
                                 </td>
                                 <td>
                                    {s.company.name}
                                 </td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}
ReactDOM.render(<App/>, document.getElementById('root'));