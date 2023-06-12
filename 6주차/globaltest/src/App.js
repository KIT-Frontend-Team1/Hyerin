import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./adapters/router";
import UserContextProvider from "./store/3_context";
function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
