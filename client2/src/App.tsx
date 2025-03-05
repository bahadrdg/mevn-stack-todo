import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Toaster } from './components/ui/toaster'
import AuthRoute from './views/auth/layout'
import ThemeSettingsProvider from './components/theme-settings-provider'
import DashboardRoute from './views/dashboard/layout'

function App() {

  return (
    <>
      <ThemeSettingsProvider>
        <BrowserRouter>
          <AuthRoute />
          <DashboardRoute />
        </BrowserRouter>
      </ThemeSettingsProvider>
      <Toaster />
    </>
  )
}

export default App
