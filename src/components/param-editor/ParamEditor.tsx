import styles from './ParamEditor.module.scss';

import React from 'react';

/**
 * Возможные типы значения параметра товара
 */
type ParamEditorValue = 'string' | 'number' | 'boolean' | 'date' | 'string[]';

/**
 * Параметр товара
 */
export interface Param {
  id: number;
  name: string;
  type: 'string';
}

/**
 * Значение параметра товара
 */
interface ParamValue {
  paramId: number;
  value: string;
}

/**
 * Цвет
 */
interface Color {
  color: string;
}

/**
 * Товар
 */
export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

/**
 * Пропсы для ParamEditor
 */
interface Props {
  params: Param[];
  model: Model;
}

/**
 * Состояние ParamEditor
 */
interface State {
  paramValues: ParamValue[];
}

/**
 * Пропсы для ParamLabel
 */
interface ParamLabelProps {
  label: string;
  onClick(): void;
}

/**
 * Пропсы для ParamFormField
 */
interface ParamFormFieldProps {
  type: ParamEditorValue;
  paramValue: ParamValue;
  onChangeValue: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps<T extends ParamEditorValue> {
  id: number;
  value: T;
  onChangeValue: (id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Текстовое поле
 */
class InputText extends React.Component<InputProps<'string'>> {
  constructor(props: InputProps<'string'>) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <input
        type="text"
        className={styles['param-input']}
        value={this.props.value}
        onChange={(e) => this.props.onChangeValue(this.props.id, e)}
      />
    );
  }
}

/**
 * Имя параметра товара
 */
class ParamLabel extends React.Component<ParamLabelProps> {
  constructor(props: ParamLabelProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <label className={styles['param-label']} onClick={this.props.onClick}>
        {this.props.label}
      </label>
    );
  }
}

/**
 * Используемый input в зависимости от типа значения параметра
 */
class ParamFormField extends React.Component<ParamFormFieldProps> {
  constructor(props: ParamFormFieldProps) {
    super(props);
  }

  inputByType = (type: ParamEditorValue) => {
    switch (type) {
      case 'string':
        return (
          <InputText
            id={this.props.paramValue.paramId}
            value={this.props.paramValue.value as 'string'}
            onChangeValue={this.props.onChangeValue}
          />
        );
      // other inputs
    }
  };

  render(): React.ReactNode {
    return this.inputByType(this.props.type);
  }
}

/**
 * Форма редактирования параметров
 */
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: this.props.model.paramValues,
    };
  }

  public getModel(): Model {
    const currentModel = {
      paramValues: this.state.paramValues,
      colors: [],
    };

    console.log(currentModel);

    return currentModel;
  }

  handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;

    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === id ? { paramId: pv.paramId, value: value } : pv,
      ),
    }));
  };

  render(): React.ReactNode {
    return (
      <form className={styles['param-editor']}>
        {this.state.paramValues.map((item, index) => {
          const param = this.props.params[index];
          return (
            <div key={item.paramId} className={styles['param-editor-item']}>
              <ParamLabel label={param.name} onClick={this.getModel.bind(this)} />
              <ParamFormField
                type={param.type}
                paramValue={item}
                onChangeValue={this.handleChange.bind(this)}
              />
            </div>
          );
        })}
      </form>
    );
  }
}

export default ParamEditor;
