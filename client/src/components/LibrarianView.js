import React from "react";

import AddBook from "./AddBook";
import DisplayAllLibraries from "./DisplayAllLibraries";
import DisplayUser from "./DisplayUser";
import DisplayInventory from "./DisplayInventory";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const LibrarianView = () => {
  return (
    <div>
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
