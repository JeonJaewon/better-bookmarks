import { createRoot } from 'react-dom/client';
import { AppProvider } from '@src/providers/AppProvider';
import Popup from './Popup';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <AppProvider>
    <Popup />
  </AppProvider>,
);
