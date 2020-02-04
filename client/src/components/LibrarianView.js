import React from "react";
import AddBook from "./AddBook";
import DisplayAllLibraries from "./DisplayAllLibraries";
import DisplayUser from "./DisplayUser";
import DisplayInventory from "./DisplayInventory";
import { BrowserRouter as Router, Route } from "react-router-dom";

const LibrarianView = props => {
  return (
    <div>
      <h1>Hello Librarian {props.location.state.name}</h1>
      <DisplayAllLibraries />
      <Route
        path="/inventories/:id"
        render={props => <DisplayInventory {...props} />}
      />
      <DisplayUser />
      <AddBook />
    </div>
  );
};

export default LibrarianView;
