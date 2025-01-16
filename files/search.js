// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "Free Write 1", "url": "https://free-write.mertek.ca/files/pdf/fw1.pdf", "tags": ["pdf", "document"] },
    { "name": "Free Write 2", "url": "https://free-write.mertek.ca/files/pdf/fw2.pdf", "tags": ["pdf", "document"] },
    { "name": "Free Write 3", "url": "https://free-write.mertek.ca/files/pdf/fw3.pdf", "tags": ["pdf", "document"] }
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
    filteredFiles.forEach(file => {
        const div = document.createElement('div');
        div.classList.add('file-item');
        div.innerHTML = `<a href="${file.url}" download>${file.name}</a><br>(${file.tags.join(', ')})`;
        fileList.appendChild(div);
    });
}

// Listen for input changes and trigger search
document.getElementById('searchBar').addEventListener('input', searchFiles);

// Initial display of all files
searchFiles();
