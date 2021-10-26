import Main from '../pages/Main/Main';
import Details from '../pages/Details/Details';

export const routes = [
  { path: '/main', Component: Main, exact: true },
  { path: '/in/:cityURL', Component: Details, exact: true },
];
