// ====== CONFIGURE SERIAL PORT HERE =======
const DURATION = 30000; // Duration in milliseconds (30 seconds)
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB storage limit for localStorage
let collectingData = false;
let deviceType = 'Caliper';

// ====== HANDLE SERIAL DATA COLLECTION WITH STORAGE OVERFLOW PROTECTION =======
async function collectDeviceData() {
    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        const csvHeader = deviceType === 'Caliper' ? 'Timestamp,Caliper Measurement (mm)\\n' : 'Timestamp,Micrometer Measurement (mm)\\n';
        let dataStorage = localStorage.getItem('deviceMeasurements') || csvHeader;

        const reader = port.readable.getReader();
        collectingData = true;

        const startTime = Date.now();
        while (collectingData && Date.now() - startTime < DURATION) {
            const { value, done } = await reader.read();
            if (done) break;

            const measurement = new TextDecoder().decode(value).trim();
            const timestamp = new Date().toISOString();
            const dataLine = `${timestamp},${measurement}\\n`;

            // Check storage size before adding new data
            const newDataSize = new Blob([dataStorage + dataLine]).size;
            if (newDataSize > MAX_STORAGE_SIZE) {
                alert('Storage limit reached. Data collection stopped to prevent overflow.');
                collectingData = false;
                break;
            }

            dataStorage += dataLine;
            localStorage.setItem('deviceMeasurements', dataStorage);
            document.getElementById('measurement').textContent = `${deviceType} Measurement: ${measurement} mm`;
        }

        reader.releaseLock();
        await port.close();
        alert('Data collection stopped. Data saved in local storage.');
    } catch (error) {
        alert(`Error accessing serial port: ${error}`);
    }
}

// ====== GUI INTERACTION =======
document.addEventListener('DOMContentLoaded', () => {
    const measurementLabel = document.getElementById('measurement');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');

    startBtn.addEventListener('click', async () => {
        const selectedDevice = document.querySelector('input[name="device"]:checked').value;
        if (!selectedDevice) {
            alert('Please select a device type before starting data collection.');
            return;
        }
        deviceType = selectedDevice;
        collectingData = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        await collectDeviceData();
    });

    stopBtn.addEventListener('click', () => {
        collectingData = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    // Load existing data from local storage if available
    const existingData = localStorage.getItem('deviceMeasurements');
    if (existingData) {
        console.log('Existing measurements from local storage:', existingData);
    }
});

// ====== INDEX.HTML (GUI) =======
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RS232 Device Data Logger</title>
</head>
<body>
    <h2>Device Data Logger (Caliper/Micrometer)</h2>
    <label><input type="radio" name="device" value="Caliper" checked> Caliper</label>
    <label><input type="radio" name="device" value="Micrometer"> Micrometer</label>
    <p id="measurement">Measurement: -- mm</p>
    <button id="startBtn">Start</button>
    <button id="stopBtn" disabled>Stop</button>
    <script src="app.js"></script>
</body>
</html>
*/

// ====== NOTES =======
// Added storage overflow protection with a 5MB limit for localStorage.
// If the limit is reached, data collection will stop automatically with an alert notification.