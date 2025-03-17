import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const LinkedAccounts = Loadable(lazy(() => import('views/LinkedAccounts')));
const MyNetwork = Loadable(lazy(() => import('views/MyNetwork')));
const AddLead = Loadable(lazy(() => import('views/Lead/AddLead')));
const ExtractLead = Loadable(lazy(() => import('views/Lead/ExtractLead')));
const Campaign = Loadable(lazy(() => import('views/Caimpaign/Campaign')));
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
      path: '/lead/add',
      element: <AddLead />
    },
    {
      path: '/lead/add/extractLead',
      element: <ExtractLead />
    },
    {
      path: '/my-network',
      element: <MyNetwork />
    },
    {
      path: '/campaigns',
      element: <Campaign />
    },
    {
      path: '/unibox',
      element: <MyNetwork />
    }
  ]
};

export default MainRoutes;
