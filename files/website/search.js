// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "First Day",
    "url": "/files/first-day/", 
    "tags": ["memoir", "document"] 
    },
    { "name": "Volcanic Eruptions", 
    "url": "/files/volcanic-eruptions/",
    "tags": ["presentation", "slideshow"] 
    },
    {
    "name": "Journey",
    "url": "/files/journey/",
    "tags": ["journey", "adventure"]
    },
    {
    "name": "Memoir",
    "url": "/files/memoir/",
    "tags": ["memoir", "autobiography"]
    },
    {
    "name": "Voyage",
    "url": "/files/voyage/",
    "tags": ["voyage", "travel"]
    },
    {
    "name": "Tale",
    "url": "/files/tale/",
    "tags": ["tale", "story"]
    },
    {
    "name": "Recollection",
    "url": "/files/recollection/",
    "tags": ["recollection", "memoir"]
    },
    {
    "name": "Exploration",
    "url": "/files/exploration/",
    "tags": ["exploration", "discovery"]
    },
    {
    "name": "Epic",
    "url": "/files/epic/",
    "tags": ["epic", "legend"]
    },
    {
    "name": "Journey",
    "url": "/files/journey/",
    "tags": ["journey", "personal"]
    },
    {
    "name": "Quest",
    "url": "/files/quest/",
    "tags": ["quest", "adventure"]
    },
    {
    "name": "Adventure",
    "url": "/files/adventure/",
    "tags": ["adventure", "exploration"]
    }
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
