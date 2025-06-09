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
          username: { type: 'string' },
          userId: { type: 'string' }
        }
      }
    }
  }
}

export const getUserSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'email'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string', format: 'email' }
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
          username: { type: 'string' },
          userId: { type: 'string' }
        }
      }
    }
  }
}

export const getAllDirectoriesSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          _id: { type: 'string' },
          name: { type: 'string' },
          type: { type: 'string' },
          description: { type: 'string' },
          website: { type: 'string' },
          "tags": [
            "Early-stage",
            "Startups",
            "Funding"
          ]
        },

      }
    }
  }
}