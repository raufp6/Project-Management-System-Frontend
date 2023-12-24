import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/navbar'
import routes from '../../routes.js'
function Admin() {

  const getRoutes = (routes)=>{

    return routes.map((prop,key)=>{
      if (prop.layout === "/admin") {
        return <Route path={prop.path} element={prop.component} />
      }
    });

  };

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {/* {getRoutes(routes)} */}
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">{/* <Footer /> */}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Admin