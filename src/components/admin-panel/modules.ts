import { uptimizeCloudinaryImage } from "@/hooks/imageCloudinaryOptimizer";
import axios from "axios";
import Quill from "quill";

// Image handler function
const imageHandler = function (this: { quill: Quill }) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
        if (!input.files || !input.files[0]) return;

        const file = input.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Replace with your upload preset

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dztt3ldiy/image/upload`,
                formData,
                {}
            );

            const imageUrl = await uptimizeCloudinaryImage(
                "f_auto,q_auto",
                response.data.url
            );

            if (this.quill) {
                const selection = this.quill.getSelection();
                if (selection) {
                    const cursorPosition = selection.index;
                    this.quill.insertEmbed(cursorPosition, "image", imageUrl);
                }
            }
        } catch (error) { }
    };
};

export const modulesObject = {
    toolbar: {
        container: [
            [{ font: [] }, { size: [] }, { header: [1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            [{ direction: "rtl" }, { align: [] }],
            ["link", "image", "video", "clean"]
        ],
        handlers: {
            image: imageHandler,
            
        }
    }
};


