import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import AppContainer from "./AppContainer";

export default App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
