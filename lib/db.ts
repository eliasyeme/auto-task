import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// TODO: update this to use the correct URL in production
const client = createClient({
  url: 'http://127.0.0.1:8080', //process.env.TURSO_URL ?? '',
  //   authToken: process.env.AUTH_TOKEN,
})

const adapter = new PrismaLibSQL(client)

const globalAny: any = global
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter })
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient({ adapter })
  }
  prisma = globalAny.prisma
}

export default prisma
