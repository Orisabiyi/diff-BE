export const submitDirectorySchema = {
  body: {
    type: 'object',
    required: ['type', 'name', 'organisation', 'website', 'applicationLink', 'description', 'deadline', 'eligibility', 'tags',],
    properties: {
      type: { type: 'string' },
      name: { type: 'string' },
      organisation: { type: 'string' },
      website: { type: 'string' },
      applicationLink: { type: 'string' },
      description: { type: 'string' },
      deadline: { type: 'string' },
      eligibility: { type: 'string' },
      tags: { type: 'array', items: { type: 'string' } },
      grantAmount: { type: 'string', nullable: true },
      grantFrequency: { type: 'string', nullable: true },
      checkSize: { type: 'string', nullable: true },
      investmentStage: { type: 'string', nullable: true },
      duration: { type: 'string', nullable: true },
      location: { type: 'string', nullable: true },
      stipend: { type: 'string', nullable: true },
      submitterName: { type: 'string', nullable: true },
      submitterEmail: { type: 'string', format: 'email', nullable: true },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      }
    }
  }
}