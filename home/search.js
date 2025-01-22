document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("fileSelector");
    const searchBar = document.getElementById("searchBar");
    const fileInput = document.createElement("input");
    let lastSelectedFile = "json-files/main.json"; // Default file
    let uploadedFileContent = null; // Store uploaded file content
    fileInput.type = "file";
    fileInput.accept = ".json"; // Restrict file types to JSON

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
        fileList.innerHTML = "";

        if (filteredFiles.length > 0) {
            noResults.style.display = "none"; // Hide "no results" message
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
        }
    }

    // Display files
    function displayFiles(files) {
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = "";

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

        if (selectedOption === "upload") {
            if (uploadedFileContent) {
                // Reload the uploaded file if available
                displayFiles(uploadedFileContent);
            } else {
                // Trigger file input if no file was uploaded yet
                fileInput.click();
                dropdownMenu.value = lastSelectedFile; // Reset to last selected file
            }
        } else {
            lastSelectedFile = selectedOption; // Update last selected
            loadFiles(selectedOption); // Load selected file
        }
    });

    // Handle file input change event
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    uploadedFileContent = JSON.parse(reader.result);
                    displayFiles(uploadedFileContent); // Display uploaded data

                    // Update the dropdown to show the uploaded file name
                    const selectedOption = document.querySelector(
                        '#fileSelector option[value="upload"]'
                    );
                    selectedOption.textContent = file.name;
                    dropdownMenu.value = "upload"; // Keep the upload option selected
                } catch (error) {
                    alert("Invalid JSON format in the uploaded file.");
                }
            };
            reader.readAsText(file);
        }
    });

    // Initial load
    loadFiles();
});
