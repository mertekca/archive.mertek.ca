// Function to fetch the JSON data and initialize the file list
async function loadFiles() {
    try {
        // Fetch the JSON file
        const response = await fetch('entries.json');
        if (!response.ok) {
            throw new Error('Failed to load entries.json');
        }

        // Parse the JSON data
        const files = await response.json();

        // Display files
        displayFiles(files);

        // Listen for input changes and trigger search
        document.getElementById('searchBar').addEventListener('input', () => {
            searchFiles(files);
        });

        // Initial display of all files
        searchFiles(files);
    } catch (error) {
        console.error('Error loading files:', error);
        document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
    }
}

// Function to filter and display files based on search query
function searchFiles(files) {
    const query = document.getElementById('searchBar').value.toLowerCase();
    let filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(query) || 
        file.tags.some(tag => tag.toLowerCase().includes(query)) ||
        file.inviTags.some(tag => tag.toLowerCase().includes(query))
    );

    // Sort files alphabetically by name
    filteredFiles = filteredFiles.sort((a, b) => a.name.localeCompare(b.name));

    // Get the file list container
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear previous results

    // Display matching files
    filteredFiles.forEach(file => {
        const a = document.createElement('a');
        a.href = file.url;
        a.classList.add('file-item'); // Apply styling
        a.innerHTML = `
            <div>${file.name}</div>
            <small>(${file.tags.join(', ')})</small>
        `;
        fileList.appendChild(a);
    });
}

// Function to display files initially
function displayFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear previous results

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

// Load files on page load
loadFiles();
