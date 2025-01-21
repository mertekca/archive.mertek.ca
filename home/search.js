// Function to fetch the JSON data and initialize the file list
async function loadFiles(filePath = 'https://archive.mertek.ca/files/website/entries.json') {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        
        const files = await response.json();
        displayFiles(files); // Display the loaded files
        document.getElementById('searchBar').addEventListener('input', () => {
            searchFiles(files);
        });

        searchFiles(files); // Initial display
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
    }
}

// Function to display files
function displayFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach(file => {
        const a = document.createElement('a');
        a.href = file.url;
        a.classList.add('file-item');
        a.innerHTML = `
            <div>${file.name}</div>
            <small>(${file.tags.join(', ')})</small>
        `;
        fileList.appendChild(a);
    });
}

// Function to filter and display files based on search query
function searchFiles(files) {
    const query = document.getElementById('searchBar').value.toLowerCase();
    let filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query)) ||
        file.inviTags.some(tag => tag.toLowerCase().includes(query))
    );

    filteredFiles = filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    displayFiles(filteredFiles);
}

// Function to handle file selection and loading
function loadSelectedFile() {
    const fileSelect = document.getElementById('fileSelect');
    const selectedFile = fileSelect.value;
    if (selectedFile) {
        loadFiles(selectedFile); // Load the selected file
    }
}

// Add event listener for file selection
document.getElementById('fileSelect').addEventListener('change', loadSelectedFile);

// Load default file on page load
loadFiles();
