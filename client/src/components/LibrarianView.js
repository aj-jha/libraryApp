import React from "react";
import AddBook from "./AddBook";
import DisplayAllLibraries from "./DisplayAllLibraries";
import DisplayUser from "./DisplayUser";
import DisplayInventory from "./DisplayInventory";
import { Route } from "react-router-dom";
import BanUser from "./BanUser";

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
      <BanUser />
    </div>
  );
};

export default LibrarianView;
