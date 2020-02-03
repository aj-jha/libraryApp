import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const DisplayUser = () => {
  const GET_USERS = gql`
    query {
      getUsers {
        id
        name
        role
        borrowedBooks {
          id
          title
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {data.getUsers.map(user => {
        console.log(user);
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>{user.id}</div>
            <div>{user.name}</div>
            <div>{user.role}</div>
            <div>
              {user.borrowedBooks.id == null ? "" : user.borrowedBooks.id}
            </div>
            <div>
              {user.borrowedBooks.name == null ? "" : user.borrowedBooks.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUser;
