document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("fileSelector");
    const searchBar = document.getElementById("searchBar");
    const fileInputTemplate = document.createElement("input");
    let uploadedFiles = {}; // Store uploaded files by dropdown key
    fileInputTemplate.type = "file";
    fileInputTemplate.accept = ".json"; // Restrict file types to JSON

    // Ensure required elements exist
    if (!dropdownMenu || !searchBar) {
        console.error("Required elements are missing.");
        return;
    }

    // Load files
    async function loadFiles(fileUrl = "json-files/main.json") {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileUrl}`);
            }

            const files = await response.json();
            displayFiles(files);

            searchBar.addEventListener("input", () => {
                searchFiles(files);
            });

            searchFiles(files);
        } catch (error) {
            console.error("Error loading files:", error);
            document.getElementById("fileList").innerHTML =
                '<p>Failed to load files.</p>';
        }
    }

    // Search files
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(
            (file) =>
                file.name.toLowerCase().includes(query) ||
                file.tags.some((tag) => tag.toLowerCase().includes(query)) ||
                file.inviTags.some((tag) => tag.toLowerCase().includes(query))
        );

        const fileList = document.getElementById("fileList");
        const noResults = document.getElementById("noResults");
        const resultCount = document.getElementById("resultCount"); // Element to display result count
        fileList.innerHTML = "";

        if (query === "") {
            resultCount.style.display = "none"; // Hide result count if no search query
        } else if (filteredFiles.length > 0) {
            noResults.style.display = "none"; // Hide "no results" message
            resultCount.style.display = "block"; // Show the result count

            // Show proper result text ("Result" or "Results")
            const resultText = filteredFiles.length === 1 ? "Result" : "Results";
            resultCount.textContent = `${filteredFiles.length} ${resultText} found`; // Display the number of results
            filteredFiles.forEach((file) => {
                const a = document.createElement("a");
                a.href = file.url;
                a.classList.add("file-item");
                a.innerHTML = `
                    <div>${file.name}</div>
                    <small>(${file.tags.join(", ")})</small>
                `;
                fileList.appendChild(a);
            });
        } else {
            noResults.style.display = "block"; // Show "no results" message
            resultCount.style.display = "none"; // Hide the result count when there are no results
        }
    }

    // Display files
    function displayFiles(files) {
        const fileList = document.getElementById("fileList");
        const resultCount = document.getElementById("resultCount"); // Element to display result count
        fileList.innerHTML = "";
        resultCount.style.display = "none"; // Hide the result count initially

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

    // Dropdown change event
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

    // Handle file upload
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

    // Add new upload option
    function addUploadOption() {
        const newKey = `upload-${Object.keys(uploadedFiles).length + 1}`;
        const option = document.createElement("option");
        option.value = newKey;
        option.textContent = "Upload File";
        dropdownMenu.appendChild(option);
    }

    // Initial load
    loadFiles();
});
