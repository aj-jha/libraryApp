import React from "react";
import { Link } from "react-router-dom";

const DisplayAllLibraries = ({ data }) => {
  console.log(data.getAllLibraries);
  return (
    <div>
      <table>
        <tr>
          {Object.keys(data.getAllLibraries[0]).map(key => {
            return <th>{key}</th>;
          })}
        </tr>
        {data.getAllLibraries.map(library => {
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
