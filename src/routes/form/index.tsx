import { MDXProvider } from '@mdx-js/react';
import { z } from 'zod';

import { useForm } from '@/lib/form';
import { TextField } from '@/lib/form/text-field';

const components = {
  em: (props: any) => <i {...props} />,
};

const formSchema = z.object({
  nome: z
    .string({ message: 'Campo obrigatório' })
    .min(6, { message: 'Mínimo de 6 caracteres' }),
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Deve ser um e-mail valido' }),
});

const FormPage = () => {
  const { errors, register, handleSubmit, isValid } = useForm(formSchema);

  const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
    console.info('formData =>> ', data);
  };

  return (
    <MDXProvider components={components}>
      <header className="header-page">
        <h2 className="title-page">Componente de Formulário</h2>
        <p className="description-page">
          Componente a ser utilizado para obter dados de entrada do usuário.
        </p>
      </header>
      <div className="content-page">
        <form
          noValidate
          autoComplete="off"
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <TextField
            {...register('nome')}
            label="Name"
            type="text"
            errors={errors.nome}
            placeholder="Your name"
          />

          <TextField
            {...register('email')}
            label="E-mail"
            type="email"
            errors={errors.email}
            placeholder="Your e-mail"
          />

          <div>
            <button
              style={{ padding: '8px 12px', color: '#FFF' }}
              type="submit"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </MDXProvider>
  );
};

export default FormPage;
