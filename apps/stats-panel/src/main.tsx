import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'design-system/design-system.css';
import 'ui-components/ui-components.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
