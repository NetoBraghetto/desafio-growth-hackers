// import { Fragment, useLayoutEffect, useState} from 'react';
// import { UserModel } from 'services/UserService';
// import AuthService from 'services/AuthService';
// import { Route } from 'helpers/Route';
// import { Button, Nav, Spinner } from 'react-bootstrap';
// import { Redirect } from 'helpers/Redirect';

import { Toasts } from 'components/Toasts';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  // const [user, setUser] = useState<UserModel>({
  //     abilities: []
  // });
  // const [loading, setLoading] = useState<boolean>(false);

  // useLayoutEffect(() => {
  //     AuthService.me().then(() => {
  //         setUser(AuthService.getUser());
  //     });
  // }, []);

  // function logout() {
  //     setLoading(true);
  //     AuthService.logout().then(() => {
  //         setLoading(false);
  //         Redirect(Route('login'));
  //     });
  // };
  return (
    <div className="default-layout">
      <div className="default-layout-content">
        <Sidebar />
        <main className="default-layout-main">
          <div className="default-layout-main-content">
            <Outlet />
          </div>
        </main>
      </div>
      <Toasts />
    </div>
  );
}
