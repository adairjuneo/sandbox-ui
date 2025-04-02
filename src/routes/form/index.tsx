import { MDXProvider } from '@mdx-js/react';
import { z } from 'zod';

import { useForm } from '@/lib/form';
import * as TextField from '@/lib/form/textfield';

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
  disabled: z.string().optional(),
  readonly: z.string().optional(),
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
          <TextField.Input
            {...register('nome')}
            autoFocus
            required
            label="Name"
            type="text"
            errors={errors.nome}
            placeholder="Your name"
          />

          <TextField.Input
            {...register('email')}
            required
            label="E-mail"
            type="email"
            errors={errors.email}
            placeholder="Your e-mail"
          />

          <TextField.Input
            {...register('disabled')}
            disabled
            label="Disabled"
            type="text"
            errors={errors.disabled}
            placeholder="Field disabled for tests"
          />

          <TextField.Input
            {...register('readonly')}
            readOnly
            label="Readonly"
            type="text"
            errors={errors.readonly}
            value="Sea mazim nonumy eos diam sit."
            placeholder="Readonly for tests"
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
