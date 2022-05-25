// import { Fragment, useLayoutEffect, useState} from 'react';
import Logo from 'assets/images/logo-gh.png';
// import { UserModel } from 'services/UserService';
// import AuthService from 'services/AuthService';
// import { Route } from 'helpers/Route';
// import { Button, Nav, Spinner } from 'react-bootstrap';
// import { Redirect } from 'helpers/Redirect';

import { Outlet } from 'react-router';

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
        <aside className="default-layout-aside text-white">
          <div className="default-layout-aside-logo">
            <a href="/" className="default-layout-topbar-logo">
              <img
                className="img-fluid"
                src={Logo}
                width="160"
                // height="23"
                alt="Growth Hackers"
              />
            </a>
          </div>
          {/* <div className="default-layout-aside-menu">{renderAsideMenu()}</div> */}
        </aside>
        <main className="default-layout-main">
          <div className="default-layout-main-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
