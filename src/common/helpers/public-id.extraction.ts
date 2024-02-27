export const publicIdExtract = (imagePath: string) => {
  const parts = imagePath.split('/');
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split('.')[0];
  return publicId;
};
