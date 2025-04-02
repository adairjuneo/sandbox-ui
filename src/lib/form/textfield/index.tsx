import './styles.scss';

import React from 'react';

interface TextFieldSlotProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  position: 'left' | 'right';
}

export const Slot = React.forwardRef<HTMLDivElement, TextFieldSlotProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <div
        ref={ref}
        data-state-position={props.position}
        className="field-slot"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Slot.displayName = 'TextFieldSlot';

interface TextFieldInputProps extends React.ComponentProps<'input'> {
  label?: string;
  errors?: string[];
}

export const Input = React.forwardRef<HTMLInputElement, TextFieldInputProps>(
  (props, ref) => {
    const { type = 'text', name, label, errors, children, ...rest } = props;
    const leftSlotElements: React.ReactNode[] = [];
    const rightSlotElements: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<TextFieldSlotProps>(child) &&
        child.type === Slot
      ) {
        const slot = React.cloneElement(child);
        switch (child.props.position) {
          case 'left':
            leftSlotElements.push(slot);
            break;
          case 'right':
            rightSlotElements.push(slot);
            break;
          default:
            break;
        }
      }
    });

    const hasLeftSlotElements = Boolean(leftSlotElements?.length);
    const hasRightSlotElements = Boolean(rightSlotElements?.length);
    const hasValidationErrors = Boolean(errors?.length);
    const isReadOnly = Boolean(props.readOnly);

    return (
      <div className="field-root" data-state-error={hasValidationErrors}>
        {label && (
          <label className="field-label" title={label} htmlFor={name}>
            {label}
          </label>
        )}
        <div className="field-container">
          {hasLeftSlotElements && leftSlotElements}
          <input
            ref={ref}
            id={name}
            type={type}
            tabIndex={!isReadOnly ? 0 : -1}
            className="field-input"
            placeholder={!label ? name : rest.placeholder}
            data-state-error={hasValidationErrors}
            data-state-read-only={isReadOnly}
            {...rest}
          />
          {hasRightSlotElements && rightSlotElements}
        </div>
        <span className="field-error">{errors?.map((error) => error)}</span>
      </div>
    );
  }
);

Input.displayName = 'TextFieldInput';
