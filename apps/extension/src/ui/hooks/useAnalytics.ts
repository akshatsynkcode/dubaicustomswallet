import { api } from "@ui/api"
import { useCallback } from "react"

// Replaced `Properties` with a more flexible and type-safe option
type AnalyticsOptions = Record<string, unknown>

export const useAnalytics = () => {
  const genericEvent = useCallback((eventName: string, options: AnalyticsOptions = {}) => {
    api.analyticsCapture({ eventName, options })
  }, [])

  const pageOpenEvent = useCallback((pageName: string, options: AnalyticsOptions = {}) => {
    api.analyticsCapture({ eventName: `open ${pageName}`, options })
  }, [])

  const popupOpenEvent = useCallback((page: string, options: AnalyticsOptions = {}) => {
    api.analyticsCapture({ eventName: "open popup", options: { ...options, page } })
  }, [])

  return {
    genericEvent,
    pageOpenEvent,
    popupOpenEvent,
  }
}
