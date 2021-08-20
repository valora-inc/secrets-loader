# secrets-loader

Load secret data from [Google Cloud's Secrets Manager](https://cloud.google.com/secret-manager/docs) and parse with [dotenv](https://github.com/motdotla/dotenv).

## Installation
From your project directory, run:

```
yarn add @valora/secrets-loader
```

or

```
npm i @valora/secrets-loader
```

## Example usage
```typescript
import {loadSecret} from '@valora/secrets-loader'

async function loadSecretExample() {
  
  // ...your code...
  
  const VERSION = 'latest'
  const secretData = await loadSecret(`projects/${YOUR_PROJECT_ID}/secrets/${YOUR_SECRET_NAME}/versions/${VERSION}`)

  // If secret is FOO=bar\nUSER=alice...

  // ...you can use the values directly...
  doStuffWithFoo(secretData.FOO)
  doStuffWithUser(secretData.USER)

  // ...or inject into process.env.
  process.env = { ...process.env, ...secretData }
}
```

`loadSecret` is a thin wrapper for `SecretManagerServiceClient.accessSecretVersion`, so you may also find [this example](https://github.com/googleapis/nodejs-secret-manager/blob/master/samples/accessSecretVersion.js) helpful.


## Local Development
### Prerequisites
If you plan to use actual secrets from the Google Cloud Secrets Manager (rather than mocked values) with your local service, 
you will need:
- read permissions from whichever secrets are loaded from Google Cloud in your project
- [Google cloud sdk installed](https://cloud.google.com/sdk/docs/install)

### Setup
1. Log in: `gcloud auth login`
2. Set your project configuration to whatever project the secrets are located in. For example: `gcloud config set project my-project` . (replace `my-project` with your project name, as needed)

### Troubleshooting
If you are logged in and have all the necessary permissions, but still getting an error like `failed to retrieve auth metadata with error: invalid_grant` when 
you try to access secrets, it may be an IDE permissions issue. Try setting your Application Default Credentials (ADC) [as described here](https://cloud.google.com/code/docs/intellij/client-libraries#local_development). 

### Optional
If you are a JetBrains aficionado, you may find [this plugin](https://cloud.google.com/code/docs/intellij/install) 
enjoyable. It includes a SecretManager toolbar.