// Sample file metadata (in a real project, this could be loaded from a JSON file)
const files = [
    { "name": "First Day", "url": "/files/first-day/", "tags": ["memoir", "document"] },
    { "name": "Free Write 1", "url": "/files/free-write-1/", "tags": ["free write", "document"] },
    { "name": "Free Write 2", "url": "/files/free-write-2/", "tags": ["free write", "document"] },
    { "name": "Presentation 1", "url": "/files/presentation-1/", "tags": ["presentation", "slideshow"] }
];

 // Get the file list container and the no files message
    const fileList = document.getElementById('fileList');
    const noFilesMessage = document.getElementById('noFilesMessage');

    fileList.innerHTML = ''; // Clear previous results
    noFilesMessage.style.display = 'none'; // Hide the no files message

    // Display matching files
    if (filteredFiles.length === 0) {
        // Show the "No files found" message
        noFilesMessage.style.display = 'block';
    } else {
        filteredFiles.forEach(file => {
            const div = document.createElement('div');
            div.classList.add('file-item');
            div.innerHTML = `<a href="${file.url}" download>${file.name}</a><br>(${file.tags.join(', ')})`;
            fileList.appendChild(div);
        });
    }
}

// Listen for input changes and trigger search
document.getElementById('searchBar').addEventListener('input', searchFiles);

// Initial display of all files
searchFiles();
