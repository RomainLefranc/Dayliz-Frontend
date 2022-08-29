import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import AppContainer from "./AppContainer";
import { TailwindProvider } from "tailwindcss-react-native";

export default App = () => {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </TailwindProvider>
  );
};
