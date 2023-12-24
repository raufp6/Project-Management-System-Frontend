import React from 'react'
import DashboardCount from '../../../components/widget/DashboardCount'
function Dashboard() {
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <DashboardCount />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
