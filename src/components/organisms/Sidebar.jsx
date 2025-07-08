import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import CategoryList from '@/components/organisms/CategoryList'

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: 'LayoutDashboard',
      exact: true
    },
    {
      name: 'All Tasks',
      path: '/tasks',
      icon: 'CheckSquare'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'Settings'
    }
  ]

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                }`
              }
              end={item.exact}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8">
          <CategoryList />
        </div>
      </nav>
    </div>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleMobile}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-50 lg:hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="text-white" size={20} />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                </div>
                <button
                  onClick={toggleMobile}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
            </div>

            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                      }`
                    }
                    end={item.exact}
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </div>

              <div className="mt-8">
                <CategoryList onCategoryClick={toggleMobile} />
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSidebar />
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobile}
          className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md lg:hidden"
        >
          <ApperIcon name="Menu" size={20} />
        </button>
      </div>
    </>
  )
}

export default Sidebar