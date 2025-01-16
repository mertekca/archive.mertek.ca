// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "Free Write 1", "url": "/files/pdf/fw1.pdf", "tags": ["pdf", "document"] },
    { "name": "Free Write 2", "url": "/files/pdf/fw2.pdf", "tags": ["pdf", "document"] },
    { "name": "Free Write 3", "url": "/files/pdf/fw3.pdf", "tags": ["pdf", "document"] }
];

// Function to filter files based on search query
function searchFiles() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(query) || file.tags.some(tag => tag.toLowerCase().includes(query))
    );

    // Get the file list container
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear previous results

    // Display matching files
    if (filteredFiles.length > 0) {
        filteredFiles.forEach(file => {
            const a = document.createElement('a');
            a.href = file.url;
            a.download = '';
            a.classList.add('file-item');
            a.innerHTML = `<strong>${file.name}</strong><br>(${file.tags.join(', ')})`;
            fileList.appendChild(a);
        });
        document.getElementById('noResults').style.display = 'none';
    } else {
        document.getElementById('noResults').style.display = 'block';
    }
}

// Listen for input changes and trigger search
document.getElementById('searchBar').addEventListener('input', searchFiles);

// Initial display of all files
searchFiles();
