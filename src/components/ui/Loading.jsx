import ApperIcon from '@/components/ApperIcon'

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <ApperIcon 
          name="Clock" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" 
          size={24} 
        />
      </div>
      <p className="text-gray-600 mt-4 font-medium">{message}</p>
    </div>
  )
}

export default Loading