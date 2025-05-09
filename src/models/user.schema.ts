export const userSchema = {
  body: {
    type: 'object',
    required: ['email', 'mobile', 'fullname', 'username', 'lastLoginDevice', 'lastLoginLocation', 'lastLoginBrowser'],
    properties: {
      email: { type: 'string', format: 'email' },
      mobile: { type: 'string' },
      fullname: { type: 'string' },
      username: { type: 'string' },
      lastLoginDevice: { type: 'string' },
      lastLoginLocation: { type: 'string' },
      lastLoginBrowser: { type: 'string' },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          email: { type: 'string', format: 'email' },
          mobile: { type: 'string' },
          fullname: { type: 'string' },
          username: { type: 'string' }
        }
      }
    }
  }
} 