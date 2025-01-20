const entriesContainer = document.getElementById("entries-container");
const output = document.getElementById("output");
const uploadInput = document.getElementById("upload-json");

document.addEventListener("DOMContentLoaded", () => {
    addEntry(); // Start with one entry
});

// Add new entry
document.getElementById("add-entry").addEventListener("click", () => {
    addEntry();
});

// Add entry function
function addEntry() {
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.innerHTML = `
        <label>Name: <input type="text" class="name"></label><br>
        <label>URL: <input type="text" class="url"></label><br>
        <label>Tags (comma-separated): <input type="text" class="tags"></label><br>
        <label>Invisible Tags (comma-separated): <input type="text" class="inviTags"></label><br>
        <button class="remove-entry">Remove</button>
    `;
    const removeButton = entry.querySelector(".remove-entry");

    removeButton.addEventListener("click", () => {
        if (entriesContainer.children.length > 1) {
            entry.remove(); // Remove only if more than one entry exists
        }
    });

    entriesContainer.appendChild(entry);
    updateRemoveButtonState();
}

// Update entry count and disable remove button if necessary
function updateRemoveButtonState() {
    const removeButtons = entriesContainer.querySelectorAll('.remove-entry');
    removeButtons.forEach(button => {
        if (entriesContainer.children.length === 1) {
            button.disabled = true;
            button.style.backgroundColor = "#ccc"; // Grey out the button
            button.style.cursor = "not-allowed"; // Prevent cursor from showing clickable
        } else {
            button.disabled = false;
            button.style.backgroundColor = ""; // Reset button color
            button.style.cursor = ""; // Reset cursor style
        }
    });
}

// Ensure remove buttons are updated whenever DOM changes
entriesContainer.addEventListener('DOMSubtreeModified', updateRemoveButtonState);

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

// Copy JSON to clipboard
document.getElementById("copy-btn").addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    alert("JSON copied to clipboard!");
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
