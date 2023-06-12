import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./recoilTodo";
import { RecoilRoot } from "recoil";
function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
