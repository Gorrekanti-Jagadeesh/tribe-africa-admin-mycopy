import { jsx as _jsx } from 'react/jsx-runtime';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './route-info';
const AppRoutes = () => {
  return _jsx(Routes, {
    children: appRoutes.map((route, index) => _jsx(Route, { path: route.path, element: route.element }, index)),
  });
};
export default AppRoutes;
