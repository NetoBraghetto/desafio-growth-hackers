import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="default-layout-aside-menu">
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link className="sidebar-list-link" to="/como-funciona">
              Como funciona
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link className="sidebar-list-link" to="/privacidade">
              Privacidade
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Link className="sidebar-list-link" to="/ajuda">
              Ajuda
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
