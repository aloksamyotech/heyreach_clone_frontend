// assets
import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
} from '@tabler/icons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// constant
const icons = {
  LinkedInIcon,
  DashboardIcon,
  AccountCircleIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardIcon,
      breadcrumbs: false
    },
    {
      id: 'linkedIn',
      title: 'LinkedIn Accounts',
      type: 'item',
      url: '/linked-accounts',
      icon: icons.LinkedInIcon,
      breadcrumbs: false
    },
    {
      id: 'lead',
      title: 'Lead Management',
      type: 'item',
      url: '/lead',
      icon: icons.AccountCircleIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
