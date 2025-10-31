import { useToast as useToastHook } from '@/hooks/useToast'
import { Toaster } from '@/components/ui/toaster'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }) {
  const toastFunctions = useToastHook()

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}
