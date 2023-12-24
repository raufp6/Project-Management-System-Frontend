export const isAdmin = (role) => {
    console.log(role);
  if (role === 'Admin' || role == 'Super user') {
    return true
  } else {
    return false
  }
}
export const isDeveloper = (role) => {
  if (role === 'Developer') {
    return true
  } else {
    return false
  }
}
export const isClient = (role) => {
  if (role === 'Client') {
    return true
  } else {
    return false
  }
}
