import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const LinkedAccounts = Loadable(lazy(() => import('views/LinkedAccounts')));
const MyNetwork = Loadable(lazy(() => import('views/MyNetwork')));
const ImportMethod = Loadable(lazy(() => import('views/Lead/component/ImportMethod')));
const ExtractLead = Loadable(lazy(() => import('views/Lead/component/ExtractLead')));
const ViewLeadList = Loadable(lazy(() => import('views/Lead/component/ViewLeadList')));
const Campaign = Loadable(lazy(() => import('views/Caimpaign/index')));
const CreateCampaign = Loadable(lazy(() => import('views/Caimpaign/component/CreateCampaign')));
const ViewCampaign = Loadable(lazy(() => import('views/Caimpaign/component/ViewCampaign')));
const ImportLeads = Loadable(lazy(() => import('views/Lead/component/ImportLeads')));
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
      path: '/lead/importType',
      element: <ImportMethod />
    },
    {
      path: '/lead/add/:type',
      element: <ExtractLead />
    },
    {
      path: '/lead/importleads/:id',
      element: <ImportLeads />
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
