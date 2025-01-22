document.addEventListener('DOMContentLoaded', () => {
    // Dropdown and Search Bar Initialization
    const dropdown = document.getElementById('fileSelector');
    const searchBar = document.getElementById('searchBar');

    // Verify existence of elements
    if (!dropdown || !searchBar) {
        console.error('Required elements are missing.');
        return;
    }

    // Load Files Function
    async function loadFiles(fileUrl = 'https://archive.mertek.ca/home/json-files/main.json') {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileUrl}`);
            }

            const files = await response.json();
            displayFiles(files);

            searchBar.addEventListener('input', () => {
                searchFiles(files);
            });

            searchFiles(files);
        } catch (error) {
            console.error('Error loading files:', error);
            document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
        }
    }

    // Search Files
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(file =>
            file.name.toLowerCase().includes(query) ||
            file.tags.some(tag => tag.toLowerCase().includes(query)) ||
            file.inviTags.some(tag => tag.toLowerCase().includes(query))
        );

        const fileList = document.getElementById('fileList');
        const noResults = document.getElementById('noResults');
        fileList.innerHTML = '';
    
        if (filteredFiles.length > 0) {
            noResults.style.display = 'none'; // Hide "no results" message
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
            noResults.style.display = 'block'; // Show "no results" message
        }
    }

    // Display Files
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

    // Handle the dropdown change event
dropdownMenu.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === "upload") {
        // Trigger file upload input
        fileInput.click();
        dropdownMenu.value = lastSelectedFile; // Reset to last selected file
    } else {
        // Switch files based on selection
        lastSelectedFile = selectedOption; // Update last selected
        loadFiles(selectedOption);
    }
});

// Handle file input change event
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const uploadedData = JSON.parse(reader.result);
                    displayFiles(uploadedData); // Display uploaded data
                } catch (error) {
                    alert("Invalid JSON format in the uploaded file.");
                }
            };
            reader.readAsText(file);
        }
    });

    // Initial Load
    loadFiles();
});
