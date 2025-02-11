
export default function readTxt(measurements) {
    document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result.split("\n").slice(1); // Skip header
        const measurements = [];

        for (let row of data) {
            if (!row.trim()) continue;
            let parts = row.split(",");
            let measurement = parseInt(parts[2]); // Measurement in microns
            measurements.push(measurement);
        }

        visualizeData(measurements);
    };
    reader.readAsText(file);});
};