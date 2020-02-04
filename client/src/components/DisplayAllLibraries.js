import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const DisplayAllLibraries = () => {
  const GET_LIBRARIES_QUERY = gql`
    query {
      getAllLibraries {
        id
        open
        name
        address
      }
    }
  `;
  const response = useQuery(GET_LIBRARIES_QUERY);
  if (response.loading) {
    return <div>Loading</div>;
  }

  if (response.error) {
    return <div>{response.error}</div>;
  }
  console.log(response);

  return (
    <div>
      <table>
        <tr>
          {Object.keys(response.data.getAllLibraries[0]).map(key => {
            return <th>{key}</th>;
          })}
        </tr>
        {response.data.getAllLibraries.map(library => {
          // map on map -> returns all items in the array in rows
          //tr tag = create rows/ td tag = create columns
          //this.prop.library access the library prop passed in from App.js
          return (
            <tr>
              {Object.values(library).map(value => {
                return <td>{value}</td>;
              })}
              <td>
                <Link to={`/inventories/${library.id}`}>Display Inventory</Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default DisplayAllLibraries;
