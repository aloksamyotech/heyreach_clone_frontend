import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import TelegramIcon from '@mui/icons-material/Telegram';
import SmsIcon from '@mui/icons-material/Sms';
// constant
const icons = {
  LinkedInIcon,
  DashboardIcon,
  AccountCircleIcon,
  Diversity2Icon,
  TelegramIcon,
  SmsIcon
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
      title: 'Leads',
      type: 'item',
      url: '/lead',
      icon: icons.AccountCircleIcon,
      breadcrumbs: false
    },
    {
      id: 'mynetwork',
      title: 'My Network',
      type: 'item',
      url: '/my-network',
      icon: icons.Diversity2Icon,
      breadcrumbs: false
    },
    {
      id: 'campaigns',
      title: 'Campaigns',
      type: 'item',
      url: '/campaigns',
      icon: icons.TelegramIcon,
      breadcrumbs: false
    },
    {
      id: 'unibox',
      title: 'Unibox',
      type: 'item',
      url: '/unibox',
      icon: icons.SmsIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
