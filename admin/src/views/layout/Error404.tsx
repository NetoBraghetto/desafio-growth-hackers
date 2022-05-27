import Ilustration from 'assets/images/undraw-not-found.svg';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

export function Error404() {
  return (
    <div className="d-flex flex-column align-items-center gap-4 py-4 px-4">
      <div className="display-1 mb-4">404</div>
      <div className="h3 mb-4">Ops, não encontramos a página que você esta procurando</div>
      <Link className="mb-4 btn btn-primary" to={routes.home.path}>Voltar para a página inicial</Link>
      <img src={Ilustration} width="480" height="333" alt="Página não encontrada" />
    </div>
  );
}
