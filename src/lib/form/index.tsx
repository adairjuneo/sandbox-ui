import React, { useMemo, useState } from 'react';
import { infer as ZodInfer, ZodSchema } from 'zod';

type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

export function useForm<TSchema extends ZodSchema<any>>(schema: TSchema) {
  type FormDataType = ZodInfer<TSchema>;

  const [values, setValues] = useState<FormDataType>({} as FormDataType);
  const [errors, setErrors] = useState<FieldErrors<FormDataType>>({});

  const isValid = useMemo(() => {
    return (
      schema.safeParse({ ...values }).success &&
      Object.values(errors).every((errArray) => errArray?.length === 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const validateField = (name: keyof FormDataType, value: any) => {
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

  const register = (name: keyof FormDataType) => ({
    name,
    value: values[name] || '',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValues((prev) => ({ ...prev, [name]: newValue }));
      validateField(name, newValue);
    },
    onBlur: () => validateField(name, values[name]),
  });

  const setExternalErrors = (externalErrors: FieldErrors<FormDataType>) => {
    setErrors((prev) => ({ ...prev, ...externalErrors }));
  };

  const handleSubmit =
    (callback: (data: FormDataType) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const result = schema.safeParse(values);
      if (result.success) {
        callback(result.data);
      } else {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors((prev) => {
          const formattedErrors: FieldErrors<FormDataType> = { ...prev };
          Object.keys(fieldErrors).forEach((key) => {
            formattedErrors[key as keyof FormDataType] = fieldErrors[key] || [];
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
