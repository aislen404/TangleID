// @ts-ignore
import * as jsonld from 'jsonld';

export const compact = async (doc: any, context: any): Promise<object> => {
  // @ts-ignore
  return jsonld.compact(doc, context);
};

export const expand = async (doc: any, options: any): Promise<any> => {
  // @ts-ignore
  return jsonld.expand(doc, options);
};

export const canonize = async (doc: any, context: any): Promise<string> => {
  // @ts-ignore
  return jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads',
  });
};

// export const canonize = async (doc: JsonLd, context: JsonLd): Promise<string> => {
//   return jsonld.canonize(doc, context);
// };

// export const canonize = async (doc: any): Promise<string> => {
//   return jsonld.canonize(doc);
// };
