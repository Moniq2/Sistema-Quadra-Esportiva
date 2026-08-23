export const USER_ROLES = {
  player: 'JOGADOR',
  admin: 'ADMIN',
}

export function getAuthenticatedUser() {
  try {
    const storedUser = localStorage.getItem('usuario')
    if (!storedUser) return null

    const user = JSON.parse(storedUser)
    if (!user?.id || !Object.values(USER_ROLES).includes(user.tipo)) {
      localStorage.removeItem('usuario')
      return null
    }

    return user
  } catch {
    localStorage.removeItem('usuario')
    return null
  }
}

export function saveAuthenticatedUser(user) {
  localStorage.setItem('usuario', JSON.stringify(user))
}

export function clearAuthenticatedUser() {
  localStorage.removeItem('usuario')
}

export function getHomeByRole(role) {
  return role === USER_ROLES.admin ? '/admin' : '/inicio'
}
