import React from 'react';
import { z } from 'zod';

import { useForm } from './components/form';
import { TextField } from './components/form/text-field';

const formSchema = z.object({
  nome: z.string().min(6, { message: 'Mínimo de 6 caracteres' }),
  email: z.string().email({ message: 'Deve ser um e-mail valido.' }),
});

type DataForm = z.infer<typeof formSchema>;

function App() {
  const { errors, register, handleSubmit } = useForm(formSchema);

  const handleSalvarDados = (data: DataForm) => {
    console.log('data =>> ', data);
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <h1>Sandbox UI</h1>
        {/* <button style={{ padding: '8px 12px', fontSize: 16 }}>Teste</button> */}
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
          label="Nome"
          type="text"
          errors={errors.nome}
          {...register('nome')}
        />

        <TextField
          label="E-mail"
          type="email"
          errors={errors.email}
          {...register('email')}
        />

        <button
          type="submit"
          style={{ padding: '12px 8px', borderRadius: '8px' }}
        >
          Salvar
        </button>
      </form>
    </React.Fragment>
  );
}

export default App;
