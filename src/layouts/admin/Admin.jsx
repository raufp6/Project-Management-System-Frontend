import React,{useContext} from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import SidebarEmplyee from '../../components/sidebar/SidebarEmplyee'
import SidebarClient from '../../components/sidebar/SidebarClient.jsx'
import SidebarV2 from '../../components/sidebar/SidebarV2'
import Overlay from '../../components/overlay'
import Navbar from '../../components/navbar'
import HeaderOne from '../../components/header/HeaderOne'
import Dashboard from "../../views/admin/default"
import { isAdmin,isClient,isDeveloper } from '../../utils/Permission.jsx'
import routes from '../../routes.js'
import AuthContext from '../../context/AuthContext'

function Admin() {
  const {user} = useContext(AuthContext)
  const overlay = false;
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.path} element={prop.component} />
      }
    })
  }

  const [sidebar, setSidebar] = React.useState(true)
  // const [theme, setTheme] = React.useState(
  //   localStorage.getItem('theme') === '' || localStorage.getItem('theme')
  //     ? localStorage.getItem('theme')
  //     : ''
  // )
  const setSideBar = (user)=>{
    if(isClient(user.groups[0])){
      return <SidebarClient handleActive={() => setSidebar(!sidebar)} />
    }else if(isDeveloper(user.group)){
        return <SidebarEmplyee handleActive={() => setSidebar(!sidebar)} />
    }else{
      return <Sidebar handleActive={() => setSidebar(!sidebar)} />
    }
  }
  return (
    <div
      className={`layout-wrapper ${sidebar && 'active'}  w-full `}
      style={{
        borderColor: '#2a313c',
      }}
    >
      <div className="relative flex w-full">
        {setSideBar(user)}
        {/* <Sidebar handleActive={() => setSidebar(!sidebar)} /> */}
        {overlay ? overlay : <Overlay />}
        <SidebarV2 />
        <div className="body-wrapper flex-1 overflow-x-hidden">
          <HeaderOne />
          <Routes>
            {getRoutes(routes)}
            <Route
              path="/"
              element={<Navigate to="/admin/default" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
