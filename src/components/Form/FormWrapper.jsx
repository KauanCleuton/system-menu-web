import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import validationSchema from '@/utils/validation';

const FormWrapper = ({ initialValues, valSchema, handleSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={valSchema || validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      enableReinitialize={false}
    >
      {(formikProps) => <Form noValidate>{children(formikProps)}</Form>}
    </Formik>
  );
};

export default FormWrapper;
