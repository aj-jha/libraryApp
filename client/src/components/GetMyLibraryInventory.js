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
      <table>
        <tr>
          {Object.keys(data.getMyLibraryInventory[0]).map(key => {
            if (key !== "library") {
              return <th>{key}</th>
            }
          })}
        </tr>
        {data.getMyLibraryInventory.map(book => {
          return (
            <tr>
              {Object.values(book).map(value => {
                {
                  if (typeof value !== "object") {
                    return <td>{value}</td>
                  }
                }
              })}
              <td>
                <button onClick={() => handleClick(book.id)}>Borrow</button>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
export default GetMyLibraryInventory
