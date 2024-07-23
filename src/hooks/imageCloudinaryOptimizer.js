import axios from "axios";

export const uptimizeCloudinaryImage = async (
  optimizationStr,
  originalImageurl
) => {
  console.log(originalImageurl);
  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/dztt3ldiy/image/upload/";

  try {
    // Find the index where the base URL ends
    const baseUrlEndIndex =
      originalImageurl.indexOf(cloudinaryBaseUrl) + cloudinaryBaseUrl.length;
    const baseUrl = originalImageurl.substring(0, baseUrlEndIndex);
    const restOfString = originalImageurl.substring(baseUrlEndIndex);

    return `${baseUrl}${optimizationStr}/${restOfString}`;
  } catch (error) {
    return originalImageurl;
  }
};
