document.addEventListener("DOMContentLoaded", () => {
    async function loadFiles(url) {
        try {
            const response = await fetch(https://archive.mertek.ca/files/website/json-files/school.json);
            if (!response.ok) throw new Error('Failed to load JSON file.');

            const files = await response.json();
            displayFiles(files);

            const searchBar = document.getElementById('searchBar');
            if (searchBar) {
                searchBar.addEventListener('input', () => searchFiles(files));
            }

            searchFiles(files); // Initial display
        } catch (error) {
            console.error('Error loading files:', error);
            const fileList = document.getElementById('fileList');
            if (fileList) {
                fileList.innerHTML = '<p>Failed to load files.</p>';
            }
        }
    }

    function searchFiles(files) {
        const query = document.getElementById('searchBar')?.value.toLowerCase() || '';
        const filteredFiles = files.filter(file =>
            file.name.toLowerCase().includes(query) ||
            file.tags.some(tag => tag.toLowerCase().includes(query)) ||
            file.inviTags.some(tag => tag.toLowerCase().includes(query))
        ).sort((a, b) => a.name.localeCompare(b.name));

        const fileList = document.getElementById('fileList');
        if (!fileList) return;

        fileList.innerHTML = '';
        filteredFiles.forEach(file => {
            const a = document.createElement('a');
            a.href = file.url;
            a.classList.add('file-item');
            a.innerHTML = `<div>${file.name}</div><small>(${file.tags.join(', ')})</small>`;
            fileList.appendChild(a);
        });

        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = filteredFiles.length ? 'none' : 'block';
        }
    }

    function displayFiles(files) {
        const fileList = document.getElementById('fileList');
        if (!fileList) return;

        fileList.innerHTML = '';
        files.forEach(file => {
            const a = document.createElement('a');
            a.href = file.url;
            a.classList.add('file-item');
            a.innerHTML = `<div>${file.name}</div><small>(${file.tags.join(', ')})</small>`;
            fileList.appendChild(a);
        });
    }

    // Event listener to load selected files
    document.getElementById('fileSelector').addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            loadFiles(URL.createObjectURL(selectedFile));
        }
    });

    loadFiles('https://archive.mertek.ca/files/website/entries.json'); // Initial load
});
