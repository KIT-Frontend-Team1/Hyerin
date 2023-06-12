import "./App.css";
import Layout from "./components/Layout";
import MainPage from "./pages/main/_";
import TodoPage from "./pages/todo";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./routes/routing";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/global";
import { useState } from "react";
import { TodoContext } from "context/todo";
import { TodoContextProvider } from "context/todo";
import AuthProvider from "context/auth.ctx";
function App() {
  return (
    <TodoContextProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </TodoContextProvider>

    //     <BrowserRouter>
    //     {/* HTML5를 지원하느 브라우저의  URL의 변화를 감지*/}
    //     <Routes>
    //     {/** 하위에 있는 Route 컴포넌트 중 url과 path가 일치하는 컴포넌트만 보여주는 역할*/}
    //       <Route element={<Layout/>}>
    //         <Route path='/' element={<MainPage/>} />
    //         <Route path='/todo/:todoId' element={<TodoPage/>} />
    //       </Route>
    //     </Routes>
    //     </BrowserRouter>
    // /*
    // BrowserRouter (URL 감지) -> Routes(하위에 route 중에 경로에 맞는 컴포넌트 보여주는 역할)
    // outlet --> routes에 의해 가지고와진 컴포넌트를 outlet으로 가지고올 수 있음
  );
}
export default App;
