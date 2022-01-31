import { useCallback } from "react"

export const useMessage = () =>
    useCallback((text) => window.M && text ? window.M.toast({ html: text }) : null, []);