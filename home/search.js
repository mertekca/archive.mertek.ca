document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('fileSelector');
    const searchBar = document.getElementById('searchBar');
    const fileInput = document.getElementById('fileInput');
    const noResults = document.getElementById('noResults');

    let lastSelectedFile = 'json-files/main.json';

    // Load Files Function
    async function loadFiles(fileUrl = lastSelectedFile) {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error(`Failed to load ${fileUrl}`);

            const files = await response.json();
            displayFiles(files);

            searchBar.addEventListener('input', () => searchFiles(files));
            searchFiles(files); // Initial search display
        } catch (error) {
            console.error('Error loading files:', error);
            document.getElementById('fileList').innerHTML = '<p>Failed to load files.</p>';
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

    // Search Files
    function searchFiles(files) {
        const query = searchBar.value.toLowerCase();
        const filteredFiles = files.filter(file =>
            file.name.toLowerCase().includes(query) ||
            file.tags.some(tag => tag.toLowerCase().includes(query))
        );

        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';

        if (filteredFiles.length > 0) {
            noResults.style.display = 'none';
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
            noResults.style.display = 'block';
        }
    }

    // Handle dropdown selection
    dropdown.addEventListener('change', (event) => {
        const selectedOption = event.target.value;
    
        if (selectedOption === 'upload') {
            fileInput.click();
            // Force the dropdown to display the last selected option
            dropdown.value = lastSelectedFile;
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
                    alert('Invalid JSON format in the uploaded file.');
                }
            };
            reader.readAsText(file);
        }
    });

    // Initial Load
    loadFiles();
});
