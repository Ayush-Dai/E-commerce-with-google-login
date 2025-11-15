import { useState } from "react"
import Sidebar from "@/Components/Admin/Sidebar"
import { Outlet } from "react-router-dom"
//this is the again change made in  the dev  branch

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 cursor-pointer">
     
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 cursor-pointer">
       
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto cursor-pointer">
            {/* <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1> */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
