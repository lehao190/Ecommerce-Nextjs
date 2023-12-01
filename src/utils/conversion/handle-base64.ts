// Convert file image into base64 encoding format
export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data: prefix and the mime type from the result
      const base64 = reader.result as string;
      const base64WithoutPrefix = base64.split(',')[1];
      resolve(base64WithoutPrefix);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
