import './styles.scss';

import React from 'react';

const TablePage = () => {
  const listaTeste = new Array(1000).fill({}).map((_, index) => ({
    id: index + 1,
    nome: `Persona ${index + 1}`,
    idade: 99 + (index + 1),
    email: `teste.${index + 1}@teste.com`,
    empresa: `Empresa ${index + 1}`,
    cargo: `Cargo Lorem ipsum dolor ${index + 1}`,
  }));

  return (
    <React.Fragment>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Email</th>
              <th>Empresa</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {listaTeste.map((teste) => (
              <tr key={teste.id}>
                <td style={{ width: '128px' }}>{teste.nome}</td>
                <td style={{ width: '128px' }}>{teste.idade}</td>
                <td style={{ width: '256px' }}>{teste.email}</td>
                <td style={{ width: '192px' }}>{teste.empresa}</td>
                <td>{teste.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default TablePage;
