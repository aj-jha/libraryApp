import React from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

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
  `
  const { loading, error, data } = useQuery(GET_INVENTORY, {
    variables: { libraryID: props.id }
  })

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    console.log(error)
  }
  console.log(data)
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          fontWeight: "bold"
        }}
      >
        <div>{Object.keys(data.getInventory[0])[0]}</div>
        <div>{Object.keys(data.getInventory[0])[1]}</div>
        <div>{Object.keys(data.getInventory[0])[2]}</div>
      </section>
      {data.getInventory.map(book => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>{book.id}</div>
            <div>{book.title}</div>
            <div>{book.author}</div>
          </div>
        )
      })}
    </div>
  )
}

export default DisplayInventory
