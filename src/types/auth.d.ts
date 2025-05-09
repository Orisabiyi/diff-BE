export interface CreateUser {
  email: string,
  mobile: string
  fullname: string
  username: string
  lastLoginDevice: string | null
  lastLoginLocation: string | null
  lastLoginBrowser: string | null
}