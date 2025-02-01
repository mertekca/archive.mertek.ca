document.addEventListener("DOMContentLoaded", async () => {
    const dropdownMenu = document.getElementById("fileSelector");
    const searchBar = document.getElementById("searchBar");
    const fileList = document.getElementById("fileList");
    const noResults = document.getElementById("noResults");
    const githubRepo = "your-github-username/your-repo-name";
    const directoryPath = "json-files";
    let uploadedFiles = {};
    
    async function fetchGitHubFiles() {
        try {
            const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/${directoryPath}`);
            if (!response.ok) throw new Error("Failed to fetch file list");
            
            const files = await response.json();
            for (const file of files) {
                if (file.name.endsWith(".json")) {
                    await loadFile(file.download_url, file.name);
                }
            }
            
            addUploadOption();
        } catch (error) {
            console.error("Error fetching GitHub files:", error);
        }
    }
    
    async function loadFile(fileUrl, filename) {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            
            const fileData = await response.json();
            
            if (fileData.filename) {
                addDropdownOption(fileUrl, fileData.filename);
            } else {
                addDropdownOption(fileUrl, filename);
            }
        } catch (error) {
            console.error("Error loading file:", error);
        }
    }
    
    function addDropdownOption(fileUrl, displayName) {
        const option = document.createElement("option");
        option.value = fileUrl;
        option.textContent = displayName;
        dropdownMenu.appendChild(option);
    }
    
    function addUploadOption() {
        const option = document.createElement("option");
        option.value = "upload";
        option.textContent = "Upload File";
        dropdownMenu.appendChild(option);
    }
    
    dropdownMenu.addEventListener("change", async (event) => {
        const selectedOption = event.target.value;
        
        if (selectedOption === "upload") {
            handleFileUpload();
        } else {
            try {
                const response = await fetch(selectedOption);
                if (!response.ok) throw new Error("Failed to load file");
                const files = await response.json();
                displayFiles(files);
            } catch (error) {
                console.error("Error loading selected file:", error);
            }
        }
    });
    
    function handleFileUpload() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const data = JSON.parse(reader.result);
                        uploadedFiles[file.name] = data;
                        displayFiles(data);
                        addDropdownOption("upload-" + file.name, file.name);
                    } catch (error) {
                        alert("Invalid JSON format");
                    }
                };
                reader.readAsText(file);
            }
        });
        fileInput.click();
    }
    
    function displayFiles(files) {
        fileList.innerHTML = "";
        if (files.length === 0) {
            noResults.style.display = "block";
            return;
        }
        noResults.style.display = "none";
        files.forEach((file) => {
            const a = document.createElement("a");
            a.href = file.url;
            a.classList.add("file-item");
            a.innerHTML = `<div>${file.name}</div><small>(${file.tags.join(", ")})</small>`;
            fileList.appendChild(a);
        });
    }
    
    await fetchGitHubFiles();
});
