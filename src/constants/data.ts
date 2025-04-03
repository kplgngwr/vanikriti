import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  name: string;
  region: string;
  score: number;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'dashboard'
  },
  {
    title: 'Plants',
    href: '/dashboard/plants',
    icon: 'Plant',
    label: 'plants'
  },
  {
    title: 'Caring',
    href: '/dashboard/caring',
    icon: 'Caring',
    label: 'caring'
  },
  {
    title: 'Package',
    href: '/dashboard/package',
    icon: 'Package',
    label: 'package'
  },
  {
    title: 'Inventory',
    href: '/dashboard/inventory',
    icon: 'Inventory',
    label: 'inventory'
  },
  {
    title: 'Soil Data',
    href: '/dashboard/soil-data',
    icon: 'SoilData',
    label: 'soil-data'
  },
  {
    title: 'Plantation',
    href: '/dashboard/plantation',
    icon: 'map',
    label: 'plantation'
  },
  {
    title: 'Plantarium',
    href: '/dashboard/plantarium',
    icon: 'Plantarium',
    label: 'plantarium'
  },
  {
    title: 'History',
    href: '/dashboard/history',
    icon: 'history',
    label: 'history'
  },
  {
    title: 'Community',
    href: '/dashboard/community',
    icon: 'community',
    label: 'community'
  },
  {
    title: 'Plants Insurance',
    href: '/dashboard/plants-insurance',
    icon: 'Insurance',
    label: 'plants-insurance'
  },
  {
    title: 'Rewards',
    href: '/dashboard/rewards',
    icon: 'Rewards',
    label: 'rewards'
  },
  {
    title: 'Ranking',
    href: '/dashboard/rankings',
    icon: 'Ranking',
    label: 'rankings'
  },
  {
    title: 'Livestream',
    href: '/dashboard/livestream',
    icon: 'Livestream',
    label: 'livestream'
  }
];
