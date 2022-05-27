import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { routes } from 'routes';
import { AppLayout } from 'views/layout/AppLayout';
import 'assets/scss/app.scss';
import { routes } from 'routes';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={routes.home.path} element={<routes.home.Handler />} />
          <Route path={routes.categories.path} element={<routes.categories.Handler />} />
          <Route path={routes.categoriesView.path} element={<routes.categoriesView.Handler />} />
        </Route>
        <Route path={routes.e404.path} element={<routes.e404.Handler />} />
      </Routes>
    </HistoryRouter>
  </React.StrictMode>,
);
