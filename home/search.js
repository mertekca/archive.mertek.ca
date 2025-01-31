document.addEventListener("DOMContentLoaded", () => {
    const dropdownMenu = document.getElementById("fileSelector");
    const searchBar = document.getElementById("searchBar");
    const fileList = document.getElementById("fileList");
    const noResults = document.getElementById("noResults");
    
    // Replace with your GitHub repository details
    const username = 'mertekca';
    const repository = 'archive.mertek.ca';
    const directory = 'home/json-files';  // Directory in the repository you want to list files from
    
    // GitHub API URL to fetch files from the directory
    const apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${directory}`;

    // Fetch files from GitHub repository
    async function fetchGitHubFiles() {
        try {
            const response = await fetch(apiUrl);
            const files = await response.json();

            // Add "Upload File" option to dropdown
            const uploadOption = document.createElement("option");
            uploadOption.value = "upload";
            uploadOption.textContent = "Upload File";
            dropdownMenu.appendChild(uploadOption);

            // Add files to the dropdown
            files.forEach((file) => {
                if (file.type === 'file') { // Ensure it's a file, not a directory
                    const option = document.createElement("option");
                    option.value = file.download_url;  // URL to download the file
                    option.textContent = file.name;  // Display the file name
                    dropdownMenu.appendChild(option);
                }
            });

            // Show "Upload File" option
            const uploadFileOption = document.createElement("option");
            uploadFileOption.value = "upload";
            uploadFileOption.textContent = "Upload File";
            dropdownMenu.appendChild(uploadFileOption);

            // Initialize file search
            searchBar.addEventListener("input", () => {
                searchFiles(files);
            });

            // Display files
            displayFiles(files);
        } catch (error) {
            console.error("Error fetching files from GitHub:", error);
            fileList.innerHTML = '<p>Failed to load files from GitHub.</p>';
        }
    }

    // Function to display the files based on search input
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(
            (file) => file.name.toLowerCase().includes(query)
        );

        fileList.innerHTML = "";

        if (filteredFiles.length > 0) {
            noResults.style.display = "none";
            filteredFiles.forEach((file) => {
                const a = document.createElement("a");
                a.href = file.download_url;
                a.classList.add("file-item");
                a.innerHTML = `
                    <div>${file.name}</div>
                    <small>(${file.size} bytes)</small>
                `;
                fileList.appendChild(a);
            });
        } else {
            noResults.style.display = "block";  // Show "no results" message
        }

        // Show result count
        const resultCount = document.getElementById("resultCount");
        resultCount.style.display = filteredFiles.length > 0 ? "block" : "none";
        if (filteredFiles.length === 1) {
            resultCount.textContent = `1 result`;
        } else if (filteredFiles.length > 1) {
            resultCount.textContent = `${filteredFiles.length} results`;
        }
    }

    // Function to display all files initially
    function displayFiles(files) {
        fileList.innerHTML = "";

        files.forEach((file) => {
            const a = document.createElement("a");
            a.href = file.download_url;
            a.classList.add("file-item");
            a.innerHTML = `
                <div>${file.name}</div>
                <small>(${file.size} bytes)</small>
            `;
            fileList.appendChild(a);
        });
    }

    // Dropdown change event to handle file selection
    dropdownMenu.addEventListener("change", (event) => {
        const selectedOption = event.target.value;

        if (selectedOption === "upload") {
            // Handle file upload (this part is unchanged from previous)
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".json"; // Accept JSON files
            fileInput.addEventListener("change", (e) => handleFileUpload(e));
            fileInput.click();
        } else {
            // Load selected file by URL
            displaySelectedFile(selectedOption);
        }
    });

    // Display selected file's contents
    function displaySelectedFile(fileUrl) {
        const fileList = document.getElementById("fileList");
        fileList.innerHTML = `<p>Loading file...</p>`;

        fetch(fileUrl)
            .then((response) => response.json())
            .then((fileContent) => {
                const fileContentDiv = document.createElement("div");
                fileContentDiv.classList.add("file-content");
                fileContentDiv.innerHTML = JSON.stringify(fileContent, null, 2);
                fileList.innerHTML = ""; // Clear existing content
                fileList.appendChild(fileContentDiv);
            })
            .catch((error) => {
                console.error("Error fetching file content:", error);
                fileList.innerHTML = `<p>Error loading file content.</p>`;
            });
    }

    // Initialize the page
    fetchGitHubFiles();
});
