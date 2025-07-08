import { format } from 'date-fns'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const DatePicker = ({ value, onChange, label, required = false }) => {
  const handleDateChange = (e) => {
    onChange(e.target.value || null)
  }

  const handleClear = () => {
    onChange(null)
  }

  const formatDisplayDate = (dateString) => {
    if (!dateString) return ''
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <Input
          type="date"
          value={value || ''}
          onChange={handleDateChange}
          className="pr-10"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <ApperIcon name="X" size={16} />
          </Button>
        )}
      </div>
      {value && (
        <p className="text-sm text-gray-500">
          Due: {formatDisplayDate(value)}
        </p>
      )}
    </div>
  )
}

export default DatePicker