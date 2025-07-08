import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProgressRing from '@/components/molecules/ProgressRing'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { statsService } from '@/services/api/statsService'

const StatsPanel = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await statsService.getStats()
      setStats(data)
    } catch (err) {
      setError('Failed to load statistics')
      console.error('Error loading stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <Loading message="Loading statistics..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <Error 
          message={error} 
          onRetry={loadStats}
          showRetry={true}
        />
      </div>
    )
  }

  const dailyPercentage = stats.dailyTotal > 0 ? (stats.dailyCompleted / stats.dailyTotal) * 100 : 0
  const weeklyPercentage = stats.weeklyTotal > 0 ? (stats.weeklyCompleted / stats.weeklyTotal) * 100 : 0

  const statItems = [
    {
      icon: 'Target',
      label: 'Daily Progress',
      value: `${stats.dailyCompleted}/${stats.dailyTotal}`,
      percentage: dailyPercentage,
      color: '#5B4FE9'
    },
    {
      icon: 'Calendar',
      label: 'Weekly Progress',
      value: `${stats.weeklyCompleted}/${stats.weeklyTotal}`,
      percentage: weeklyPercentage,
      color: '#FF6B6B'
    },
    {
      icon: 'Zap',
      label: 'Current Streak',
      value: `${stats.streak} days`,
      percentage: Math.min(stats.streak * 10, 100),
      color: '#4CAF50'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Progress Overview</h2>
        <ApperIcon name="TrendingUp" className="text-primary" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name={item.icon} className="text-white" size={20} />
              </div>
              
              <ProgressRing
                percentage={item.percentage}
                color={item.color}
                size={80}
                strokeWidth={6}
                showText={false}
              />
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-800">
                  {item.value}
                </div>
                <div className="text-sm text-gray-600">
                  {item.label}
                </div>
                <div className="text-xs font-medium" style={{ color: item.color }}>
                  {Math.round(item.percentage)}% Complete
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {stats.streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-success to-green-500 text-white rounded-lg text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <ApperIcon name="Flame" size={20} />
            <span className="font-semibold">
              {stats.streak} day streak! Keep it up!
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default StatsPanel