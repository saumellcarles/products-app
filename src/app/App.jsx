import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter.jsx';
import { AppProviders } from './providers/AppProviders.jsx';
import { THEME_CONFIG } from '../shared/constants/theme.js';

export function App() {
  return (
    <Theme {...THEME_CONFIG}>
      <BrowserRouter>
        <AppProviders>
          <AppRouter />
        </AppProviders>
      </BrowserRouter>
    </Theme>
  );
}
