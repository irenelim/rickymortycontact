// 👇️ checks if obj has properties of ResponseType
export function isResponseType(obj: unknown): obj is MyResponseType {
  return (
    typeof obj === "object" && obj !== null && "info" in obj && "results" in obj
  );
}

export function isContactType(obj: unknown): obj is ContactType {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "status" in obj &&
    "species" in obj &&
    "type" in obj &&
    "gender" in obj &&
    "origin" in obj &&
    "location" in obj &&
    "image" in obj &&
    "episode" in obj &&
    "url" in obj &&
    "created" in obj
  );
}
