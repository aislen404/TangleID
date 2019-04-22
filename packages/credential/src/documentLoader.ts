import { resolver } from '@tangleid/did';

// @ts-ignore
import * as jsonld from 'jsonld';
// @ts-ignore
import { extendContextLoader } from 'jsonld-signatures';

const nodeDocumentLoader = jsonld.documentLoaders.node();

type DocumentCacheMap = {
  [index: string]: any;
};

export const generateDocumentLoader = (documents: DocumentCacheMap = {}) => {
  const documentLoader = extendContextLoader(async (url: string, callback: any) => {
    // TODO: use TangleID resolver
    // if (url.startsWith('did:tangleid')) {
    //   await resolver();
    // }

    console.log(`fetching ${url}`);
    if (url in documents) {
      return {
        contextUrl: null,
        documentUrl: url,
        document: documents[url],
      };
    }

    return nodeDocumentLoader(url, callback);
  });

  return documentLoader;
};
