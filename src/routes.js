import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL, BASENAME } from './config/constant';

const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes basename={BASENAME}>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export const routes = [
  {
    path: '/',
    element: lazy(() => import('./views/Home/Home'))
  },
  {
    path: '/login',
    element: lazy(() => import('./views/auth/Login'))
  },
  {
    path: '/register',
    element: lazy(() => import('./views/auth/Register'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        path: '/dashboard',
        element: lazy(() => import('./views/dashboard/index'))
      },
      {
        path: '/registation/university',
        element: lazy(() => import('./views/Registation/University'))
      },
      {
        path: '/registation/major',
        element: lazy(() => import('./views/Registation/Major'))
      },
      {
        path: '/registation/hobby',
        element: lazy(() => import('./views/Registation/Hobby'))
      },
      {
        path: '/management/member',
        element: lazy(() => import('./views/Management/Member/Member'))
      },
      {
        path: '/management/package',
        element: lazy(() => import('./views/Management/Package/Package'))
      },
      {
        path: '*',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default renderRoutes;
