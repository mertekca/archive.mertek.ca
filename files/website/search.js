// Load and display files from the selected JSON
async function loadFiles(selectedFile = 'school.json') {
    try {
        // Fetch the selected JSON file
        const response = await fetch(`https://archive.mertek.ca/files/website/json-files/${selectedFile}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${selectedFile}`);
        }

        // Parse the JSON data
        const files = await response.json();

        // Display files and initialize search
        displayFiles(files);
        searchFiles(files);

        // Listen for input changes and trigger search
        document.getElementById('searchBar').addEventListener('input', () => {
            searchFiles(files);
        });
    } catch (error) {
        console.error(`Error loading ${selectedFile}:`, error);
        document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
    }
}

// Handle file selection from the dropdown
document.getElementById('fileSelector').addEventListener('change', (event) => {
    const selectedFile = event.target.value;
    loadFiles(selectedFile); // Reload the file list based on the selection
});

// Filter and display files based on search query
function searchFiles(files) {
    const query = document.getElementById('searchBar').value.toLowerCase();
    let filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query)) ||
        file.inviTags.some(tag => tag.toLowerCase().includes(query))
    );

    filteredFiles.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear previous results

    filteredFiles.forEach(file => {
        const a = document.createElement('a');
        a.href = file.url;
        a.classList.add('file-item');
        a.innerHTML = `
            <div>${file.name}</div>
            <small>(${file.tags.join(', ')})</small>
        `;
        fileList.appendChild(a);
    });

    document.getElementById('noResults').style.display = filteredFiles.length === 0 ? 'block' : 'none';
}

// Initial load of the default file
loadFiles();
