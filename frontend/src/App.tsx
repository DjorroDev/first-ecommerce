import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { Provider } from "react-redux";
import store from "./app/store";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
