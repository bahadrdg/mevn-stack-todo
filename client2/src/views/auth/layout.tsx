import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPageV1 from './login/v1/page'
import RegisterPageV1 from './register/v1/page'

import Error404 from './pages/error/404/page'
import Error500 from './pages/error/500/page'


export default function AuthRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPageV1 />} />
      <Route path="/register" element={<RegisterPageV1 />} />
      <Route path="/auth/*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/500" element={<Error500 />} />     
    </Routes>
  )
}
