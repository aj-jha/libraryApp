import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"

const BanUser = () => {
  const BANUSER_MUTATION = gql`
    mutation($id: ID!) {
      banUser(id: $id) {
        user {
          name
          address
          banned
        }
        error
      }
    }
  `

  const [banUser, { loading, error, data }] = useMutation(BANUSER_MUTATION)

  console.log(data)

  return (
    <div>
      <Formik
        initialValues={{
          id: ""
        }}
        validationSchema={Yup.object().shape({
          id: Yup.number().required()
        })}
        onSubmit={(values, { setSubmitting }) => {
          banUser({
            variables: {
              id: values.id
            }
          })
          setSubmitting(false)
        }}
      >
        {fProps => {
          return (
            <div>
              <h1>Ban User</h1>
              <form onSubmit={fProps.handleSubmit}>
                <input
                  name="id"
                  type="Number"
                  placeholder="user ID"
                  value={fProps.values.id}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
                />
                {fProps.errors.id && fProps.touched.id && (
                  <div>{fProps.errors.id}</div>
                )}
                <button type="submit">Submit</button>
              </form>
            </div>
          )
        }}
      </Formik>
      {loading && <div>Loading: {loading}</div>}
      {error && <div>Error: {error}</div>}
      {data &&
        (!data.banUser.user ? (
          <div>
            {console.log(data.banUser.error)}
            Something Went Wrong
          </div>
        ) : data.banUser.user.banned ? (
          <div>{data.banUser.user.name} has been banned</div>
        ) : (
          <div>{data.banUser.user.name} has been unbanned</div>
        ))}
    </div>
  )
}

export default BanUser
