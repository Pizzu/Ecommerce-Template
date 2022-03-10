import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"
import type { UserAccount } from "../types"
import type { User } from "@prisma/client"

const AccountContext = createContext<UserAccount>({})

const AccountProvider: React.FC = ({ children }) => {
  const { data, status } = useSession()
  const [userAccount, setUserAccount] = useState<UserAccount>({isLoading: true})

  useEffect(() => {
    const createUserAccount = async () => {
      console.log("I RUN")
      if (status === "authenticated") {
        const currentUser: User = await fetch("/api/user/getCurrentUser", {
          method: "GET",
          headers: { "content-type": "application/json" }
        }).then(res => res.json())

        setUserAccount({ user: currentUser, isLogged: true, isLoading: false })
      } else if (status === "unauthenticated") {
        setUserAccount({ user: null, isLogged: false, isLoading: false })
      }
    }

    createUserAccount()
  }, [status, data])

  return (
    <AccountContext.Provider value={userAccount}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider

export function useAccount() {
  return useContext(AccountContext)
}