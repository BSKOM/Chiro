// Function to generate timestamp-based filename
function generateFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `micro_map_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.png`;
}

// Function to save canvas as PNG with timestamped filename
function saveCanvas() {

    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function() {
        const fileName = generateFileName();
        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
