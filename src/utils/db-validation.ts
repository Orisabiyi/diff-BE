import { Collection, Document } from "mongodb";
import { ValidationResponse } from "../types/validation";

export async function validateExistingUser(collection: Collection<Document> | undefined, data: string): Promise<ValidationResponse> {
  const userDataExists = await collection?.findOne({
    $or: [{ email: data }, { mobile: data }]
  })

  if (userDataExists) {
    return {
      status: false,
    }
  }

  return {
    status: true,
  }
}