/** @module credential */
// @ts-ignore
import * as jsigs from 'jsonld-signatures';
// @ts-ignore
import { RSAKeyPair } from 'crypto-ld';
import { expand } from './jsonld';
import expansionMap from './expansionMap';
import { generateDocumentLoader } from './documentLoader';
import { CREDENTIAL_CONTEXT_URL } from './contexts';
import {
  PrivateKeyPem,
  PublicKeyMetadata,
  CredentialMetadata,
  ContextArray,
  CredentialSubject,
  ContextTypeAlias,
} from '../../types';

const { RsaSignature2018 } = jsigs.suites;
const { AssertionProofPurpose } = jsigs.purposes;

export const expandCredential = async (document: any) => {
  const expanded = await expand(document, { expansionMap });

  return expanded;
};

type ComposeCredentialParams = {
  subject: CredentialSubject;
  metadata?: CredentialMetadata;
  context?: ContextArray;
  alias?: ContextTypeAlias;
};

/**
 * Generate credential object.
 * @function generateCredential
 * @param {object} params - Parameters for generating the credential object.
 * @param {object} params.subject - Subject of the credential.
 * @param {object} [params.metadata = {}] - Metadata of the credential.
 * @param {object} [params.context = ['https://www.w3.org/2018/credentials/v1']] - Context URLs of the credential.
 * @param {object} [params.alias = {}] - Context alias of the credential.
 *
 * @returns {object} Credential object in JSON-LD format.
 */
export const generateCredential = ({
  subject,
  metadata = {},
  context = [CREDENTIAL_CONTEXT_URL],
  alias = {},
}: ComposeCredentialParams) => {
  const contextMerged = [...context, alias];

  if (!metadata.type) {
    metadata.type = ['VerifiableCredential'];
  }

  const credential = {
    '@context': contextMerged,
    ...metadata,
    credentialSubject: subject,
  };

  return credential;
};

type SignRsaSignatureParams = {
  document: any;
  metadata: PublicKeyMetadata;
  privateKeyPem: PrivateKeyPem;
  documentLoader?: any;
};

export const signRsaSignature = async ({
  document,
  metadata,
  privateKeyPem,
  documentLoader = generateDocumentLoader(),
}: SignRsaSignatureParams) => {
  const publicKey = {
    '@context': jsigs.SECURITY_CONTEXT_URL,
    type: 'RsaVerificationKey2018',
    ...metadata,
  };
  const key = new RSAKeyPair({ ...publicKey, privateKeyPem });

  // @ts-ignore
  const signed = await jsigs.sign(document, {
    suite: new RsaSignature2018({ key }),
    purpose: new AssertionProofPurpose(),
    documentLoader,
    expansionMap,
  });

  return signed;
};

type SignatureOptions = {
  documentLoader?: any;
};

export const verifyProof = async (
  document: any,
  options: SignatureOptions = {},
): Promise<boolean> => {
  const documentLoader = options.documentLoader || generateDocumentLoader();

  // @ts-ignore
  const result = await jsigs.verify(document, {
    suite: new RsaSignature2018(),
    purpose: new AssertionProofPurpose(),
    expansionMap: false,
    documentLoader,
  });

  console.log('result', result);

  return result.verified;
};
