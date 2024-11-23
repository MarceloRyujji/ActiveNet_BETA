import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import generalStyles from '../styles/GeneralStyles.module.css'
import Style from '../styles/Login.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'

function LoginForm() {
  const navigate = useNavigate()

  const handleClickLogin = (values, { setSubmitting, setErrors }) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        console.log('Login successful', res.data)

        // Store the token in localStorage
        localStorage.setItem('authToken', res.data.token)

        // Set the authentication status
        const accountType = res.data.accountType
        const profilePicture = res.data.profilePicture

        if (accountType === 'user') {
          navigate('/HomePageUser')
        } else if (accountType === 'trainer') {
          navigate('/HomePageTrainer')
        } else {
          navigate('/HomePageUser')
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrors({ password: 'Invalid password' })
        } else if (error.response && error.response.status === 404) {
          setErrors({ email: 'User not found' })
        } else {
          console.error('Login error', error)
        }
      })
      .finally(() => setSubmitting(false))
  }

  const validationLogin = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup
      .string()
      .min(8, 'Min. 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[!@#$%^&*(),.?":{+-}|<>]/,
        'Password must contain at least one special character'
      )
      .matches(
        /^(?!.*([a-zA-Z0-9])\1).+$/,
        'Password must not contain repeated characters'
      )
      .required('Password required'),
  })

  return (
    <div className={generalStyles.generalCard}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={generalStyles.generalForm}>
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="email"
              className={
                errors.email && touched.email
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
            />
            <ErrorMessage
              component="span"
              name="email"
              className={generalStyles.spanErrorMessage}
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              className={
                errors.password && touched.password
                  ? generalStyles.inputError
                  : generalStyles.generalInput
              }
            />
            <ErrorMessage
              component="span"
              name="password"
              className={generalStyles.spanErrorMessage}
            />
            <button
              className={generalStyles.generalSubmitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/ForgetPassword" className={Style.forgottenAccount}>
        Forgotten account?
      </Link>

      <Link to="/signUp">
        <button type="button" className={generalStyles.generalButton}>
          Sign Up
        </button>
      </Link>
    </div>
  )
}

export default LoginForm
