import axios from "axios";

export const uptimizeCloudinaryImage = async (
  optimizationStr,
  originalImageurl
) => {
  const cloudinaryBaseUrl =
    "https://res.cloudinary.com/da3q9dbku/image/upload/";

  try {
    // Fetch image metadata
    const metadataUrl = originalImageurl.replace(
      "/upload/",
      "/upload/fl_getinfo/"
    );
    const response = await axios.get(metadataUrl);
    const imageWidth = response?.data?.input?.width;

    console.log(imageWidth);
    // Check if the width is greater than 1000px
    if (imageWidth > 1000) {
      optimizationStr = `${optimizationStr},w_1000`; // Add w_1000 to the optimization string
    }

    // Find the index where the base URL ends
    const baseUrlEndIndex =
      originalImageurl.indexOf(cloudinaryBaseUrl) + cloudinaryBaseUrl.length;
    const baseUrl = originalImageurl.substring(0, baseUrlEndIndex);
    const restOfString = originalImageurl.substring(baseUrlEndIndex);

    // Return the optimized URL

    return `${baseUrl}${optimizationStr}/${restOfString}`;
  } catch (error) {
    console.error("Error fetching image metadata:", error);
    // Fallback to original URL if metadata fetch fails
    console.log("original", originalImageurl);
    return originalImageurl;
  }
};
