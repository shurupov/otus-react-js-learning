import React, { MouseEventHandler } from "react";
import { StoreState, store, ConwaySettings } from "store/store";
import { Dispatch, Unsubscribe } from "redux";
import { connect } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

interface ControlsFormProps extends ConwaySettings {
  changeSetting: Function;
  update: MouseEventHandler;
}

export class ControlsForm extends React.Component<ControlsFormProps> {
  private unsubscribe!: Unsubscribe;

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (fieldName: string) => (event: React.FormEvent) => {
    const target = event.target as HTMLFormElement;
    if (target.value === "") {
      return;
    }
    const value: number = parseFloat(target.value);
    this.props.changeSetting(fieldName, value);
  };

  render() {
    return (
      <form
        style={{
          clear: "both",
        }}
      >
        <br />
        <label>
          По горизонтали:
          <input
            type="number"
            value={this.props.fieldWidth.toString()}
            onChange={this.handleChange("fieldWidth")}
          />
        </label>
        <br />
        <label>
          По вертикали:
          <input
            type="number"
            value={this.props.fieldHeight.toString()}
            onChange={this.handleChange("fieldHeight")}
          />
        </label>
        <br />
        <label>
          Размер клетки:
          <input
            type="number"
            value={this.props.cellSize.toString()}
            onChange={this.handleChange("cellSize")}
          />
        </label>
        <br />
        <label>
          Задержка анимации:
          <input
            type="number"
            value={this.props.animationDelay.toString()}
            onChange={this.handleChange("animationDelay")}
          />
        </label>
        <br />
        <label>
          Процент живых клеток:
          <input
            type="number"
            value={this.props.alivePercent.toString()}
            onChange={this.handleChange("alivePercent")}
          />
        </label>
        <br />
        <label>
          Количество шагов анимации:
          <input
            type="number"
            value={this.props.animationStepsCount.toString()}
            onChange={this.handleChange("animationStepsCount")}
          />
        </label>
        <br />
        <input type="button" value="Обновить" onClick={this.props.update} />
      </form>
    );
  }
}

export const conwaySlice = createSlice({
  name: "conway",
  initialState: {
    fieldWidth: 20,
    fieldHeight: 20,
    cellSize: 10,
    animationDelay: 50,
    alivePercent: 30,
    animationStepsCount: 4,
    reinitField: false,
    initialized: false,
  },
  reducers: {
    initField: (state) => {
      state.reinitField = true;
      return state;
    },
    updated: (state) => {
      state.reinitField = false;
      return state;
    },
    changeSetting: (state, action) => {
      if (!action.payload || !action.payload.value) {
        return state;
      }
      if (action.payload.field) {
        const fieldName = action.payload.field;
        state[fieldName] = action.payload.value;
        state.reinitField =
          fieldName === "fieldHeight" ||
          fieldName === "fieldWidth" ||
          fieldName === "alivePercent";
        return state;
      }
      return state;
    },
  },
});

const mapStateToProps = ({ conway }: StoreState) => {
  return conway;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeSetting: (fieldName: string, value: number) => {
      dispatch(conwaySlice.actions.changeSetting({ field: fieldName, value }));
    },
    update: () => {
      dispatch(conwaySlice.actions.initField());
    },
  };
};

export const ConnectedControlsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsForm);
