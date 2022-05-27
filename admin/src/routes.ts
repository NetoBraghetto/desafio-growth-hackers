import { views } from 'views';

export const routes = {
  home: { path: '/', title: process.env.REACT_APP_NAME, Handler: views.Home },
  categories: { path: '/categorias', title: `Categorias | ${process.env.REACT_APP_NAME}`, Handler: views.CategoriesList },
  categoriesView: { path: '/categorias/:id', title: `Categorias | ${process.env.REACT_APP_NAME}`, Handler: views.CategoriesView },
  e404: { path: '*', title: 'Página não encontrada', Handler: views.Error404 },
};
