import React from "react"
import { useQuery } from "react-apollo-hooks"
import gql from "graphql-tag"
import BooksOrPeopleTable from "./styledComponents/BooksOrPeopleTable"

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
  // console.log(data)
  return (
    <div>
      {!data.getInventory[0] ? (
        <div>There are no books in this library</div>
      ) : (
        <div>
          <BooksOrPeopleTable>
            <section>
              <div>{Object.keys(data.getInventory[0])[0]}</div>
              <div>{Object.keys(data.getInventory[0])[1]}</div>
              <div>{Object.keys(data.getInventory[0])[2]}</div>
            </section>
            {data.getInventory.map(book => {
              return (
                <div>
                  <div>{book.id}</div>
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                </div>
              )
            })}
          </BooksOrPeopleTable>
        </div>
      )}
    </div>
  )
}

export default DisplayInventory
