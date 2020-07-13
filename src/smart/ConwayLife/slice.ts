import { createSlice } from "@reduxjs/toolkit";

export const conwaySettingsSlice = createSlice({
  name: "conwaySettings",
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
      if (action.payload.field && action.payload.value) {
        const fieldName = action.payload.field;
        return {
          ...state,
          [fieldName]: action.payload.value,
        };
      }
      return state;
    },
  },
});

export const conwayFieldSlice = createSlice({
  name: "conwayField",
  initialState: [],
  reducers: {
    update: (state, action) => {
      return action.payload;
    },
  },
});