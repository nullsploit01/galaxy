import { Fragment } from 'react/jsx-runtime';

import CanvasWrapper from '../../components/v1/CanvasWrapper';
import HelpPanel from '../../components/v1/HelpPanel';

const AppV1 = () => {
  return (
    <Fragment>
      <HelpPanel />
      <CanvasWrapper />
    </Fragment>
  );
};

export default AppV1;
