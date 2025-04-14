import { faker } from '@faker-js/faker';
import { MDXProvider } from '@mdx-js/react';
import { z } from 'zod';

import { useForm } from '@/lib/form';
import * as SelectField from '@/lib/form/selectfield';
import * as TextField from '@/lib/form/textfield';

const components = {
  em: (props: any) => <i {...props} />,
};

const formSchema = z.object({
  nome: z
    .string({ message: 'Campo obrigatório' })
    .min(6, { message: 'Mínimo de 6 caracteres' })
    .optional(),
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Deve ser um e-mail valido' })
    .optional(),
  disabled: z.string().optional(),
  readonly: z.string().optional(),
  book: z.string().optional(),
});

const listaFake = new Array(100).fill({}).map((__, index) => ({
  name: faker.book.title(),
  value: String(index + 1),
}));

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

          <SelectField.Input
            {...register('book')}
            label="Book"
            errors={errors.book}
            placeholder="Select a book"
          >
            {listaFake.map((listItem) => {
              return (
                <SelectField.Item
                  key={listItem.value}
                  label={listItem.name}
                  value={listItem.value}
                >
                  {listItem.name}
                </SelectField.Item>
              );
            })}
          </SelectField.Input>

          {/* <div style={{ margin: '16px 0' }}>
            <select
              role="none"
              name="teste-select"
              id="teste-select"
              onChange={(e) => {
                console.info('event =>> ', e.target.value);
              }}
            >
              {listaFake.map((listItem) => {
                return (
                  <option
                    key={listItem.value}
                    label={listItem.name}
                    value={listItem.value}
                  >
                    {listItem.name}
                  </option>
                );
              })}
            </select>
          </div> */}

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

        <p style={{ margin: '18px 0px' }}>
          Sanctus voluptua lorem eirmod kasd sit dolor dolor autem nostrud. Ea
          no accusam augue dolor at clita sed consetetur. Consetetur nostrud et
          elitr justo dolores dignissim enim diam. Dolor sadipscing sit dolore
          sed diam dolore nulla nonumy lorem elitr magna eos duo magna eos
          placerat. Duo sea sea quod accusam diam clita dolore commodo nonumy
          sed labore rebum lorem odio aliquyam no. Sea eos eos sea sadipscing
          duis et nostrud option aliquyam lorem vero kasd amet consetetur
          takimata ea justo. Et kasd justo in duis invidunt luptatum et nonumy
          diam duo clita no at ea illum et. Ea no dolore illum no. Nonummy et
          duo sit et nibh duis consequat vero stet. Dolor et nibh iriure
          takimata clita amet et esse. Gubergren ea invidunt aliquyam tation
          diam ut est sed hendrerit diam dolore diam. Sanctus vulputate
          dignissim dolore clita sed amet aliquyam erat takimata duo erat
          aliquyam labore sea dolor. Kasd dignissim et duo sed et et ipsum amet.
          Eu et sanctus nostrud dolor iriure dolore nonumy assum elitr ipsum
          elitr te et et aliquip sed. Rebum commodo accusam dolor facilisi et
          autem amet vulputate dolore sit eirmod dolor dolores duo lorem blandit
          et. Ad sadipscing ut blandit consetetur lorem sed ut et at sit sit
          vulputate lorem ipsum blandit. Laoreet adipiscing quod labore rebum
          feugait sanctus ipsum consetetur duo accusam invidunt sed gubergren
          diam lorem. Molestie ipsum euismod labore nulla sed erat tempor sed at
          in invidunt. Labore sit praesent nonumy sadipscing duo vel sanctus ea
          sit veniam. Sit tempor eirmod dolore erat ea dolor dolor at et amet at
          amet dolore at. Sit nisl wisi sit erat lorem amet volutpat ex ut ipsum
          clita stet no labore. Stet nibh sed iriure est duis no hendrerit
          nonumy lorem ea consectetuer quod euismod kasd te ut no amet. Magna
          elitr dolore tempor ipsum. Minim nihil doming gubergren amet ut eum
          kasd ea lorem et lorem sed ipsum accumsan sed diam. Dolor labore kasd
          lorem euismod feugait invidunt lorem eirmod eos et iusto amet eirmod
          accusam sed. Magna ipsum rebum commodo stet est consectetuer dolor
          aliquyam sed feugiat duo elitr sed nonumy dolor gubergren. Justo ipsum
          accusam et ut vero et. Elitr diam in imperdiet clita. Lorem luptatum
          clita consetetur gubergren accumsan et erat imperdiet sed tempor
          magna. Dolore sit eos euismod justo ut ut tempor eirmod amet no clita
          nonumy erat ut. Est sit in praesent lorem justo gubergren clita erat.
          Justo stet diam euismod clita ut est qui nonumy sit gubergren dolores
          diam te feugiat sit kasd ut. Eu in nibh invidunt ea sed dolore nulla
          vel elitr quis est magna eirmod at sit assum dolor dolore. Ut takimata
          justo nonumy. Iusto eirmod stet dolores nonumy invidunt no voluptua no
          vel qui. Feugait labore esse diam iriure feugiat consequat augue.
          Labore clita diam diam ipsum duis consequat ea te erat in. Elitr dolor
          voluptua sea sadipscing aliquyam. Aliquyam vero volutpat sadipscing
          gubergren aliquyam justo dolor amet. Elit gubergren feugait dolor ea
          lorem sit sed et tation dolor imperdiet nonumy tempor ipsum et ea.
          Dolore kasd dolores lorem diam. Labore vel vel justo amet. Zzril dolor
          dolor diam amet dolore est at eos at invidunt kasd magna suscipit et
          dolores dolore erat nostrud. Sanctus duis nonumy magna sit tempor
          facilisis qui dolor sed dolore vero nonumy vel et labore voluptua
          gubergren odio. Kasd nonumy amet invidunt aliquyam eirmod elitr
          gubergren ut lorem ipsum et iusto consetetur molestie ea vero labore.
          At diam tempor consetetur diam sadipscing sit accusam duo nonumy
          praesent in vero in. Est et ipsum dolore amet duis sed eirmod ipsum
          ipsum. Sea stet consetetur consetetur aliquip voluptua aliquam dolore
          consequat autem. At kasd euismod qui. Vero stet dolores sea sadipscing
          justo kasd diam lorem dolores et eirmod rebum aliquyam ipsum duo. Et
          invidunt vero nostrud tincidunt nam dolor duo in consetetur sed magna
          possim. Hendrerit ea et lorem duo. Amet amet nonumy sea eirmod exerci
          labore diam esse duo. Amet sanctus est quis quod dolor laoreet duo
          delenit consetetur sed sit vero dolore gubergren. Rebum ea takimata
          soluta et magna. Dolor dolore sit sed sea et et lorem sit magna
          voluptua sed at labore no. Dignissim takimata lobortis tempor sed
          lorem et ea amet diam feugait et nonumy vero labore voluptua justo
          nonumy. Vel dolor dolor ea ipsum nonummy takimata et stet lorem tempor
          ut zzril et et est gubergren accusam. Diam no et dolore molestie magna
          accusam sit ea accumsan justo amet. Invidunt voluptua dolore volutpat.
          Tincidunt dolor no ut ea clita et sed placerat erat ipsum. Et sanctus
          et clita lorem duis kasd nulla labore rebum nulla elitr lorem eos.
          Tempor illum hendrerit elitr stet nulla dolores qui cum sed sed
          adipiscing ea kasd exerci sed ipsum. Ut adipiscing dolor. Takimata
          voluptua dolor nonumy ipsum dolor tempor sit elitr ea duis duo amet
          takimata. At at vero ullamcorper et accusam accusam et. Dolores minim
          id invidunt erat sit dolore vero eirmod accusam diam no sit at ad
          dolor eu ipsum. Illum invidunt magna dolor eleifend assum in magna
          takimata erat sadipscing dolores consequat est erat labore sit sit. Et
          hendrerit eu eos ipsum duis nulla sed gubergren cum gubergren et dolor
          dolores iusto ullamcorper et dignissim. Sadipscing et sed lorem sed
          consetetur sit aliquip feugait at dolores molestie. Diam veniam magna
          at delenit nonummy dolore wisi invidunt kasd et diam dolor stet esse.
          Aliquyam rebum sit nobis dolor sea dignissim magna eirmod sed feugiat
          ipsum. Est justo lorem dolore. Dolor vero consequat lorem gubergren et
          esse illum. Accusam qui voluptua sadipscing eu at tempor nibh dolor et
          accusam dolor eos gubergren lorem ipsum et. Vel eros minim sed
          voluptua amet ipsum lorem zzril diam ea nisl id sed ipsum amet. Amet
          clita ipsum duis sed odio vel no commodo iriure. Sit rebum consequat
          dolor nonumy ut voluptua no quis aliquyam vel magna. Erat gubergren
          tincidunt aliquyam sed. Voluptua est dolore amet.
        </p>
        <p style={{ margin: '18px 0px' }}>
          Sanctus voluptua lorem eirmod kasd sit dolor dolor autem nostrud. Ea
          no accusam augue dolor at clita sed consetetur. Consetetur nostrud et
          elitr justo dolores dignissim enim diam. Dolor sadipscing sit dolore
          sed diam dolore nulla nonumy lorem elitr magna eos duo magna eos
          placerat. Duo sea sea quod accusam diam clita dolore commodo nonumy
          sed labore rebum lorem odio aliquyam no. Sea eos eos sea sadipscing
          duis et nostrud option aliquyam lorem vero kasd amet consetetur
          takimata ea justo. Et kasd justo in duis invidunt luptatum et nonumy
          diam duo clita no at ea illum et. Ea no dolore illum no. Nonummy et
          duo sit et nibh duis consequat vero stet. Dolor et nibh iriure
          takimata clita amet et esse. Gubergren ea invidunt aliquyam tation
          diam ut est sed hendrerit diam dolore diam. Sanctus vulputate
          dignissim dolore clita sed amet aliquyam erat takimata duo erat
          aliquyam labore sea dolor. Kasd dignissim et duo sed et et ipsum amet.
          Eu et sanctus nostrud dolor iriure dolore nonumy assum elitr ipsum
          elitr te et et aliquip sed. Rebum commodo accusam dolor facilisi et
          autem amet vulputate dolore sit eirmod dolor dolores duo lorem blandit
          et. Ad sadipscing ut blandit consetetur lorem sed ut et at sit sit
          vulputate lorem ipsum blandit. Laoreet adipiscing quod labore rebum
          feugait sanctus ipsum consetetur duo accusam invidunt sed gubergren
          diam lorem. Molestie ipsum euismod labore nulla sed erat tempor sed at
          in invidunt. Labore sit praesent nonumy sadipscing duo vel sanctus ea
          sit veniam. Sit tempor eirmod dolore erat ea dolor dolor at et amet at
          amet dolore at. Sit nisl wisi sit erat lorem amet volutpat ex ut ipsum
          clita stet no labore. Stet nibh sed iriure est duis no hendrerit
          nonumy lorem ea consectetuer quod euismod kasd te ut no amet. Magna
          elitr dolore tempor ipsum. Minim nihil doming gubergren amet ut eum
          kasd ea lorem et lorem sed ipsum accumsan sed diam. Dolor labore kasd
          lorem euismod feugait invidunt lorem eirmod eos et iusto amet eirmod
          accusam sed. Magna ipsum rebum commodo stet est consectetuer dolor
          aliquyam sed feugiat duo elitr sed nonumy dolor gubergren. Justo ipsum
          accusam et ut vero et. Elitr diam in imperdiet clita. Lorem luptatum
          clita consetetur gubergren accumsan et erat imperdiet sed tempor
          magna. Dolore sit eos euismod justo ut ut tempor eirmod amet no clita
          nonumy erat ut. Est sit in praesent lorem justo gubergren clita erat.
          Justo stet diam euismod clita ut est qui nonumy sit gubergren dolores
          diam te feugiat sit kasd ut. Eu in nibh invidunt ea sed dolore nulla
          vel elitr quis est magna eirmod at sit assum dolor dolore. Ut takimata
          justo nonumy. Iusto eirmod stet dolores nonumy invidunt no voluptua no
          vel qui. Feugait labore esse diam iriure feugiat consequat augue.
          Labore clita diam diam ipsum duis consequat ea te erat in. Elitr dolor
          voluptua sea sadipscing aliquyam. Aliquyam vero volutpat sadipscing
          gubergren aliquyam justo dolor amet. Elit gubergren feugait dolor ea
          lorem sit sed et tation dolor imperdiet nonumy tempor ipsum et ea.
          Dolore kasd dolores lorem diam. Labore vel vel justo amet. Zzril dolor
          dolor diam amet dolore est at eos at invidunt kasd magna suscipit et
          dolores dolore erat nostrud. Sanctus duis nonumy magna sit tempor
          facilisis qui dolor sed dolore vero nonumy vel et labore voluptua
          gubergren odio. Kasd nonumy amet invidunt aliquyam eirmod elitr
          gubergren ut lorem ipsum et iusto consetetur molestie ea vero labore.
          At diam tempor consetetur diam sadipscing sit accusam duo nonumy
          praesent in vero in. Est et ipsum dolore amet duis sed eirmod ipsum
          ipsum. Sea stet consetetur consetetur aliquip voluptua aliquam dolore
          consequat autem. At kasd euismod qui. Vero stet dolores sea sadipscing
          justo kasd diam lorem dolores et eirmod rebum aliquyam ipsum duo. Et
          invidunt vero nostrud tincidunt nam dolor duo in consetetur sed magna
          possim. Hendrerit ea et lorem duo. Amet amet nonumy sea eirmod exerci
          labore diam esse duo. Amet sanctus est quis quod dolor laoreet duo
          delenit consetetur sed sit vero dolore gubergren. Rebum ea takimata
          soluta et magna. Dolor dolore sit sed sea et et lorem sit magna
          voluptua sed at labore no. Dignissim takimata lobortis tempor sed
          lorem et ea amet diam feugait et nonumy vero labore voluptua justo
          nonumy. Vel dolor dolor ea ipsum nonummy takimata et stet lorem tempor
          ut zzril et et est gubergren accusam. Diam no et dolore molestie magna
          accusam sit ea accumsan justo amet. Invidunt voluptua dolore volutpat.
          Tincidunt dolor no ut ea clita et sed placerat erat ipsum. Et sanctus
          et clita lorem duis kasd nulla labore rebum nulla elitr lorem eos.
          Tempor illum hendrerit elitr stet nulla dolores qui cum sed sed
          adipiscing ea kasd exerci sed ipsum. Ut adipiscing dolor. Takimata
          voluptua dolor nonumy ipsum dolor tempor sit elitr ea duis duo amet
          takimata. At at vero ullamcorper et accusam accusam et. Dolores minim
          id invidunt erat sit dolore vero eirmod accusam diam no sit at ad
          dolor eu ipsum. Illum invidunt magna dolor eleifend assum in magna
          takimata erat sadipscing dolores consequat est erat labore sit sit. Et
          hendrerit eu eos ipsum duis nulla sed gubergren cum gubergren et dolor
          dolores iusto ullamcorper et dignissim. Sadipscing et sed lorem sed
          consetetur sit aliquip feugait at dolores molestie. Diam veniam magna
          at delenit nonummy dolore wisi invidunt kasd et diam dolor stet esse.
          Aliquyam rebum sit nobis dolor sea dignissim magna eirmod sed feugiat
          ipsum. Est justo lorem dolore. Dolor vero consequat lorem gubergren et
          esse illum. Accusam qui voluptua sadipscing eu at tempor nibh dolor et
          accusam dolor eos gubergren lorem ipsum et. Vel eros minim sed
          voluptua amet ipsum lorem zzril diam ea nisl id sed ipsum amet. Amet
          clita ipsum duis sed odio vel no commodo iriure. Sit rebum consequat
          dolor nonumy ut voluptua no quis aliquyam vel magna. Erat gubergren
          tincidunt aliquyam sed. Voluptua est dolore amet.
        </p>
      </div>
    </MDXProvider>
  );
};

export default FormPage;
