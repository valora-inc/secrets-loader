import {SecretManagerServiceClient} from '@google-cloud/secret-manager'
import * as dotenv from 'dotenv'


/**
 * Load secrets from Google Cloud's Secret Manager
 *
 * If using a real service client, you'll need permissions to access the secret. You may also need
 *  to run `gcloud auth login` from the CLI
 *
 * @param name: name of secret to load
 * @param client: secret manager service client
 */
export async function loadSecret(
  name: string,
  client?: SecretManagerServiceClient
): Promise<Record<string, string>> {
  if (!client) {
    client = new SecretManagerServiceClient()
  }

  const [version] =
    await client.accessSecretVersion({name})

  const rawPayload = version?.payload?.data?.toString()

  if (!rawPayload) {
    throw new Error(
      `Missing value for secret ${name}`,
    )
  }
  return dotenv.parse(rawPayload) || rawPayload
}
