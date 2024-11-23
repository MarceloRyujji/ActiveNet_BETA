import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import generalStyles from '../styles/GeneralStyles.module.css'
import styles from '../styles/SignUp.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  // Validation with Yup
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(10, 'Password must be at least 10 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[!@#$%^&*(),.?":{+-}|<>]/,
        'Password must contain at least one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    dateOfBirth: yup
      .date()
      .max(
        new Date(Date.now() - 568025136000),
        'You must be at least 18 years old'
      )
      .required('Date of birth is required'),
    accountType: yup
      .string()
      .oneOf(['user', 'trainer'], 'Account type is required')
      .required('Account type is required'),
  })

  // Function for API communication
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/signUp',
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          dateOfBirth: values.dateOfBirth,
          accountType: values.accountType,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      console.log('Server Response:', response)

      if (response.status === 201) {
        const redirectUrl = response.data.redirectUrl
        if (redirectUrl) {
          console.log('Redirecting to:', redirectUrl)
          navigate(redirectUrl)
        } else {
          console.error('Redirect URL not found in response')
        }
      } else {
        console.error('Error: ', response.data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className={generalStyles.generalCard}>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: '',
          accountType: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={generalStyles.generalForm}>
            <Field
              className={
                errors.firstName && touched.firstName
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="firstName"
            />

            <Field
              className={
                errors.lastName && touched.lastName
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="lastName"
            />

            <Field
              className={
                errors.email && touched.email
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="email"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="email"
            />

            <Field
              className={
                errors.password && touched.password
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="password"
            />

            <Field
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="confirmPassword"
            />
            <label className={styles.birthLable}>
              Introduce your birth day:
            </label>
            <Field
              className={
                errors.dateOfBirth && touched.dateOfBirth
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
            />
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="dateOfBirth"
            />

            <Field
              as="select"
              className={
                errors.accountType && touched.accountType
                  ? generalStyles.inputError
                  : generalStyles.generalSelect
              }
              name="accountType"
            >
              <option value="">Account type...</option>
              <option value="user">User</option>
              <option value="trainer">Trainer</option>
            </Field>
            <ErrorMessage
              component="span"
              className={generalStyles.spanErrorMessage}
              name="accountType"
            />

            <button className={generalStyles.generalSubmitButton} type="submit">
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
