// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "First Day", "url": "/files/first-day/", "tags": ["memoir", "document"] },
    { "name": "Free Write 1", "url": "/files/free-write-1/", "tags": ["free write", "document"] },
    { "name": "Free Write 2", "url": "/files/free-write-2/", "tags": ["free write", "document"] },
    { "name": "Presentation 1", "url": "/files/presentation-1/", "tags": ["presentation", "slideshow"] }
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
