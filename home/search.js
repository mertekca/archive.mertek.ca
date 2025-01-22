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

    // Dropdown Change Handler
    dropdown.addEventListener('change', () => {
        const selectedFile = dropdown.value;
        if (selectedFile === 'upload') {
            // Handle file upload
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.addEventListener('change', event => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        const files = JSON.parse(e.target.result);
                        displayFiles(files);
                    };
                    reader.readAsText(file);
                }
            });
            input.click();
        } else {
            // Load selected file
            loadFiles(selectedFile);
        }
    });

    // Initial Load
    loadFiles();
});
