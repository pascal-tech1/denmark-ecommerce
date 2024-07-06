import axios from "axios";
import { useMemo } from "react";
import { uptimizeCloudinaryImage } from "./imageCloudinaryOptimizer";

// Memoize the modules object to prevent unnecessary re-renders
export const modulesObject = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"]
  ],
  imageUploader: {
    upload: (file: File) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Replace with your upload preset

        axios
          .post(
            `https://api.cloudinary.com/v1_1/dztt3ldiy/image/upload`,
            formData,
            {}
          )
          .then((result) => {
            resolve(uptimizeCloudinaryImage("f_auto,q_auto", result.data.url));
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    }
  }
};

// useEffect(() => {
//   const iframes = document.querySelectorAll(".ql-video");
//   iframes.forEach((iframe) => {
//     // Add autoplay and fullscreen parameters to the iframe URL
//     const src = iframe.getAttribute('src');
//     if (src && !src.includes('autoplay=1')) {
//       const separator = src.includes('?') ? '&' : '?';
//       iframe.setAttribute('src', `${src}${separator}autoplay=1`);
//     }
//     iframe.setAttribute('src', src);
//     iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
//   });

// Intersection Observer to autoplay iframes when in viewport
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const iframe = entry.target as HTMLIFrameElement;
//         if (entry.isIntersecting) {
//           const src = iframe.getAttribute('src');
//           if (src && !src.includes('autoplay=1')) {
//             const separator = src.includes('?') ? '&' : '?';
//             iframe.setAttribute('src', `${src}${separator}autoplay=1`);
//           }
//         }
//       });
//     },
//     { threshold: 0.5 }
//   );

//   iframes.forEach((iframe) => {
//     observer.observe(iframe);
//   });

//   return () => {
//     iframes.forEach((iframe) => {
//       observer.unobserve(iframe);
//     });
//   };
// }, [editorContent]);
