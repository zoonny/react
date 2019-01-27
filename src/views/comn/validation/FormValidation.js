import React, { Component } from 'react';
import { form, control, button } from 'react-validation';
import {
  Form as FormTemplate,
  Input as InputTemplate,
  Button as ButtonTemplate,
  FormText,
} from 'reactstrap';

const FormWrapper = ({
  getValues,
  validate,
  validateAll,
  showError,
  hideError,
  children,
  ...props
}) => <FormTemplate {...props}>{children}</FormTemplate>;

const InputWrapper = ({ error, isChanged, isUsed, ...props }) => (
  <div>
    <InputTemplate {...props} />
    {isChanged && isUsed && error}
  </div>
);

const ButtonWrapper = ({ hasErrors, ...props }) => {
  return <ButtonTemplate {...props} disabled={hasErrors} />;
};

export const Form = form(FormWrapper);
export const Input = control(InputWrapper);
export const Button = button(ButtonWrapper);
