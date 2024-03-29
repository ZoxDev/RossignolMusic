import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RossignolView from './views/RossignolView';

import './styles/App.styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#F8FAFC] dark:bg-[#0a1122] w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex gap-5 justify-center items-center">
          <h1 className="text-bold text-2xl">Rossignol</h1>
          <img src="/BIRD.svg" />
        </div>
        <section className="app">
          <RossignolView />
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
