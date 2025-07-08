import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No items found",
  description = "Get started by adding your first item",
  action,
  actionLabel = "Add Item",
  icon = "Plus"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={48} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button onClick={action} variant="primary" className="px-8">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty