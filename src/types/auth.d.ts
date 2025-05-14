export interface CreateUser {
  email: string,
  mobile: string
  fullname: string
  username: string
  lastLoginDevice: string | null
  lastLoginLocation: string | null
  lastLoginBrowser: string | null
}

export interface GetUser {
  username: string
  password: string
  email: string
}

export interface GenerateOTP {
  email: string
  mobile: string
}
export interface VerifyOTP {
  email: string
  mobile: string
  otp: string
  otpStatus: string
}