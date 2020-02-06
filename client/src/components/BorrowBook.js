//NOT CURRENTLY IN USE
import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"

const BorrowBook = () => {
  // $signup is the input for the GQL mutation. It is an object that is passed to the mutation to provide input values for the signup function. Its a good idea to ensure the name of variables storing the value from the input form matches the required input in the schema
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

  // data stores the return variable fromt the GQL query results.
  const [borrowBook, { loading, error, data }] = useMutation(
    BORROWBOOK_MUTATION,
    {
      update(cache, { data: { BorrowBook } }) {
        console.log(BorrowBook)
        if (BorrowBook) {
          const { book } = cache.readQuery({ query: GET_MYLIBRARY_INVENTORY })
          cache.writeQuery({
            query: GET_MYLIBRARY_INVENTORY,
            data: { book: book.concat([BorrowBook]) }
          })
        }
      }
    }
  )
  // console.log(error);
  return (
    <div>
      <Formik
        initialValues={{
          book_id: ""
        }}
        validationSchema={Yup.object().shape({
          book_id: Yup.number().required()
        })}
        onSubmit={(
          values,
          // this catches all values fromt the formik form.
          { setSubmitting }
        ) => {
          borrowBook({
            variables: {
              book_id: values.book_id
            }
          })
          // variables (Defined by apollo hooks) stores input variable from the form or input values
          // signup matches the required variable input name in the GQL query
          // if not named the same, you need to do signup: {name: values.notmatchedname}
          setSubmitting(false)
        }}
      >
        {fProps => {
          return (
            <div>
              <h1>BORROW BOOK</h1>
              <form onSubmit={fProps.handleSubmit}>
                <input
                  name="book_id"
                  type="Number"
                  placeholder="book ID"
                  value={fProps.values.book_id}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
                />
                <button type="submit">Submit</button>
              </form>
              {fProps.errors.book_id && fProps.touched.book_id && (
                <div>{fProps.errors.book_id}</div>
              )}
            </div>
          )
        }}
      </Formik>
      {loading && <div>Loading...</div>}
      {error && console.log(error)}
      {data && (
        <div>
          {console.log(data)}
          {data.borrowBook.error && <div>Error: {data.borrowBook.error}</div>}
          {data.borrowBook.book && (
            <div>{data.borrowBook.book.title} has been borrowed!</div>
          )}
        </div>
      )}
    </div>
  )
}
