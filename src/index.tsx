import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";

const store = setupStore();

const jsx = (
  <Provider store={store}>
    <ChakraProvider resetCSS>
      <App />
    </ChakraProvider>
  </Provider>
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(jsx);
