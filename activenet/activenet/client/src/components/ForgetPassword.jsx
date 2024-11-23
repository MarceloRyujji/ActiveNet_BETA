import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importação para redirecionamento
import generalStyles from '../styles/GeneralStyles.module.css';
import Axios from 'axios';

const ForgetPassword = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro
  const navigate = useNavigate(); // Hook para redirecionamento

  const emailValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
  });

  const resetPasswordValidationSchema = yup.object().shape({
    code: yup
      .string()
      .length(6, 'The code must be 6 digits')
      .required('Verification code is required'),
    newPassword: yup
      .string()
      .min(10, 'Password must be at least 10 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{+}|<>]/, 'Password must contain at least one special character')
      .matches(/^(?!.*([a-zA-Z0-9])\1).+$/, 'Password must not contain repeated characters')
      .required('New password is required'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const handleSendCode = (values) => {
    setEmail(values.email);
    setErrorMessage(''); // clean the error message to send the code again
    Axios.post('http://localhost:3001/passwordRecovery', {
      email: values.email,
    })
      .then((res) => {
        console.log(res);
        setCodeSent(true); // check if the code is send with success
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 404) {
          setErrorMessage('Email not registered'); // error message
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  const handleResetPassword = (values) => {
    Axios.post('http://localhost:3001/resetPassword', {
      email: email,
      code: values.code,
      newPassword: values.newPassword,
    })
      .then((res) => {
        console.log(res);
        alert('Password reset successfully!');
        navigate('/'); // back to login page
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className={generalStyles.generalCard}>
      <h1>Reset Password</h1>
      {!codeSent ? (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={emailValidationSchema}
          onSubmit={handleSendCode}
        >
          {({ errors, touched }) => (
            <Form className={generalStyles.generalForm}>
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
              {errorMessage && (
                <span className={generalStyles.spanErrorMessage}>{errorMessage}</span>
              )}
              <button className={generalStyles.generalSubmitButton} type="submit">
                Send Verification Code
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            code: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={handleResetPassword}
        >
          {({ errors, touched }) => (
            <Form className={generalStyles.generalForm}>
              <Field
                className={
                  errors.code && touched.code
                    ? generalStyles.inputError
                    : generalStyles.generalInput
                }
                type="text"
                name="code"
                placeholder="Verification Code"
              />
              <ErrorMessage
                component="span"
                className={generalStyles.spanErrorMessage}
                name="code"
              />

              <Field
                className={
                  errors.newPassword && touched.newPassword
                    ? generalStyles.inputError
                    : generalStyles.generalInput
                }
                type="password"
                name="newPassword"
                placeholder="New Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                component="span"
                className={generalStyles.spanErrorMessage}
                name="newPassword"
              />

              <Field
                className={
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? generalStyles.inputError
                    : generalStyles.generalInput
                }
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                component="span"
                className={generalStyles.spanErrorMessage}
                name="confirmNewPassword"
              />

              <button className={generalStyles.generalSubmitButton} type="submit">
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ForgetPassword;
