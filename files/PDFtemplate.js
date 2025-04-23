// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Set title
    document.title = STORY_TITLE;

    // Basic styles
    const style = document.createElement("style");
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f4f4f4;
        }
        h1 {
            margin-top: 20px;
            font-size: 24px;
            color: #333;
        }
        iframe {
            width: 80%;
            height: 80vh;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .button-container {
            margin: 20px 0;
            display: flex;
            gap: 20px;
        }
        .button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
    `;
    document.head.appendChild(style);

    // Elements
    const header = document.createElement("h1");
    header.textContent = STORY_TITLE;

    const iframe = document.createElement("iframe");
    iframe.src = PDF_FILE + "#toolbar=0";
    iframe.title = "PDF Viewer";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const homeBtn = document.createElement("a");
    homeBtn.href = "/";
    homeBtn.className = "button";
    homeBtn.textContent = "Home";

    const downloadBtn = document.createElement("a");
    downloadBtn.href = PDF_FILE;
    downloadBtn.className = "button";
    downloadBtn.download = "";
    downloadBtn.textContent = "Download PDF";

    // Build structure
    buttonContainer.appendChild(homeBtn);
    buttonContainer.appendChild(downloadBtn);

    document.body.appendChild(header);
    document.body.appendChild(iframe);
    document.body.appendChild(buttonContainer);
});
