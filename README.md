# Linear UI 🔴⚛️

Biblioteca de componente para criação interface, utilizada em aplicações Web da Linear Sistemas.

## Dúvidas

- Vamos refazer do zero componente de Formulário?
  - Prós
    - [ ] Mais escalável.
    - [ ] Mais otimizado.
    - [ ] Código TypeScript moderno.
    - [ ] Livre de HOC's e Field Compositions.
    - [ ] Possibilitará criação de testes unitários mais completos.
    - [ ] Nova metodologia de validações de campos(mais performático).
  - Contras
    - [ ] Tempo de criação.
    - [ ] Padrões e "segredos" podem ser deixados para trás.
    - [ ] Sem possibilidade de integração com um possível novo componente.
    - [ ] Não "integrável" com formas de validações atual.
- Vamos refazer do zero componentes Field's(Text, Number, Date, etc...)?
  - Prós
    - [ ] Código TypeScript moderno.
    - [ ] Livre de HOC's e Field Compositions.
    - [ ] Possibilitará criação de testes unitários mais completos.
    - [ ] Criação a partir do **composition pattern**.
  - Contras
    - [ ] Tempo de criação.
    - [ ] Padrões e "segredos" podem ser deixados para trás.
    - [ ] Sem possibilidade de integração com formulário antigo.
    - [ ] Não "integrável" com padrões definidos no linear-react-components-ui.

## Componentes

### Formulário

- Form
  - [ ] Deve ser possível validar os campos através de um schema de validação.
  - [ ] Deve ser possível obter os erros de validação que ocorrem durante o input de dados.
  - [ ] Deve ser possível exibir os erros na interface em tempo real para o usuário.
  - [ ] Deve ser possível obter uma variável informando em tempo real se o formulário é valido ou não.
  - [ ] Deve ser possível encaminhar erros externos ao formulário e serem exibidos para o usuário em tempo real.
  - [ ] Deve ser possível utilizar uma função callback para efetuar reset dos campos do formulário.
  - [ ] Deve ser possível efetuar ou não submit através de acessibilidade utilizando tecla <kbd>Enter</kbd>.
  - [ ] Deve ser possível obter uma variável com todos os dados em tempo real inseridos pelo usuário.
- TextField
  - [ ] Deve ser possível que esse componente siga todas as regras de estilização e padrões de animação presentes no **linear-react-components-ui**.
  - [ ] Deve ser possível integrar o componente ao formulário.
    - [ ] Erros.
    - [ ] Validações.
    - [ ] Callbacks.
  - [ ] Deve ser possível utilizar esse componente sem a necessidade de formulário.
  - [ ] Deve ser possível que esse componente aceite ser utilizado somente como **leitura**.
  - [ ] Deve ser possível que esse componente aceite elementos(div, span, svg, etc...) a sua direita e esquerda.
  - [ ] Deve ser possível que esse componente aceite um **hint** que se posiciona abaixo do input.
  - [ ] Deve ser possível que esse componente receba uma propriedade **permissionAttr** para validação de permissões de acesso.
