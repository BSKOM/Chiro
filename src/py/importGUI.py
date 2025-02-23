import serial
import time
import csv
import threading
import tkinter as tk
from tkinter import messagebox

# ====== CONFIGURE YOUR SERIAL PORT HERE =======
SERIAL_PORT = 'COM3'   # Example: 'COM3' for Windows or '/dev/ttyUSB0' for Linux/Mac
BAUD_RATE = 9600       # Common baud rates: 9600, 4800, 19200
TIMEOUT = 1            # Timeout in seconds for serial read
DURATION = 30          # Duration in seconds (30 seconds for debugging)
READ_FREQUENCY = 4     # Read 4 times per second (every 0.25 seconds)

# ====== CSV FILE TO SAVE MEASUREMENTS =======
CSV_FILE = 'device_measurements.csv'

# ====== GLOBAL VARIABLES =======
collecting_data = False  # Control flag for data collection
device_type = "Caliper"  # Default device type

# ====== FUNCTION TO COLLECT DATA =======
def collect_device_data():
    global collecting_data
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=TIMEOUT)
        print(f"Connected to {SERIAL_PORT} at {BAUD_RATE} baud.")

        # Open CSV file
        with open(CSV_FILE, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            if device_type == "Caliper":
                csv_writer.writerow(['Timestamp', 'Caliper Measurement (mm)'])
            else:
                csv_writer.writerow(['Timestamp', 'Micrometer Measurement (mm)'])

            start_time = time.time()
            while collecting_data and (time.time() - start_time) < DURATION:
                raw_data = ser.readline().decode('utf-8', errors='ignore').strip()
                if raw_data:
                    timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                    print(f"[{timestamp}] Measurement: {raw_data}")

                    # Update GUI with latest measurement
                    measurement_label.config(text=f"{device_type} Measurement: {raw_data} mm")

                    # Write data to CSV
                    csv_writer.writerow([timestamp, raw_data])
                time.sleep(1 / READ_FREQUENCY)

        ser.close()
        print("\n✅ Data collection complete.")

    except serial.SerialException as e:
        messagebox.showerror("Serial Error", f"⚠️ Error connecting to {SERIAL_PORT}: {e}")
    except Exception as e:
        messagebox.showerror("Error", f"⚠️ Unexpected error: {e}")

# ====== START DATA COLLECTION THREAD =======
def start_collection():
    global collecting_data, device_type
    device_type = device_var.get()
    if not device_type:
        messagebox.showwarning("Device Selection", "Please select a device type before starting data collection.")
        return
    
    collecting_data = True
    start_button.config(state=tk.DISABLED)
    stop_button.config(state=tk.NORMAL)

    # Run data collection in a separate thread to keep GUI responsive
    threading.Thread(target=collect_device_data, daemon=True).start()

# ====== STOP DATA COLLECTION =======
def stop_collection():
    global collecting_data
    collecting_data = False
    start_button.config(state=tk.NORMAL)
    stop_button.config(state=tk.DISABLED)
    messagebox.showinfo("Info", "Data collection stopped.")

# ====== GUI SETUP =======
root = tk.Tk()
root.title("RS232 Device Data Logger")
root.geometry("400x300")
root.resizable(False, False)

# Title Label
title_label = tk.Label(root, text="Device Data Logger (Caliper/Micrometer)", font=("Arial", 14, "bold"))
title_label.pack(paddy=10)

# Device Selection
device_var = tk.StringVar()
device_var.set("Caliper")  # Default selection

device_frame = tk.Frame(root)
device_frame.pack(paddy=5)

tk.Label(device_frame, text="Select Device:", font=("Arial", 12)).pack(anchor=tk.W)
tk.Radiobutton(device_frame, text="Caliper", variable=device_var, value="Caliper", font=("Arial", 11)).pack(anchor=tk.W)
tk.Radiobutton(device_frame, text="Micrometer", variable=device_var, value="Micrometer", font=("Arial", 11)).pack(anchor=tk.W)

# Measurement Display
measurement_label = tk.Label(root, text="Measurement: -- mm", font=("Arial", 12))
measurement_label.pack(paddy=10)

# Start Button
start_button = tk.Button(root, text="Start", font=("Arial", 12), command=start_collection)
start_button.pack(paddy=5)

# Stop Button
stop_button = tk.Button(root, text="Stop", font=("Arial", 12), command=stop_collection, state=tk.DISABLED)
stop_button.pack(paddy=5)

# Run GUI loop
root.mainloop()
