'use server'
import { Task } from '@prisma/client'
import prisma from './db'
import { revalidatePath } from 'next/cache'

export const createProject = async (formData: FormData) => {
  const title = formData.get('title') as string
  await prisma.project.create({
    data: {
      title,
    },
  })
  revalidatePath('/projects')
}

export const getAllProjects = async () => {
  const projects = await prisma.project.findMany()
  return projects
}

export const getAllTaskByProjectId = async (id: string) => {
  const tasks = await prisma.task.findMany({
    where: { projectId: id },
  })
  return tasks
}

export const updateProject = async (id: string, formData: FormData) => {
  'use server'
  const title = formData.get('title')?.toString()
  await prisma.project.update({
    where: { id },
    data: {
      title,
    },
  })
  revalidatePath(`/projects/${id}`)
}

export const deleteProject = async (id: string) => {
  await prisma.project.delete({ where: { id } })
  revalidatePath('/projects')
}

export const deleteProjectAndRevalidate = async (id: string, path: string) => {
  await prisma.project.delete({ where: { id } })
  revalidatePath(path)
}

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany()
    return tasks
  } catch (error) {
    console.log(error)
  }
}

export const createTask = async (projectId: string, formData: FormData) => {
  const content = formData.get('content') as string
  try {
    await prisma.task.create({
      data: {
        content,
        project: { connect: { id: projectId } },
      },
    })
    revalidatePath(`/projects/${projectId}`)
  } catch (error) {
    console.log(error)
  }
}

export const createManyTask = async (id: string, tasks: string[]) => {
  await prisma.$transaction(
    tasks.map((content) =>
      prisma.task.create({
        data: { content, project: { connect: { id } } },
      }),
    ),
  )
  revalidatePath(`/projects/${id}`)
}

export const updateTaskStatus = async (id: string) => {
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

export const updateTask = async (id: string, formData: FormData) => {
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

export const deleteTask = async (id: string) => {
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
