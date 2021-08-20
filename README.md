# secrets-loader
Library for loading secrets via Google Cloud's Secrets Manager.

## Installation
From your project directory, run:

`yarn add @valora/secrets-loader`

## Example usage
```typescript
import {loadSecret} from '@valora/secrets-loader'

async function loadSecretExample() {
  
  // ...your code...
  
  const VERSION = 'latest'
  const secret = await loadSecret(`projects/${YOUR_PROJECT_ID}/secrets/${YOUR_SECRET_NAME}/${VERSION}`)
  
  // say secret value is FOO=bar\nUSER=alice
  doStuffWithFoo(secret.FOO)
  doStuffWithUser(secret.USER)
}
```
