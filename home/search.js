// Function to fetch the JSON data and initialize the file list
async function loadFiles(fileUrl = 'https://archive.mertek.ca/home/json-files/main.json') {
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Failed to load ${fileUrl}`);
        }

        const files = await response.json();
        displayFiles(files);

        document.getElementById('searchBar').addEventListener('input', () => {
            searchFiles(files);
        });

        searchFiles(files);
    } catch (error) {
        console.error('Error loading files:', error);
        document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
    }
}

// Function to filter and display files based on search query
function searchFiles(files) {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query)) ||
        file.inviTags.some(tag => tag.toLowerCase().includes(query))
    );

    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    if (filteredFiles.length > 0) {
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
    } else {
        document.getElementById('noResults').style.display = 'block';
    }
}

// Function to display files initially
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

// Event listener for dropdown selection
document.getElementById('fileSelector').addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === 'upload') {
        document.getElementById('uploadInput').click();
    } else {
        loadFiles(selectedOption);
    }
});

// Handle file upload
document.getElementById('uploadInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                if (Array.isArray(data)) {
                    displayFiles(data);
                } else {
                    alert('Invalid JSON format. Expected an array of objects.');
                }
            } catch (e) {
                alert('Error parsing JSON file.');
            }
        };
        reader.readAsText(file);
    }
});

// Initialize with the default file
loadFiles();
