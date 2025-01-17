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
    "name": "Unknown Journey",
    "url": "/files/unknown-journey/",
    "tags": ["journey", "mystery"]
    },
    {
    "name": "Memoirs of a Wanderer",
    "url": "/files/memoirs-of-a-wanderer/",
    "tags": ["memoir", "adventure"]
    },
    {
    "name": "The Grand Voyage",
    "url": "/files/the-grand-voyage/",
    "tags": ["voyage", "epic"]
    },
    {
    "name": "Tales of the Sea",
    "url": "/files/tales-of-the-sea/",
    "tags": ["sea", "adventure"]
    },
    {
    "name": "The Last Recollection",
    "url": "/files/the-last-recollection/",
    "tags": ["memoir", "reflection"]
    },
    {
    "name": "Exploration of the Wild",
    "url": "/files/exploration-of-the-wild/",
    "tags": ["exploration", "nature"]
    },
    {
    "name": "Epic of the Lost City",
    "url": "/files/epic-of-the-lost-city/",
    "tags": ["epic", "mystery"]
    },
    {
    "name": "A Personal Quest",
    "url": "/files/a-personal-quest/",
    "tags": ["quest", "journey"]
    },
    {
    "name": "Adventures in Time",
    "url": "/files/adventures-in-time/",
    "tags": ["adventure", "time"]
    },
    {
    "name": "Uncharted Worlds",
    "url": "/files/uncharted-worlds/",
    "tags": ["exploration", "space"]
    },
    {
    "name": "The Great Expedition",
    "url": "/files/the-great-expedition/",
    "tags": ["expedition", "discovery"]
    },
    {
    "name": "Reflections of the Past",
    "url": "/files/reflections-of-the-past/",
    "tags": ["reflection", "history"]
    },
    {
    "name": "Echoes of the Journey",
    "url": "/files/echoes-of-the-journey/",
    "tags": ["journey", "echoes"]
    },
    {
    "name": "Legends of the Lost",
    "url": "/files/legends-of-the-lost/",
    "tags": ["legends", "myth"]
    },
    {
    "name": "Into the Wild Unknown",
    "url": "/files/into-the-wild-unknown/",
    "tags": ["wild", "adventure"]
    },
    {
    "name": "The Chronicles",
    "url": "/files/the-chronicles/",
    "tags": ["chronicles", "document"]
    },
    {
    "name": "Quest for the Forgotten",
    "url": "/files/quest-for-the-forgotten/",
    "tags": ["quest", "forgotten"]
    },
    {
    "name": "Sailing Through Time",
    "url": "/files/sailing-through-time/",
    "tags": ["time", "sailing"]
    },
    {
    "name": "The Mysterious Voyage",
    "url": "/files/the-mysterious-voyage/",
    "tags": ["mysterious", "voyage"]
    },
    {
    "name": "Whispers from the Past",
    "url": "/files/whispers-from-the-past/",
    "tags": ["whispers", "history"]
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
