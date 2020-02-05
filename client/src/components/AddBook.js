import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"

const AddBook = () => {
  // $signup is the input for the GQL mutation. It is an object that is passed to the mutation to provide input values for the signup function. Its a good idea to ensure the name of variables storing the value from the input form matches the required input in the schema
  const ADDBOOK_MUTATION = gql`
    mutation($title: String!, $author: String!, $library_id: ID!) {
      addBook(title: $title, author: $author, library_id: $library_id) {
        error
        book {
          title
          author
          id
          library {
            id
          }
        }
      }
    }
  `

  // data stores the return variable fromt the GQL query results.
  const [addBook, { loading, error, data }] = useMutation(ADDBOOK_MUTATION)
  // console.log(data)
  // console.log(error)
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          author: "",
          library_id: ""
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required(),
          author: Yup.string().required(),
          library_id: Yup.number().required()
        })}
        onSubmit={(
          values,
          // this catches all values fromt the formik form.
          { setSubmitting }
        ) => {
          addBook({
            variables: {
              title: values.title,
              author: values.author,
              library_id: values.library_id
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
              <h1>ADD BOOK</h1>
              <form onSubmit={fProps.handleSubmit}>
                <input
                  name="title"
                  type="text"
                  placeholder="title"
                  value={fProps.values.title}
                  onChange={fProps.handleChange}
                  onBlur={fProps.onBlur}
                />
                {fProps.errors.title && fProps.touched.title && (
                  <div>{fProps.errors.title}</div>
                )}
                <input
                  name="author"
                  type="text"
                  placeholder="author"
                  value={fProps.values.author}
                  onChange={fProps.handleChange}
                  onBlur={fProps.onBlur}
                />
                {fProps.errors.author && fProps.touched.author && (
                  <div>{fProps.errors.author}</div>
                )}
                <input
                  name="library_id"
                  type="number"
                  placeholder="library ID"
                  value={fProps.values.library_id}
                  onChange={fProps.handleChange}
                  onBlur={fProps.onBlur}
                />
                {fProps.errors.library_id && fProps.touched.library_id && (
                  <div>{fProps.errors.library_id}</div>
                )}
                <button type="submit">Submit</button>
              </form>
            </div>
          )
        }}
      </Formik>
      {loading && <div>Loading...</div>}
      {error && console.log(error)}
      {data && (
        <div>
          {data.addBook.error && <div>Error: {data.borrowBook.error}</div>}
          {data.addBook.book && (
            <div>
              {data.addBook.book.title} has been added to library{" "}
              {data.addBook.book.library.id}!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddBook
