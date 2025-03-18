import React from 'react';
import { z } from 'zod';

import { useForm } from '@/lib/form';
import { TextField } from '@/lib/form/text-field';

const formSchema = z.object({
  nome: z
    .string({ message: 'Campo obrigatório' })
    .min(6, { message: 'Mínimo de 6 caracteres' }),
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Deve ser um e-mail valido' }),
});

type DataForm = z.infer<typeof formSchema>;

const Form = () => {
  const { isValid, errors, register, handleSubmit, setExternalErrors } =
    useForm(formSchema);

  const handleSalvarDados = (data: DataForm) => {
    console.info('data =>> ', data);
  };

  const setError = () => {
    setExternalErrors({ nome: ['Erro externo.'], email: ['Apenas um teste'] });
  };

  console.info('isValid =>> ', isValid);

  return (
    <React.Fragment>
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <h1>Sandbox UI</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleSalvarDados)}
        style={{
          display: 'flex',
          gap: 16,
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <TextField
          required
          label="Nome"
          type="text"
          errors={errors.nome}
          {...register('nome')}
        />

        <TextField
          required
          label="E-mail"
          type="email"
          errors={errors.email}
          {...register('email')}
        />

        <button
          disabled={!isValid}
          type="submit"
          style={{ padding: '12px 8px', borderRadius: '8px' }}
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={setError}
          style={{ padding: '12px 8px', borderRadius: '8px' }}
        >
          Set Error
        </button>
      </form>
    </React.Fragment>
  );
};

export default Form;
