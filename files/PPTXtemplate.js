document.addEventListener("DOMContentLoaded", () => {
    document.title = STORY_TITLE;

    // Inject styles
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
            font-size: 50px;
            color: #333;
        }

        .pdf-container {
            position: relative;
            width: 80%;
            max-width: 800px;
            height: 80vh;
            margin: 20px 0;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }

        canvas {
            width: 100%;
            height: auto;
        }

        .overlay-buttons {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
            padding: 0 20px;
        }

        .overlay-buttons button {
            background-color: rgba(0, 123, 255, 0.7);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .overlay-buttons button:hover {
            background-color: rgba(0, 123, 255, 1);
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

    // Create structure
    const header = document.createElement("h1");
    header.textContent = STORY_TITLE;

    const pdfContainer = document.createElement("div");
    pdfContainer.className = "pdf-container";

    const canvas = document.createElement("canvas");
    canvas.id = "pdfCanvas";
    pdfContainer.appendChild(canvas);

    const overlay = document.createElement("div");
    overlay.className = "overlay-buttons";

    const prevBtn = document.createElement("button");
    prevBtn.id = "prevBtn";
    prevBtn.textContent = "←";

    const nextBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    nextBtn.textContent = "→";

    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    pdfContainer.appendChild(overlay);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const homeBtn = document.createElement("a");
    homeBtn.href = "/";
    homeBtn.className = "button";
    homeBtn.textContent = "Home";

    const downloadPDF = document.createElement("a");
    downloadPDF.href = PDF_PATH;
    downloadPDF.download = "";
    downloadPDF.className = "button";
    downloadPDF.textContent = "Download PDF";

    const downloadPPTX = document.createElement("a");
    downloadPPTX.href = PPTX_PATH;
    downloadPPTX.download = "";
    downloadPPTX.className = "button";
    downloadPPTX.textContent = "Download PPTX";

    buttonContainer.appendChild(homeBtn);
    buttonContainer.appendChild(downloadPDF);
    buttonContainer.appendChild(downloadPPTX);

    document.body.appendChild(header);
    document.body.appendChild(pdfContainer);
    document.body.appendChild(buttonContainer);

    // PDF.js logic
    let currentPage = 1;
    let pdfDoc = null;
    let totalPages = 0;
    const ctx = canvas.getContext("2d");

    pdfjsLib.getDocument(PDF_PATH).promise.then(pdf => {
        pdfDoc = pdf;
        totalPages = pdf.numPages;
        renderPage(currentPage);
    }).catch(error => {
        console.error("Error loading PDF:", error);
    });

    function renderPage(pageNum) {
        pdfDoc.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
        }).catch(error => {
            console.error("Error rendering page:", error);
        });
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    });
});
