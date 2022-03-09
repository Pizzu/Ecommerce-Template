import type { User } from "@prisma/client"

export type UserAccount = {
  user?: User | null
  isLogged?: boolean | null,
  isLoading?: boolean | null
}

export type Course = {
  _id: string
  title: string,
  slug: string,
  type: string,
  description: string,
  image: string,
  lectures: [string]
}