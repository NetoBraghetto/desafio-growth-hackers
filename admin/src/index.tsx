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
import { Home } from 'views/Home';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route
            path={routes.customerList.path}
            element={<routes.customerList.Handler />}
          />
          <Route
            path={routes.register.path}
            element={<routes.register.Handler />}
          />
          <Route
            path={routes.customerEdit.path}
            element={<routes.customerEdit.Handler />}
          /> */}
        </Route>
        {/* <Route path={routes._404.path} element={<routes._404.Handler />} /> */}
      </Routes>
    </HistoryRouter>
  </React.StrictMode>,
);
