import React from "react";
import GetMyLibraryInventory from "./GetMyLibraryInventory";
import ReturnBook from "./ReturnBook";
import BorrowBook from "./BorrowBook";

const UserView = props => {
  console.log("user ID: ", props);
  return (
    <div>
      <h1>Hello {props.location.state.name}</h1>
      <GetMyLibraryInventory />
      <BorrowBook />
      <ReturnBook />
    </div>
  );
};

export default UserView;
