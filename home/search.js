document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.getElementById('fileSelector');
    const searchBar = document.getElementById('searchBar');
    const fileInput = document.getElementById('fileInput');
    const noResults = document.getElementById('noResults');
    const fileList = document.getElementById('fileList');

    let lastSelectedFile = "https://archive.mertek.ca/home/json-files/main.json";

    // Verify required elements
    if (!dropdownMenu || !searchBar || !fileInput || !noResults || !fileList) {
        console.error('Required elements are missing.');
        return;
    }

    // Load files from a given URL
    async function loadFiles(fileUrl = lastSelectedFile) {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error(`Failed to load ${fileUrl}`);

            const files = await response.json();
            displayFiles(files);

            searchBar.addEventListener('input', () => searchFiles(files));
            searchFiles(files);
        } catch (error) {
            console.error('Error loading files:', error);
            fileList.innerHTML = '<p>Failed to load files.</p>';
        }
    }

    // Display files
    function displayFiles(files) {
        fileList.innerHTML = '';
        files.forEach(file => {
            const a = document.createElement('a');
            a.href = file.url;
            a.classList.add('file-item');
            a.innerHTML = `<div>${file.name}</div><small>(${file.tags.join(', ')})</small>`;
            fileList.appendChild(a);
        });
    }

    // Search files
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(file =>
            file.name.toLowerCase().includes(query) ||
            file.tags.some(tag => tag.toLowerCase().includes(query))
        );

        fileList.innerHTML = '';
        if (filteredFiles.length > 0) {
            noResults.style.display = 'none';
            filteredFiles.forEach(file => {
                const a = document.createElement('a');
                a.href = file.url;
                a.classList.add('file-item');
                a.innerHTML = `<div>${file.name}</div><small>(${file.tags.join(', ')})</small>`;
                fileList.appendChild(a);
            });
        } else {
            noResults.style.display = 'block';
        }
    }

    // Handle dropdown changes
    dropdownMenu.addEventListener('change', (event) => {
        const selectedOption = event.target.value;

        if (selectedOption === "upload") {
            fileInput.click();
            dropdownMenu.value = lastSelectedFile;
        } else {
            lastSelectedFile = selectedOption;
            loadFiles(selectedOption);
        }
    });

    // Handle file upload
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const uploadedData = JSON.parse(reader.result);
                    displayFiles(uploadedData);
                } catch (error) {
                    alert("Invalid JSON format in the uploaded file.");
                }
            };
            reader.readAsText(file);
        }
    });

    // Initial load
    loadFiles();
});
