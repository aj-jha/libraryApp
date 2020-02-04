import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"
import { Redirect } from "react-router-dom"

const Login = () => {
  // $signup is the input for the GQL mutation. It is an object that is passed to the mutation to provide input values for the signup function. Its a good idea to ensure the name of variables storing the value from the input form matches the required input in the schema
  const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          name
          email
          password
          id
          role
        }
        csrfToken
        error
      }
    }
  `
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION)
  console.log(error)
  console.log(data)
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string()
        })}
        onSubmit={(
          values,
          // this catches all values fromt the formik form.
          { setSubmitting }
        ) => {
          login({
            variables: { email: values.email, password: values.password }
          })
          // variables (Defined by apollo hooks) stores input variable from the form or input values
          // signup matches the required variable input name in the GQL query
          // if not named the same, you need to do signup: {name: values.notmatchedname}
          setSubmitting(false)
        }}
      >
        {fProps => {
          return (
            <form onSubmit={fProps.handleSubmit}>
              <h1>Login</h1>
              <input
                name="email"
                type="text"
                placeholder="email"
                value={fProps.values.email}
                onChange={fProps.handleChange}
                onBlur={fProps.handleBlur}
              />
              {fProps.errors.email && fProps.touched.email && (
                <div>{fProps.errors.email}</div>
              )}
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fProps.values.password}
                onChange={fProps.handleChange}
                onBlur={fProps.handleBlur}
              />
              {fProps.errors.password && fProps.touched.password && (
                <div>{fProps.errors.password}</div>
              )}
              <button type="submit">Submit</button>
            </form>
          )
        }}
      </Formik>
      {loading && <div>Loading: {loading}</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          {data.login.user.role == "librarian" ? (
            <Redirect to="/librarian" />
          ) : (
            <Redirect to="/userhome" />
          )}
        </div>
      )}
    </div>
  )
}

export default Login
