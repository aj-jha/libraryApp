
import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import DisplayInventory from "./DisplayInventory"


const DisplayAllLibraries = () => {
  //setting state of display inventory to nothing upon first page load
  const [cur_lib, setCurLib] = useState(null)
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
  const handleClick = id => {
    setCurLib(id)
  }
  const response = useQuery(GET_LIBRARIES_QUERY)
  if (response.loading) {
    return <div>Loading</div>
  }

  if (response.error) {
    return <div>{response.error}</div>
  }
  console.log(response)

  return (
    <div>
      <table>
        <tr>
          {Object.keys(response.data.getAllLibraries[0]).map(key => {
            return <th>{key}</th>
          })}
        </tr>
        {response.data.getAllLibraries.map(library => {
          // map on map -> returns all items in the array in rows
          //tr tag = create rows/ td tag = create columns
          //this.prop.library access the library prop passed in from App.js
          return (
            <tr>
              {Object.values(library).map(value => {
                return <td>{value}</td>
              })}
              <td>
                <button onClick={() => handleClick(library.id)}>
                  Display Inventory
                </button>
              </td>
            </tr>
          )
        })}
      </table>
      {cur_lib && <DisplayInventory id={cur_lib} />}
    </div>
  )
}

export default DisplayAllLibraries
