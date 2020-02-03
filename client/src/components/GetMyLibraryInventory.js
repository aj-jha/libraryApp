import React from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"

const GetMyLibraryInventory = props => {
  const GET_MYLIBRARY_INVENTORY = gql`
    query {
      getMyLibraryInventory {
        id
        title
        author
        library {
          id
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_MYLIBRARY_INVENTORY)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    console.log(error)
  }
  console.log(data)
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {data.getMyLibraryInventory.map(book => {
        console.log(book)
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>hello</div>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.status}</div>
            <div>{book.borrower == null ? "" : book.borrower.name}</div>
          </div>
        )
      })}
    </div>
  )
}
export default GetMyLibraryInventory
