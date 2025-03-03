import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const LinkedAccounts = Loadable(lazy(() => import('views/LinkedAccounts')));
const MyNetwork = Loadable(lazy(() => import('views/MyNetwork')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/linked-accounts',
      element: <LinkedAccounts />
    },
    {
      path: '/lead',
      element: <LeadManagement />
    },
    {
      path: '/my-network',
      element: <MyNetwork />
    },
    {
      path: '/campaigns',
      element: <MyNetwork />
    },
    {
      path: '/unibox',
      element: <MyNetwork />
    }
  ]
};

export default MainRoutes;
