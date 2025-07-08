import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/tasks':
        return 'All Tasks'
      case '/settings':
        return 'Settings'
      default:
        if (location.pathname.startsWith('/tasks/')) {
          return 'Category Tasks'
        }
        return 'TaskFlow'
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Handle search functionality here
    console.log('Searching for:', query)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Logo */}
          <div className="flex items-center gap-4 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          {/* Desktop Page Title */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search tasks..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
            >
              <ApperIcon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
            >
              <ApperIcon name="User" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header