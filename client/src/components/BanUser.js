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

  return (
    <div>
      <Formik
        initialValues={{
          banid: ""
        }}
        validationSchema={Yup.object().shape({
          banid: Yup.number().required()
        })}
        onSubmit={(values, { setSubmitting }) => {
          banUser({
            variables: {
              id: values.banid
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
                  name="banid"
                  type="Number"
                  placeholder="user ID"
                  value={fProps.values.id}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
                />
                {fProps.errors.id && fProps.touched.id && (
                  <div>{fProps.errors.id}</div>
                )}
                <button name="banbutton" type="submit">
                  Ban!
                </button>
              </form>
            </div>
          )
        }}
      </Formik>
      {loading && <div>Loading... {console.log(loading)}</div>}
      {error && <div>Error...</div>}
      {data &&
        (!data.banUser.user ? (
          <div>
            {console.log(data.banUser.error)}
            Something Went Wrong
          </div>
        ) : (
          <div data-cy="banresults">
            {data.banUser.user.banned
              ? `${data.banUser.user.name} has been banned`
              : `${data.banUser.user.name} has been unbanned`}
          </div>
        ))}
    </div>
  )
}

export default BanUser
