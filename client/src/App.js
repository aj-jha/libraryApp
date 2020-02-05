import React from "react";
// Apollo Provide tells the all of the queries & mutations in our code where to connect to. Gets its info from apollo Client

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import "./App.css";
import DisplayInventory from "./components/DisplayInventory";
import AddBook from "./components/AddBook";
import Signup from "./components/Signup";
import Login from "./components/LoginForm";
import LibrarianView from "./components/LibrarianView";
import NavButton from "./components/styledComponents/NavButton";
import UserView from "./components/UserView";
import NavBar from "./components/styledComponents/NavBar";
import HomeView from "./components/HomeView";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar>
          <Link to="/">
            <NavButton>Home</NavButton>
          </Link>
          <Link to="/signUp">
            <NavButton>SignUp</NavButton>
          </Link>
          <Link to="/login">
            <NavButton>Login</NavButton>
          </Link>
        </NavBar>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/signUp">
            <Signup />
          </Route>

          <Route path="/userhome" render={props => <UserView {...props} />} />
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/inventories/:id"
            render={props => <DisplayInventory {...props} />}
          />

          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/addbook">
            <AddBook />
          </Route>

          <Route
            path="/librarian"
            render={props => <LibrarianView {...props} />}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();
//     // functions needs to be binded to the class so that it references the correct this.
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleBookIDChange = this.handleBookIDChange.bind(this);
//     // this.handleBorrowerChange = this.handleBorrowerChange.bind(this);
//     this.state = {
//       library: [
//         {
//           id: 1,
//           title: "Katherines' Journey in Florence",
//           author: "Sean Li",
//           borrowedBy: null
//         },
//         {
//           id: 2,
//           title: "Katherines' Journey in Ireland",
//           author: "Amber Zhao",
//           borrowedBy: null
//         },
//         {
//           id: 3,
//           title: "Katherines' Journey in Hamilton, Ontario",
//           author: "AJ",
//           borrowedBy: null
//         }
//       ],
//       borrower: "",
//       bookID: ""
//     };
//   }

//   handleBorrowerChange(event) {
//     this.setState({
//       borrower: event.target.value
//     });
//   }

//   //event listeners to handle input value changes for the 2 input fields

//   handleBookIDChange(event) {
//     this.setState({
//       bookID: event.target.value
//     });
//   }

//   // handleSubmit(event) {
//   //   event.preventDefault();
//   //   console.log(event.target.borrower.value);
//   //   console.log(event.target.book.value);
//   //   let newLibrary = this.state.library;

//   //   newLibrary = newLibrary.map(book => {
//   //     if (book.id !== parseInt(event.target.book.value)) {
//   //       return book;
//   //     } else {
//   //       return {
//   //         ...book,
//   //         // ...book keeps all keys of the original object and keeps it the same. unless the key is specified below. In this instance, borrowedBy will be changed.
//   //         borrowedBy: event.target.borrower.value
//   //       };
//   //     }
//   //   });
//   //   console.log(newLibrary);
//   //   this.setState({ library: newLibrary });
//   //   // code above extracts value from the input field named borrower
//   // }

//   render() {
//     return (
//       <div>
//         <DisplayLibrary library={this.state.library} />
//         <Formik
//           initialValues={{
//             borrower: "",
//             bookid: 0
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             let newLibrary = this.state.library;

//             newLibrary = newLibrary.map(book => {
//               if (book.id !== parseInt(values.bookid)) {
//                 return book;
//               } else {
//                 return {
//                   ...book,
//                   // ...book keeps all keys of the original object and keeps it the same. unless the key is specified below. In this instance, borrowedBy will be changed.
//                   borrowedBy: values.borrower
//                 };
//               }
//             });
//             console.log(newLibrary);
//             this.setState({ library: newLibrary });
//             // code above extracts value from the input field named borrower
//           }}
//           validationSchema={Yup.object().shape({
//             borrower: Yup.string("This is not a string").required(
//               "This is a required input"
//             ),
//             bookid: Yup.number()
//               .integer()
//               .positive()
//               .required("This is a required input")
//               .lessThan(
//                 this.state.library.length,
//                 "We don't have that shit brudda"
//               )
//           })}
//         >
//           {fProps => {
//             return (
//               <form onSubmit={fProps.handleSubmit}>
//                 <input
//                   name="borrower"
//                   value={fProps.values.borrower}
//                   onChange={fProps.handleChange}
//                   onBlur={fProps.handleBlur}
//                   type="text"
//                 />
//                 {fProps.errors.borrower && fProps.touched.borrower && (
//                   <div>{fProps.errors.borrower}</div>
//                 )}
//                 <input
//                   name="bookid"
//                   value={fProps.values.bookid}
//                   onChange={fProps.handleChange}
//                   onBlur={fProps.handleBlur}
//                   type="number"
//                 />
//                 {fProps.errors.bookid && fProps.touched.bookid && (
//                   <div>{fProps.errors.bookid}</div>
//                 )}
//                 <button type="submit">Submit</button>
//               </form>
//             );
//           }}
//         </Formik>
//       </div>
//     );
//   }
// }
// //Library property is passed through to Display Library Function

export default App;
