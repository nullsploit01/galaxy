import App from '../pages/app';
import AppV1 from '../pages/v1';
import { createBrowserRouter } from 'react-router';

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
