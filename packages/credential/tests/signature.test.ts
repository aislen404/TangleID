// import { CREDENTIAL_CONTEXT_URL, SCHEMA_CONTEXT_URL, generateCredential } from '../src';
import { CREDENTIAL_CONTEXT_URL, SCHEMA_CONTEXT_URL } from '../src/contexts';
import { generateCredential, signRsaSignature, verifyProof } from '../src/credential';
import { publicKeyPem, privateKeyPem } from './keypair';
import { generateDocumentLoader } from '../src';
import { documents, CREDENTIAL_URL, CONTROLLER_URL, PUBLIC_KEY_URL } from './data';

describe('generate credential', () => {
  let credential: any;
  let signed: any;
  let documentLoader: any;

  beforeAll(async () => {
    // Generate documentLoader with cached documents
    documentLoader = generateDocumentLoader(documents);

    const context = [CREDENTIAL_CONTEXT_URL, SCHEMA_CONTEXT_URL];
    const metadata = {
      id: CREDENTIAL_URL,
    };
    const subject = {
      id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      alumniOf: '<span lang=\'en\'>Example University</span>',
    };
    credential = await generateCredential({ subject, metadata, context });

    console.log(JSON.stringify(credential));
    // console.log('Signed document:', JSON.stringify(signed));

    const publicKeyMetadata = {
      id: PUBLIC_KEY_URL,
      controller: CONTROLLER_URL,
      publicKeyPem,
    };

    signed = await signRsaSignature({
      document: credential,
      privateKeyPem,
      metadata: publicKeyMetadata,
      documentLoader,
    });
    console.log(JSON.stringify(signed));
  }, 9000);

  it('verify signature', async () => {
    const verified = await verifyProof(signed, { documentLoader });
    expect(verified).toBe(true);
  }, 8000);
});
