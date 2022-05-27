import { Link } from 'react-router-dom';
import { BsFillTagsFill } from 'react-icons/bs';
import { Nav } from 'react-bootstrap';
import { routes } from 'routes';

export function Sidebar() {
  return (
    <aside className="default-layout-aside text-white">
      <div className="default-layout-aside-logo">
        <Link to={routes.home.path} className="default-layout-logo">
          <span>
            <strong>Growth</strong>
            {' '}
            Hackers
          </span>
        </Link>
      </div>
      <div className="default-layout-aside-menu">
        <nav className="sidebar-nav">
          <ul className="aside-ul-section list-unstyled">
            <li className="aside-li-section">
              <strong className="aside-li-section-name">Menu</strong>
              <Nav className="flex-column mb-auto" variant="pills">
                <Nav.Item>
                  <Link className="aside-link nav-link" to={routes.categories.path}>
                    <BsFillTagsFill />
                    <span className="aside-link-text">Categorias</span>
                  </Link>
                </Nav.Item>
              </Nav>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
