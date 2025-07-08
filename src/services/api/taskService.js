import tasksData from '@/services/mockData/tasks.json'

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(150)
    const task = tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async getByCategory(categoryId) {
    await delay(250)
    return tasks.filter(task => task.categoryId === parseInt(categoryId))
  },

  async create(taskData) {
    await delay(350)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString().split('T')[0],
      order: tasks.length + 1
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay(250)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData }
      return { ...tasks[index] }
    }
    return null
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      const deleted = tasks.splice(index, 1)[0]
      return { ...deleted }
    }
    return null
  },

  async markComplete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      tasks[index].completed = true
      tasks[index].completedAt = new Date().toISOString().split('T')[0]
      return { ...tasks[index] }
    }
    return null
  },

  async markIncomplete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      tasks[index].completed = false
      tasks[index].completedAt = null
      return { ...tasks[index] }
    }
    return null
  },

  async reorder(taskIds) {
    await delay(300)
    taskIds.forEach((id, index) => {
      const task = tasks.find(t => t.Id === parseInt(id))
      if (task) {
        task.order = index + 1
      }
    })
    return [...tasks]
  }
}