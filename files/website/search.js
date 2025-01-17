// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "First Day", "url": "/files/first-day/", "tags": ["memoir", "document"] },
    { "name": "Free Write 1", "url": "/files/free-write-1/", "tags": ["free write", "document"] },
    { "name": "Free Write 2", "url": "/files/free-write-2/", "tags": ["free write", "document"] },
    { "name": "Adventure 1", "url": "/files/adventure-1/", "tags": ["memoir", "document"] },
    { "name": "Memoir 2", "url": "/files/memoir-2/", "tags": ["free write", "memoir"] },
    { "name": "Presentation 3", "url": "/files/presentation-3/", "tags": ["slideshow", "research"] },
    { "name": "Free Write 4", "url": "/files/free-write-4/", "tags": ["free write", "document"] },
    { "name": "Volcano 5", "url": "/files/volcano-5/", "tags": ["research", "slideshow"] },
    { "name": "Ocean Tale 6", "url": "/files/ocean-tale-6/", "tags": ["memoir", "document"] },
    { "name": "Adventure 7", "url": "/files/adventure-7/", "tags": ["free write", "research"] },
    { "name": "Memoir 8", "url": "/files/memoir-8/", "tags": ["document", "memoir"] },
    { "name": "Presentation 9", "url": "/files/presentation-9/", "tags": ["slideshow", "free write"] },
    { "name": "Volcano 10", "url": "/files/volcano-10/", "tags": ["research", "memoir"] },
    { "name": "Presentation 1", "url": "/files/presentation-1/", "tags": ["presentation", "slideshow"] },
    { "name": "Volcanic Eruptions", "url": "/files/volcanic-eruptions/", "tags": ["presentation", "slideshow"] }
];

// Function to filter files based on search query
function searchFiles() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    let filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(query) || file.tags.some(tag => tag.toLowerCase().includes(query))
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

// Listen for input changes and trigger search
document.getElementById('searchBar').addEventListener('input', searchFiles);

// Initial display of all files
searchFiles();
