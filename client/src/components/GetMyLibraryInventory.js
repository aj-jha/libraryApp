import React from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import BooksInLibrary from "./styledComponents/BooksOrPeopleTable"

const GetMyLibraryInventory = props => {
  const GET_MYLIBRARY_INVENTORY = gql`
    query {
      getMyLibraryInventory {
        id
        title
        author
        status
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
  return (
    <div>
      {data.getMyLibraryInventory.map(book => {
        console.log(book)
        return (
          <BooksInLibrary>
            <div>{book.id}</div>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.status}</div>
            <div>{book.borrower == null ? "" : book.borrower.name}</div>
            <button>button</button>
          </BooksInLibrary>
        )
      })}
    </div>
  )
}
export default GetMyLibraryInventory
