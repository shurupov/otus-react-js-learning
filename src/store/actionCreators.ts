import { actionTypes } from "store/reducer";
import {AnyAction} from "redux";

export const initField = () => {
  return {
    type: actionTypes.INIT_FIELD,
  };
};

export const initFieldPerformed = () => {
  return {
    type: actionTypes.INIT_FIELD_PERFORMED,
  };
};

export const changeSetting = (action: AnyAction) => {
  return {
    ...action,
    type: actionTypes.CHANGE_SETTING,
  };
};

export const sagaChangeSetting = (settingName: string, value: number) => {
  return {
    type: actionTypes.SAGA_CHANGE_SETTING,
    payload: {
      field: settingName,
      value,
    },
  };
};