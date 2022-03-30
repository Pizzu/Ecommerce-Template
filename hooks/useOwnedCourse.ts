// Libraries
import useSWR from "swr"
import { useAccount } from "@providers/AccountProvider"
// Types
import type { Course } from "../types"

export const useOwnedCourse = (course: Course) => {
  const { isLogged } = useAccount()
  const { data, error, isValidating, ...rest } = useSWR(
    (isLogged) ? `/api/user/orderCourses/${course._id}` : null,
    async (url) => {
      const isOwned: boolean = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" }
      }).then(res => res.json())

      return isOwned
    }
  )

  return {
    isCourseOwned: data ? data : false,
    error,
    isValidating,
    ...rest
  }
}