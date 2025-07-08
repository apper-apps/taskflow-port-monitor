import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const PrioritySelector = ({ value, onChange, showLabel = true }) => {
  const [isOpen, setIsOpen] = useState(false)

  const priorities = [
    { value: 'low', label: 'Low', color: 'low' },
    { value: 'medium', label: 'Medium', color: 'medium' },
    { value: 'high', label: 'High', color: 'high' },
    { value: 'urgent', label: 'Urgent', color: 'urgent' }
  ]

  const selectedPriority = priorities.find(p => p.value === value) || priorities[0]

  const handleSelect = (priority) => {
    onChange(priority.value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Priority
        </label>
      )}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between border-2 border-gray-200 hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <Badge variant={selectedPriority.color} size="sm">
            {selectedPriority.label}
          </Badge>
        </div>
        <ApperIcon name="ChevronDown" size={16} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {priorities.map((priority) => (
            <button
              key={priority.value}
              type="button"
              onClick={() => handleSelect(priority)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
            >
              <Badge variant={priority.color} size="sm">
                {priority.label}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PrioritySelector