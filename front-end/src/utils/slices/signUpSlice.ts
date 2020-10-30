import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signup } from "../../assets";

interface StateIndexSignature {
  password: string;
  passwordConfirmation: string;
}

const initialState: StateIndexSignature = {
  password: "",
  passwordConfirmation: "",
};

interface PayloadType {
  name: string;
  value: string;
}

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    onTextChanged: {
      reducer(state, action: PayloadAction<PayloadType>) {
        let payload: PayloadType = action.payload;
        let name: string = payload.name;
        let value: string = payload.value;

        return { ...state, [name]: value };
      },
      prepare(name: string, value: string) {
        return {
          payload: {
            name: name,
            value: value,
          },
        };
      },
    },
  },
});

export const { onTextChanged } = signUpSlice.actions;
export default signUpSlice.reducer;
