import { SIGNUP, LOGIN } from "../actions/authA";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
