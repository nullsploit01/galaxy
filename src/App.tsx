import { Fragment } from 'react/jsx-runtime';

import CanvasWrapper from './components/CanvasWrapper';
import HelpPanel from './components/HelpPanel';

const App = () => {
  return (
    <Fragment>
      <HelpPanel />
      <CanvasWrapper />
    </Fragment>
  );
};

export default App;
