import './styles.css';

import React from 'react';

interface TextFieldProps extends React.ComponentProps<'input'> {
  label?: string;
  errors?: string[];
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, errors, ...props }, ref) => {
    return (
      <div className="field-container">
        {label && (
          <label className="field-label" htmlFor={props.name}>
            {label}
          </label>
        )}
        <input
          id={props.name}
          ref={ref}
          className="field-input"
          placeholder={!label ? props.name : props.placeholder}
          data-error={!!errors?.length}
          {...props}
        />
        {!!errors?.length && (
          <span className="field-error">{errors.map((error) => error)}</span>
        )}
      </div>
    );
  }
);
