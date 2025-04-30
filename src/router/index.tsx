import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

const App = lazy(() => import('../pages/app'));
const AppV1 = lazy(() => import('../pages/v1'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/v1',
    element: <AppV1 />,
  },
  {
    path: '*',
    element: (
      <div>
        <p
          style={{
            color: 'red',
            placeContent: 'center',
            placeItems: 'center',
            display: 'flex',
            height: '100vh',
          }}
        >
          404 Not found
        </p>
      </div>
    ),
  },
]);
