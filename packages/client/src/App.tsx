import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RossignolView from './views/RossignolView';

import './styles/App.styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div className="logo">
          <h1 className="quicksand-bold">Rossignol</h1>
          <img src="../public/BIRD.svg"></img>
        </div>
        <section className="app">
          <RossignolView />
        </section>
      </main>
    </QueryClientProvider>
  );
}

export default App;
