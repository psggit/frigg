export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
  // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
  const rolesMap = {
    "user": 1,
    "admin": 6,
    "dataadmin": 5,
    "dataentry": 4
    // "support_person": 3,
    // "support_admin": 5,
    // "support_team_leader": 4,
    // "excise_person": 2,
    // "support_master": 6,
    // "delivery_support_person": 3
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for(let i=0; i<hasuraRoles.length; i++) {
    if (maxRole < rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

export function getAuthToken(data) {
  const token = data.auth_token
  return token
}

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

export function createSession(data) {
  localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem('auth-token', getAuthToken(data))
  localStorage.setItem('hasura-id', getHasuraId(data))
}
