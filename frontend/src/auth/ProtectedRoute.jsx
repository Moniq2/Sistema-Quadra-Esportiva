import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getAuthenticatedUser, getHomeByRole } from './authStorage'

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation()
  const user = getAuthenticatedUser()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!allowedRoles.includes(user.tipo)) {
    return <Navigate to={getHomeByRole(user.tipo)} replace />
  }

  return <Outlet />
}
