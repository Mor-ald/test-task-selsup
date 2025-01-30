import ParamEditor, { Model, Param } from './components/param-editor/ParamEditor';

import React, { ReactNode } from 'react';

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
  colors: [],
};

class App extends React.Component {
  render(): ReactNode {
    return (
      <>
        <h1>Редактор параметров</h1>
        <ParamEditor params={params} model={model} />
      </>
    );
  }
}

export default App;
