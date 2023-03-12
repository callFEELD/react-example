import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from './routes/RootPage';
import StationPage from './routes/StationPage';
import ErrorPage from './routes/ErrorPage';
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path: "/station/:stationId",
    element: <StationPage />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
