import './styles.css';

import React, { useMemo, useState } from 'react';
import { infer as ZodInfer, ZodSchema } from 'zod';

type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export function useForm<TSchema extends ZodSchema<any>>(schema: TSchema) {
  type FormData = ZodInfer<TSchema>;

  const [values, setValues] = useState<FormData>({} as FormData);
  const [errors, setErrors] = useState<FieldErrors<FormData>>({});

  console.info('errors =>> ', errors);

  const isValid = useMemo(
    () => Object.values(errors).every((errArray) => errArray?.length === 0),
    [errors]
  );

  const validateField = (name: keyof FormData, value: any) => {
    const result = schema.safeParse({ ...values, [name]: value });

    setErrors((prev) => {
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors[name] || [];
        return { ...prev, [name]: fieldErrors };
      }
      const currentErrors = { ...prev };
      delete currentErrors[name];
      return currentErrors;
    });
  };

  const register = (name: keyof FormData) => ({
    name,
    value: values[name] || '',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValues((prev) => ({ ...prev, [name]: newValue }));
      validateField(name, newValue);
    },
    onBlur: () => validateField(name, values[name]),
  });

  const setExternalErrors = (externalErrors: FieldErrors<FormData>) => {
    setErrors((prev) => ({ ...prev, ...externalErrors }));
  };

  const handleSubmit =
    (callback: (data: FormData) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const result = schema.safeParse(values);
      if (result.success) {
        callback(result.data);
      } else {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors((prev) => {
          const formattedErrors: FieldErrors<FormData> = { ...prev };
          Object.keys(fieldErrors).forEach((key) => {
            formattedErrors[key as keyof FormData] = fieldErrors[key] || [];
          });
          return formattedErrors;
        });
      }
    };

  return {
    values,
    errors,
    isValid,
    register,
    handleSubmit,
    setExternalErrors,
  };
}
