export type Seed = string;
export type Did = string;
export type DidDocument = {
  '@context': string;
  id: Did;
  publicKey?: PublicKeyMeta[];
};

export type NetworkIdentifer = string;
export type Address = string;

export type Payload = Buffer[];
export type Mnid = string;
export type MnidModel = {
  network: NetworkIdentifer;
  address: Address;
};

export type IriProviders = {
  [index: string]: string;
};

export type PublicKeyPem = string;
export type PublicKeyMeta = {
  id: string;
  type: string;
  controller: Did;
  publicKeyPem: PublicKeyPem;
};

// TODO: Migrate Types
export type PublicKeyMetadata = {
  id: string;
  controller: string;
  publicKeyPem: PublicKeyPem;
};

export type PrivateKeyPem = string;

/* Credentials */
export type CredentialSubject = {
  id: string;
};

export type CredentialMetadata = {
  id?: string;
  type?: string[];
  issuer?: string;
  issuanceDate?: string;
};

/** JSON-LD */
export type ContextArray = string[];
export type ContextTypeAlias = {
  [index: string]: string;
};
