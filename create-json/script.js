const entriesContainer = document.getElementById("entries-container");
const output = document.getElementById("output");
const uploadInput = document.getElementById("upload-json");

// Add new entry
document.getElementById("add-entry").addEventListener("click", () => {
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.innerHTML = `
        <label>Name: <input type="text" class="name"></label><br>
        <label>URL: <input type="text" class="url"></label><br>
        <label>Tags (comma-separated): <input type="text" class="tags"></label><br>
        <label>Invisible Tags (comma-separated): <input type="text" class="inviTags"></label><br>
        <button class="remove-entry">Remove</button>
    `;
    entry.querySelector(".remove-entry").addEventListener("click", () => entry.remove());
    entriesContainer.appendChild(entry);
});

// Generate JSON
document.getElementById("generate-json").addEventListener("click", () => {
    const entries = [];
    entriesContainer.querySelectorAll(".entry").forEach(entry => {
        const name = entry.querySelector(".name").value.trim();
        const url = entry.querySelector(".url").value.trim();
        const tags = entry.querySelector(".tags").value.split(",").map(tag => tag.trim());
        const inviTags = entry.querySelector(".inviTags").value.split(",").map(tag => tag.trim());
        if (name && url) {
            entries.push({ name, url, tags, inviTags });
        }
    });
    const jsonString = JSON.stringify(entries, null, 4);
    output.value = jsonString;
});

// Download JSON
document.getElementById("download-json").addEventListener("click", () => {
    const blob = new Blob([output.value], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "entries.json";
    link.click();
});

// Upload JSON
document.getElementById("upload-btn").addEventListener("click", () => {
    uploadInput.click();
});

uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                if (Array.isArray(data)) {
                    entriesContainer.innerHTML = ""; // Clear existing entries
                    data.forEach(item => {
                        const entry = document.createElement("div");
                        entry.className = "entry";
                        entry.innerHTML = `
                            <label>Name: <input type="text" class="name" value="${item.name || ""}"></label><br>
                            <label>URL: <input type="text" class="url" value="${item.url || ""}"></label><br>
                            <label>Tags (comma-separated): <input type="text" class="tags" value="${(item.tags || []).join(", ")}"></label><br>
                            <label>Invisible Tags (comma-separated): <input type="text" class="inviTags" value="${(item.inviTags || []).join(", ")}"></label><br>
                            <button class="remove-entry">Remove</button>
                        `;
                        entry.querySelector(".remove-entry").addEventListener("click", () => entry.remove());
                        entriesContainer.appendChild(entry);
                    });
                } else {
                    alert("Invalid JSON format. Expected an array of objects.");
                }
            } catch (e) {
                alert("Error parsing JSON file.");
            }
        };
        reader.readAsText(file);
    }
});

// Update GitHub file
document.getElementById("update-github").addEventListener("click", () => {
    const accessToken = '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';
    const owner = 'mertekca';
    const repo = 'archive.mertek.ca';
    const path = 'files/website/entries.json';

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        const jsonContent = output.value.trim();
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update JSON file',  // Commit message
                content: btoa(jsonContent),  // Base64 encode the new content
                sha: data.sha  // Ensure correct file version is updated
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('File updated successfully!');
            console.log(data);
        })
        .catch(error => {
            alert('Error updating file');
            console.error('Error:', error);
        });
    })
    .catch(error => {
        alert('Error fetching file');
        console.error('Error:', error);
    });
});
