import React from "react"
import { useQuery } from "react-apollo-hooks"
import { useMutation } from "react-apollo-hooks"
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
  const BORROWBOOK_MUTATION = gql`
    mutation($book_id: ID!) {
      borrowBook(book_id: $book_id) {
        book {
          id
          title
          author
          status
        }
        error
      }
    }
  `
  const [borrowBook] = useMutation(BORROWBOOK_MUTATION)
  const handleClick = bookid => {
    borrowBook({
      variables: {
        book_id: bookid
      }
    })
  }
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
        return (
          <BooksInLibrary>
            <div>{book.id}</div>
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.status}</div>
            <div>{book.borrower == null ? "" : book.borrower.name}</div>
            <button onClick={() => handleClick(book.id)}>Borrow</button>
          </BooksInLibrary>
        )
      })}
    </div>
  )
}
export default GetMyLibraryInventory
