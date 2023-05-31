import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import 'swiper/css';
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
     // If this mutation has an onError defined, skip this
     if (mutation.options.onError) return;

     // any error handling code...
     console.error(error);
  }
});

const queryCache = new QueryCache({
  onError: (error, _query) => {
     console.log(error);
  }
})


const queryClient = new QueryClient({
  defaultOptions: {
     queries: {
        refetchOnWindowFocus: false,
     },
  },
  mutationCache,
  queryCache,
});


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
    <QueryClientProvider client={queryClient}>
      <Layout>
      <App />
      </Layout>
    
        </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

