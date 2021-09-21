import React from "react";

AuthReducer = (prevState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGNOUT":
      return {
        ...prevState,
        userToken: null,
        isLoading: false,
      };
    case "RETRIEVE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
  }
};
const [state, dispatch] = React.useReducer(AuthReducer, {
  isLoading: true,
  userToken: null,
});
