/**
 * response handler
 * @param res
 * @param data
 * @returns
 */
export const response = <T>(content: T, code?: number, info?: string): any => {
  const res = { code: 200, info: 'SUCCESS', content: null };

  if (code) res.code = code;
  if (info) res.info = info;

  return res;
};
