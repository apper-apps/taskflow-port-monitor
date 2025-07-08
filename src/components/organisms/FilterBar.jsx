import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({ onFilterChange, filters = {} }) => {
  const [activeFilters, setActiveFilters] = useState({
    priority: filters.priority || '',
    showCompleted: filters.showCompleted ?? true,
    sortBy: filters.sortBy || 'dueDate'
  })

  const priorities = [
    { value: 'urgent', label: 'Urgent', color: 'urgent' },
    { value: 'high', label: 'High', color: 'high' },
    { value: 'medium', label: 'Medium', color: 'medium' },
    { value: 'low', label: 'Low', color: 'low' }
  ]

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { value: 'priority', label: 'Priority', icon: 'AlertTriangle' },
    { value: 'created', label: 'Created', icon: 'Clock' }
  ]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      priority: '',
      showCompleted: true,
      sortBy: 'dueDate'
    }
    setActiveFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = activeFilters.priority || !activeFilters.showCompleted

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Priority:</span>
          <div className="flex gap-1">
            <Button
              variant={activeFilters.priority === '' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange('priority', '')}
            >
              All
            </Button>
            {priorities.map((priority) => (
              <Button
                key={priority.value}
                variant={activeFilters.priority === priority.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleFilterChange('priority', priority.value)}
              >
                <Badge variant={priority.color} size="sm">
                  {priority.label}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Show Completed Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={activeFilters.showCompleted ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleFilterChange('showCompleted', !activeFilters.showCompleted)}
          >
            <ApperIcon name={activeFilters.showCompleted ? 'Eye' : 'EyeOff'} size={16} className="mr-2" />
            {activeFilters.showCompleted ? 'Hide' : 'Show'} Completed
          </Button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.sortBy === option.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleFilterChange('sortBy', option.value)}
              >
                <ApperIcon name={option.icon} size={16} className="mr-2" />
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={clearFilters}
          >
            <ApperIcon name="X" size={16} className="mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default FilterBar