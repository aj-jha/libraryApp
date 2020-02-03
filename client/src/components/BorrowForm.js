import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const BorrowForm = ({
  library,
  setLibrary,
  borrowCounter,
  setBorrowCounter
}) => {
  return (
    <Formik
      initialValues={{
        borrower: "",
        bookid: 0
      }}
      onSubmit={(values, { setSubmitting }) => {
        let newLibrary = library;

        newLibrary = newLibrary.map(book => {
          if (book.id !== parseInt(values.bookid)) {
            return book;
          } else {
            return {
              ...book,
              // ...book keeps all keys of the original object and keeps it the same. unless the key is specified below. In this instance, borrowedBy will be changed.
              borrowedBy: values.borrower
            };
          }
        });
        console.log(newLibrary);
        setLibrary(newLibrary);
        // code above extracts value from the input field named borrower
        setSubmitting(false);
        setBorrowCounter(borrowCounter + 1);
      }}
      validationSchema={Yup.object().shape({
        borrower: Yup.string("This is not a string").required(
          "This is a required input"
        ),
        bookid: Yup.number()
          .integer()
          .positive()
          .required("This is a required input")
          .lessThan(library.length + 1, "We don't have that shit brudda")
      })}
    >
      {fProps => {
        return (
          <form onSubmit={fProps.handleSubmit}>
            <input
              name="borrower"
              value={fProps.values.borrower}
              onChange={fProps.handleChange}
              onBlur={fProps.handleBlur}
              type="text"
            />
            {fProps.errors.borrower && fProps.touched.borrower && (
              <div>{fProps.errors.borrower}</div>
            )}
            <input
              name="bookid"
              value={fProps.values.bookid}
              onChange={fProps.handleChange}
              onBlur={fProps.handleBlur}
              type="number"
            />
            {fProps.errors.bookid && fProps.touched.bookid && (
              <div>{fProps.errors.bookid}</div>
            )}
            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Formik>
  );
};

export default BorrowForm;
