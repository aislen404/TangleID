import { SECURITY_CONTEXT_URL, CREDENTIAL_CONTEXT_URL } from '../src/index';
import { publicKeyPem } from './keypair';

import SCHEMA_DOCUMENT from './schema';

export const CONTROLLER_URL = 'did:tangleid:MoWYKbBfezWbsTkYAngUu523F8YQgHfARhWWsTFSN2U45eAMpsSx3DnrV4SyZHCFuyDqjvQdg7';
export const PUBLIC_KEY_URL = 'https://example.com/i/alice/keys/1';
export const CREDENTIAL_URL = 'http://example.edu/credentials/3732';

export const PUBlIC_KEY_DOCUMENT = {
  '@context': SECURITY_CONTEXT_URL,
  type: 'RsaVerificationKey2018',
  id: PUBLIC_KEY_URL,
  controller: CONTROLLER_URL,
  publicKeyPem,
};

export const CONTROLLER_DOCUMENT = {
  '@context': SECURITY_CONTEXT_URL,
  id: CONTROLLER_URL,
  publicKey: [PUBlIC_KEY_DOCUMENT],
  assertionMethod: [PUBlIC_KEY_DOCUMENT.id],
};

export const credentialContext = {
  '@context': [
    {
      '@version': 1.1,
    },
    'https://w3id.org/security/v2',
    {
      cred: 'https://w3.org/2018/credentials#',
      xsd: 'http://www.w3.org/2001/XMLSchema#',

      id: '@id',
      type: '@type',

      JsonSchemaValidator2018: 'cred:JsonSchemaValidator2018',
      ManualRefreshService2018: 'cred:ManualRefreshService2018',
      VerifiableCredential: 'cred:VerifiableCredential',
      VerifiablePresentation: 'cred:VerifiablePresentation',

      credentialSchema: { '@id': 'cred:credentialSchema', '@type': '@id' },
      credentialStatus: { '@id': 'cred:credentialStatus', '@type': '@id' },
      credentialSubject: { '@id': 'cred:credentialSubject', '@type': '@id' },
      evidence: { '@id': 'cred:evidence', '@type': '@id' },
      expirationDate: { '@id': 'cred:expirationDate', '@type': 'xsd:dateTime' },
      issuanceDate: { '@id': 'cred:issuanceDate', '@type': 'xsd:dateTime' },
      issuer: { '@id': 'cred:issuer', '@type': '@id' },
      refreshService: { '@id': 'cred:refreshService', '@type': '@id' },
      serviceEndpoint: { '@id': 'cred:serviceEndpoint', '@type': '@id' },
      termsOfUse: { '@id': 'cred:termsOfUse', '@type': '@id' },
      verifiableCredential: {
        '@id': 'cred:verifiableCredential',
        '@type': '@id',
        '@container': '@graph',
      },
    },
  ],
};

export const documents = {
  [PUBLIC_KEY_URL]: PUBlIC_KEY_DOCUMENT,
  [CONTROLLER_URL]: CONTROLLER_DOCUMENT,
  [CREDENTIAL_CONTEXT_URL]: credentialContext,
  'https://schema.org/': SCHEMA_DOCUMENT,
};
