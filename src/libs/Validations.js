import React from 'react';
import { FormFeedback, FormText } from 'reactstrap';

// import validator from 'validator';

export const required = (value, e) => {
  if (!value.toString().trim().length) {
    return (
      <div>
        <FormText>{e.name}은 필수값 입니다.</FormText>
      </div>
    );
  }
};

export const email = (value, e) => {
  //   if (!validator.isEmail(value)) {
  //     return `${value} is not a valid email.`;
  //   }
};

export const lt = (value, props) => {
  if (!value.toString().trim().length > props.maxLength) {
    return (
      <span className="error">
        The value exceeded {props.maxLength} symbols.
      </span>
    );
  }
};

export const password = (value, props, components) => {
  if (value !== components['confirm'][0].value) {
    return <span className="error">Passwords are not equal.</span>;
  }
};
