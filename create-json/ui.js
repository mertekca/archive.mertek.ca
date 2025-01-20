const jsonInput = document.getElementById('jsonInput');
const downloadBtn = document.getElementById('downloadBtn');
const uploadInput = document.getElementById('uploadInput');

// Download JSON file
downloadBtn.addEventListener('click', () => {
    const jsonData = jsonInput.value;
    try {
        JSON.parse(jsonData); // Validate JSON
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        alert('Invalid JSON data. Please check your input.');
    }
});

// Upload JSON file
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                jsonInput.value = JSON.stringify(jsonData, null, 2); // Beautify JSON
            } catch (error) {
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(file);
    }
});
