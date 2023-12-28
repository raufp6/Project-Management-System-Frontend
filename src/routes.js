import React from 'react'

// Admin Imports
import MainDashboard from './views/admin/default'
import Client from './views/admin/clients'
import AddClient from './views/admin/clients/addClient'
import Project from './views/admin/project'
import AddProject from './views/admin/project/AddProject'
import EditProject from './views/admin/project/EditProject'
import Staff from './views/admin/staff'
import EditStaff from './views/admin/staff/EditStaff'
import AddStaff from './views/admin/staff/AddStaff'
import Task from './views/admin/task/'
import AddTask from './views/admin/task/AddTask'
import EditTask from './views/admin/task/EditTask'
import TaskView from './views/admin/task/TaskView'
import TaskResources from './views/admin/task/components/Resources'
// import Profile from 'views/admin/profile'
// import DataTables from 'views/admin/tables'
// import RTLDefault from 'views/rtl/default'

// Auth Imports
// import SignIn from 'views/auth/SignIn'

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from 'react-icons/md'

import { HiOutlineUserGroup, HiOutlineBriefcase } from 'react-icons/hi'

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: 'Clients',
    layout: '/admin',
    path: 'client',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <Client />,
    secondary: true,
  },
  {
    name: 'Add Client',
    layout: '/admin',
    path: 'client/add/',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <AddClient />,
    secondary: true,
  },
  {
    name: 'Projects',
    layout: '/admin',
    path: 'project/',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <Project />,
    secondary: true,
  },
  {
    name: 'Add Projects',
    layout: '/admin',
    path: 'project/add/',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <AddProject />,
    secondary: true,
  },
  {
    name: 'Update Project',
    layout: '/admin',
    path: 'project/edit/:id',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <EditProject />,
    secondary: true,
  },
  {
    name: 'Staff',
    layout: '/admin',
    path: 'staff',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <Staff />,
    secondary: true,
  },
  {
    name: 'Add Staff',
    layout: '/admin',
    path: 'staff/add/',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <AddStaff />,
    secondary: true,
  },
  {
    name: 'Update Staff',
    layout: '/admin',
    path: 'staff/edit/:id',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <EditStaff />,
    secondary: true,
  },
  {
    name: 'Task',
    layout: '/admin',
    path: 'task/',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <Task />,
    secondary: true,
  },
  {
    name: 'Add Task',
    layout: '/admin',
    path: 'task/add/',
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
    component: <AddTask />,
    secondary: true,
  },
  {
    name: 'Update Task',
    layout: '/admin',
    path: 'task/edit/:id',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <EditTask />,
    secondary: true,
  },
  {
    name: 'Update Task',
    layout: '/admin',
    path: 'task/edit/:id/files/',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <TaskResources />,
    secondary: true,
  },
  {
    name: 'View Task',
    layout: '/admin',
    path: 'task/view/:id',
    icon: <HiOutlineBriefcase className="h-6 w-6" />,
    component: <TaskView />,
    secondary: true,
  },
]
export default routes
