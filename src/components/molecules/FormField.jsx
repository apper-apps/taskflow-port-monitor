import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Select from '@/components/atoms/Select'

const FormField = ({ 
  label, 
  type = 'text', 
  required = false, 
  error, 
  children,
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return <Textarea error={!!error} {...props} />
      case 'select':
        return <Select error={!!error} {...props}>{children}</Select>
      default:
        return <Input type={type} error={!!error} {...props} />
    }
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={props.id} required={required}>
        {label}
      </Label>
      {renderInput()}
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  )
}

export default FormField