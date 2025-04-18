import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const LinkedAccounts = Loadable(lazy(() => import('views/LinkedAccounts')));
const MyNetwork = Loadable(lazy(() => import('views/MyNetwork')));
const AddLead = Loadable(lazy(() => import('views/Lead/AddLead/AddLead')));
const ExtractLead = Loadable(lazy(() => import('views/Lead/AddLead/ExtractLead')));
const ViewLeadList = Loadable(lazy(() => import('views/Lead/ViewList')));
const Campaign = Loadable(lazy(() => import('views/Caimpaign/index')));
const CreateCampaign = Loadable(lazy(() => import('views/Caimpaign/component/CreateCampaign')));
const ViewCampaign = Loadable(lazy(() => import('views/Caimpaign/component/ViewCampaign')));
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
      path: '/lead/add/:type',
      element: <ExtractLead />
    },
    {
      path: '/lead/list/:id',
      element: <ViewLeadList />
    },
    {
      path: '/campaigns',
      element: <Campaign />
    },
    {
      path: '/campaigns/create',
      element: <CreateCampaign />
    },
    {
      path: '/campaigns/viewcampaign/:id',
      element: <ViewCampaign />
    },
    {
      path: '/my-network',
      element: <MyNetwork />
    },
    {
      path: '/unibox',
      element: <MyNetwork />
    }
  ]
};

export default MainRoutes;
