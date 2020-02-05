import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"

const ReturnBook = () => {
  // $signup is the input for the GQL mutation. It is an object that is passed to the mutation to provide input values for the signup function. Its a good idea to ensure the name of variables storing the value from the input form matches the required input in the schema

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

  const RETURNBOOK_MUTATION = gql`
    mutation($book_id: ID!) {
      returnBook(book_id: $book_id) {
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

  // data stores the return variable fromt the GQL query results.
  const [returnBook, { loading, error, data }] = useMutation(
    RETURNBOOK_MUTATION,
    {
      update(cache, { data: { ReturnBook } }) {
        const { book } = cache.readQuery({ query: GET_MYLIBRARY_INVENTORY })
        cache.writeQuery({
          query: GET_MYLIBRARY_INVENTORY,
          data: { book: book.concat([ReturnBook]) }
        })
      }
    }
  )
  console.log(data)
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
          returnBook({
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
              <h1>RETURN BOOK</h1>
              <form onSubmit={fProps.handleSubmit}>
                <input
                  name="book_id"
                  type="number"
                  placeholder="book ID"
                  value={fProps.values.title}
                  onChange={fProps.handleChange}
                  onBlur={fProps.onBlur}
                />
                {fProps.errors.book_id && fProps.touched.book_id && (
                  <div>{fProps.errors.book_id}</div>
                )}
                <button type="submit">Submit</button>
              </form>
            </div>
          )
        }}
      </Formik>
      {loading && <div>Loading: {loading}</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          {data.returnBook.error && <div>Error: {data.returnBook.error}</div>}
          {data.returnBook.book && (
            <div>{data.returnBook.book.title} has been returned!</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ReturnBook
