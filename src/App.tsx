import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RossignolView from "./views/RossignolView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RossignolView />
    </QueryClientProvider>
  );
}

export default App;
