import { Task } from '@prisma/client'
import prisma from './db'

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany()
    return tasks
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (data: Task) => {
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
      },
    })
    return task
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async (id: string, data: Task) => {
  try {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })
    return task
  } catch (error) {
    console.log(error)
  }
}

export const deleteTask = async (id: string) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    })
    return task
  } catch (error) {
    console.log(error)
  }
}
