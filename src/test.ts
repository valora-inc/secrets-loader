import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import {loadSecret} from "./index";


describe('loadSecret', () => {
  it('parses a secret', async () => {
    const fakeClient = {
      accessSecretVersion: async () => {
        return [{
          payload: {
            data: 'SECRET1=foo\nSECRET2=bar'
          }
        }]
      }
    } as unknown as SecretManagerServiceClient

    const secret = await loadSecret('/foo', fakeClient)
    expect(secret.SECRET1).toEqual('foo')
    expect(secret.SECRET2).toEqual('bar')
  })

  it('fails if missing secret', async () => {
    const fakeClient = {
      accessSecretVersion: async () => {
        return [{
          payload: {}
        }]
      }
    } as unknown as SecretManagerServiceClient

    await expect(loadSecret('/foo', fakeClient)).rejects.toThrow()
  })
})
