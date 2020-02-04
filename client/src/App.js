import React, { useState } from "react"
// Apollo Provide tells the all of the queries & mutations in our code where to connect to. Gets its info from apollo Client
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"

import "./App.css"
import DisplayInventory from "./components/DisplayInventory"
import BorrowForm from "./components/BorrowForm"
import ReturnBook from "./components/ReturnBook"
import AddBook from "./components/AddBook"
import DisplayAllLibraries from "./components/DisplayAllLibraries"
import DisplayUser from "./components/DisplayUser"
import Signup from "./components/Signup"
import Login from "./components/LoginForm"
import GetMyLibraryInventory from "./components/GetMyLibraryInventory"
import LibrarianView from "./components/LibrarianView"
import NavButton from "./components/styledComponents/NavButton"

const App = () => {
  const GET_LIBRARIES_QUERY = gql`
    query {
      getAllLibraries {
        id
        open
        name
        address
      }
    }
  `
  const response = useQuery(GET_LIBRARIES_QUERY)
  console.log(response)
  const [library, setLibrary] = useState([
    {
      id: 1,
      title: "Katherines' Journey in Florence",
      author: "Sean Li",
      borrowedBy: null
    },
    {
      id: 2,
      title: "Katherines' Journey in Ireland",
      author: "Amber Zhao",
      borrowedBy: null
    },
    {
      id: 3,
      title: "Katherines' Journey in Hamilton, Ontario",
      author: "AJ",
      borrowedBy: null
    }
  ])
  const [borrowCounter, setBorrowCounter] = useState(0)
  const [theme, setTheme] = useState("light")

  // const changeTheme = () => {
  //   if (theme == "light") {
  //     setTheme("dark")
  //   } else {
  //     setTheme("light")
  //   }
  // }

  if (response.loading) {
    return <div>Loading...</div>
  }

  if (response.error) {
    console.log(response.error)
  }
  return (
    <Router>
      <div>
        {/* <button onClick={changeTheme}>Change Theme</button> */}
        <div>
          <Link to="/">
            <NavButton theme={theme}>Home</NavButton>
          </Link>
          <Link to="/signUp">
            <NavButton theme={theme}>SignUp</NavButton>
          </Link>
          <Link to="/login">
            <NavButton theme={theme}>Login</NavButton>
          </Link>
        </div>
        <Switch>
          <Route exact path="/signUp">
            <Signup />
          </Route>
          <Route path="/userhome">
            <div>
              <h1>Hello User!</h1>
              <GetMyLibraryInventory />
              <BorrowForm
                library={library}
                setLibrary={setLibrary}
                borrowCounter={setBorrowCounter}
              />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/inventories/:id" render={props => <DisplayInventory {...props} />} />
          <Route path="/users">
            <DisplayUser library={library} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login data={response.data} />
          </Route>
          <Route path="/addbook">
            <AddBook />
          </Route>
          <Route path="/borrow">
            <BorrowForm
              library={library}
              setLibrary={setLibrary}
              borrowCounter={setBorrowCounter}
            />
            <div>{borrowCounter}</div>
            <ReturnBook
              library={library}
              setLibrary={setLibrary}
              borrowCounter={setBorrowCounter}
            />
          </Route>

          <Route path="/librarian">
            <LibrarianView />
          </Route>

          <Route path="/libraries">
            <DisplayAllLibraries data={response.data} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

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

export default App
