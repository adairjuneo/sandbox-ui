import './styles.css';

import React, { useState } from 'react';
import { infer as ZodInfer, ZodSchema } from 'zod';

type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<TSchema extends ZodSchema<any>>(schema: TSchema) {
  type FormData = ZodInfer<TSchema>;

  const [values, setValues] = useState<FormData>({} as FormData);
  const [errors, setErrors] = useState<FieldErrors<FormData>>({});

  const validateField = (name: keyof FormData, value: any) => {
    const result = schema.safeParse({ ...values, [name]: value });
    if (!result.success) {
      const fieldError = result.error.flatten().fieldErrors[name]?.[0] || '';
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const register = (name: keyof FormData) => ({
    name,
    value: values[name] || '',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValues((prev) => ({ ...prev, [name]: newValue }));
      validateField(name, newValue);
    },
  });

  const setExternalErrors = (externalErrors: FieldErrors<FormData>) => {
    setErrors(externalErrors);
  };

  const handleSubmit =
    (callback: (data: FormData) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const result = schema.safeParse(values);
      if (result.success) {
        callback(result.data);
      } else {
        const fieldErrors = result.error.flatten().fieldErrors;
        const formattedErrors: FieldErrors<FormData> = Object.keys(
          fieldErrors
        ).reduce((acc, key) => {
          acc[key as keyof FormData] = fieldErrors[key]?.[0] || '';
          return acc;
        }, {} as FieldErrors<FormData>);
        setErrors(formattedErrors);
      }
    };

  return { values, errors, register, handleSubmit, setExternalErrors };
}
