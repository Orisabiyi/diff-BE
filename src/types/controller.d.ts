export interface CreateChat {
  userId: string;
  chatId: string;
  text: string;
}

export interface SubmitDirectoryProps {
  type: 'grants' | 'vcs' | 'residencies' | 'fellowships';
  name: string;
  organisation: string;
  website: string;
  applicationLink: string;
  description: string;
  deadline: string;
  eligibility: string;
  tags: string[];
  grantAmount?: string;
  grantFrequency?: string;
  checkSize?: string;
  investmentStage?: string;
  duration?: string;
  location?: string;
  stipend?: string;
  duration?: string;
  submitterName?: string;
  submitterEmail?: string;
}