'use server'
import { Task } from '@prisma/client'
import prisma from './db'
import { revalidatePath } from 'next/cache'

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany()
    return tasks
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (formData: FormData) => {
  const content = formData.get('content') as string
  try {
    await prisma.task.create({
      data: {
        content,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}

export const updateTaskStatus = async (id: number) => {
  try {
    const currentStatus = await prisma.task.findUnique({ where: { id } })
    const status = !currentStatus?.status

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async (id: number, formData: FormData) => {
  const currentStatus = await prisma.task.findUnique({ where: { id } })
  const content = formData.get('content') as string
  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        content,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}

export const deleteTask = async (id: number) => {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    })
    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}
