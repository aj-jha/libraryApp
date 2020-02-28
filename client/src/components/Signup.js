import React from "react"
import { Formik } from "formik"
import { useMutation } from "react-apollo-hooks"
import * as Yup from "yup"
import gql from "graphql-tag"

const Signup = () => {
  // $signup is the input for the GQL mutation. It is an object that is passed to the mutation to provide input values for the signup function. Its a good idea to ensure the name of variables storing the value from the input form matches the required input in the schema
  const SIGNUP_MUTATION = gql`
    mutation($signup: SignupInput!) {
      signup(input: $signup) {
        user {
          id
          name
          email
          password
          address
        }
        csrfToken
        error
      }
    }
  `
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION)
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          address: "",
          library_id: ""
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          address: Yup.string(),
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string().min(
            6,
            "Password must be 6 or more characters."
          ),
          library_id: Yup.number().required()
        })}
        onSubmit={(
          values,
          // this catches all values fromt the formik form.
          { setSubmitting }
        ) => {
          signup({ variables: { signup: values } })
          // variables (Defined by apollo hooks) stores input variable from the form or input values
          // signup matches the required variable input name in the GQL query
          // if not named the same, you need to do signup: {name: values.notmatchedname}
          setSubmitting(false)
        }}
      >
        {fProps => {
          console.log(fProps.errors)
          return (
            <div>
              <h1>Signup</h1>
              <form onSubmit={fProps.handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  value={fProps.values.name}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
                />
                {fProps.errors.name && fProps.touched.name && (
                  <div>{fProps.errors.name}</div>
                )}
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
                <input
                  name="address"
                  type="text"
                  placeholder="address"
                  value={fProps.values.address}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
                />
                {fProps.errors.address && fProps.touched.address && (
                  <div>{fProps.errors.address}</div>
                )}
                <input
                  name="library_id"
                  type="number"
                  placeholder="library ID"
                  value={fProps.values.library_id}
                  onChange={fProps.handleChange}
                  onBlur={fProps.handleBlur}
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
      {loading && <div>Loading: {loading}</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div data-cy="result">
          {data.signup.user != null
            ? `${data.signup.user.name} has been signed up`
            : `Something went wrong: ${data.signup.error}`}
        </div>
      )}
    </div>
  )
}

export default Signup
