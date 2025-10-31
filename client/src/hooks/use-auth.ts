import {create} from "zustand"
import type { AuthType } from "@/interfaces"

type AuthStore = {
    authState: AuthType
    setAuth: (state: AuthType) => void
}

export const useAuth = create<AuthStore>(set => ({
    authState: "login",
    setAuth: (state) => set({authState: state})
}))