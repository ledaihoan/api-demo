export const parseFieldsQuery = (fields: string) => {
  return fields ? fields.split(',') : [];
};
