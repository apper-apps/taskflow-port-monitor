import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import ApperIcon from '@/components/ApperIcon'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoDelete: false,
    defaultPriority: 'medium',
    language: 'en'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('taskflow-settings', JSON.stringify(settings))
    toast.success('Settings saved successfully!')
  }

  const handleReset = () => {
    const defaultSettings = {
      notifications: true,
      darkMode: false,
      autoDelete: false,
      defaultPriority: 'medium',
      language: 'en'
    }
    setSettings(defaultSettings)
    toast.info('Settings reset to default values')
  }

  const settingSections = [
    {
      title: 'Notifications',
      icon: 'Bell',
      settings: [
        {
          key: 'notifications',
          label: 'Enable Notifications',
          type: 'checkbox',
          description: 'Receive notifications for task reminders and deadlines'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: 'Palette',
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          type: 'checkbox',
          description: 'Use dark theme for better viewing in low light'
        }
      ]
    },
    {
      title: 'Task Management',
      icon: 'Settings',
      settings: [
        {
          key: 'autoDelete',
          label: 'Auto-delete completed tasks',
          type: 'checkbox',
          description: 'Automatically delete completed tasks after 30 days'
        },
        {
          key: 'defaultPriority',
          label: 'Default Priority',
          type: 'select',
          description: 'Default priority level for new tasks',
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'urgent', label: 'Urgent' }
          ]
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Settings" className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Customize your TaskFlow experience</p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name={section.icon} className="text-white" size={16} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      {setting.label}
                    </label>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  
                  <div className="ml-4">
                    {setting.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    ) : setting.type === 'select' ? (
                      <select
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <FormField
                        type={setting.type}
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Save Changes</h3>
            <p className="text-sm text-gray-600">
              Your preferences will be saved locally in your browser
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleReset}
            >
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              Reset to Default
            </Button>
            
            <Button
              variant="primary"
              onClick={handleSave}
            >
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </motion.div>

      {/* App Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">TaskFlow</h3>
            <p className="text-white/90">
              A modern task management application built with React
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">Version 1.0.0</p>
            <p className="text-sm text-white/70">© 2024 TaskFlow</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings