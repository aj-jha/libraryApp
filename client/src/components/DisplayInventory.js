import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const DisplayInventory = props => {
  const GET_INVENTORY = gql`
    query getInventory($libraryID: ID!) {
      getInventory(library_id: $libraryID) {
        id
        title
        author
        status
        borrower {
          id
          name
        }
        library {
          id
          name
          address
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_INVENTORY, {
    variables: { libraryID: props.match.params.id }
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
  }
  console.log(data);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {data.getInventory.map(book => {
        console.log(book);
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>{book.id}</div>
            <div>{book.title}</div>
            <div>{book.author}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayInventory;
