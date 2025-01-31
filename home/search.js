document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("fileSelector");
    const searchBar = document.getElementById("searchBar");
    const fileList = document.getElementById("fileList");
    const noResults = document.getElementById("noResults");
    const resultCount = document.getElementById("resultCount");
    const fileInputTemplate = document.createElement("input");
    let uploadedFiles = {}; // Store uploaded files by dropdown key
    fileInputTemplate.type = "file";
    fileInputTemplate.accept = ".json"; // Restrict file types to JSON

    // Ensure required elements exist
    if (!dropdownMenu || !searchBar) {
        console.error("Required elements are missing.");
        return;
    }

    // Load files from the selected file URL
    async function loadFiles(fileUrl = "json-files/main.json") {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileUrl}`);
            }

            const files = await response.json();
            displayFiles(files);

            // Set up search functionality
            searchBar.addEventListener("input", () => {
                searchFiles(files);
            });

            searchFiles(files); // Trigger search to show all files by default
        } catch (error) {
            console.error("Error loading files:", error);
            fileList.innerHTML = '<p>Failed to load files.</p>';
        }
    }

    // Function to handle file search
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(
            (file) =>
                file.name.toLowerCase().includes(query) ||
                file.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                file.inviTags.some((tag) => tag.toLowerCase().includes(query))
        );

        fileList.innerHTML = ""; // Clear current file list
        resultCount.style.display = "none"; // Hide result count by default

        if (filteredFiles.length > 0) {
            noResults.style.display = "none"; // Hide "no results" message
            displayFiles(filteredFiles); // Display filtered files
            resultCount.style.display = "block"; // Show result count
            resultCount.textContent = `${filteredFiles.length} result${filteredFiles.length > 1 ? 's' : ''} found`;
        } else {
            noResults.style.display = "block"; // Show "no results" message if no files match
        }
    }

    // Function to display files in the file list
    function displayFiles(files) {
        files.forEach((file) => {
            const a = document.createElement("a");
            a.href = file.url;
            a.classList.add("file-item");
            a.innerHTML = `
                <div>${file.name}</div>
                <small>(${file.tags.join(", ")})</small>
            `;
            fileList.appendChild(a);
        });
    }

    // Handle file upload functionality
    function handleFileUpload(event, key) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result);
                    uploadedFiles[key] = data; // Store uploaded data
                    displayFiles(data); // Display uploaded data

                    // Update dropdown with the uploaded file name
                    const option = document.querySelector(`#fileSelector option[value="${key}"]`);
                    option.textContent = file.name;

                    // Automatically add a new upload option
                    addUploadOption();
                } catch (error) {
                    alert("Invalid JSON format in the uploaded file.");
                }
            };
            reader.readAsText(file);
        }
    }

    // Add new upload option to the dropdown
    function addUploadOption() {
        const newKey = `upload-${Object.keys(uploadedFiles).length + 1}`;
        const option = document.createElement("option");
        option.value = newKey;
        option.textContent = "Upload File";
        dropdownMenu.appendChild(option);
    }

    // Dropdown change event to handle file selection or upload
    dropdownMenu.addEventListener("change", (event) => {
        const selectedOption = event.target.value;

        if (selectedOption.startsWith("upload")) {
            const uploadedData = uploadedFiles[selectedOption];
            if (uploadedData) {
                // Reload the uploaded file if available
                displayFiles(uploadedData);
            } else {
                // Trigger new file input for this upload option
                const fileInput = fileInputTemplate.cloneNode();
                fileInput.addEventListener("change", (e) => handleFileUpload(e, selectedOption));
                fileInput.click();
            }
        } else {
            loadFiles(selectedOption); // Load selected file
        }
    });

    // Initial load of files
    loadFiles();
});
