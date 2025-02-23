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
CSV_FILE = 'caliper_measurements.csv'

# ====== GLOBAL VARIABLES =======
collecting_data = False  # Control flag for data collection

# ====== FUNCTION TO COLLECT DATA =======
def collect_caliper_data():
    global collecting_data
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=TIMEOUT)
        print(f"Connected to {SERIAL_PORT} at {BAUD_RATE} baud.")

        # Open CSV file
        with open(CSV_FILE, 'w', newline='') as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow(['Timestamp', 'Measurement (mm)'])

            start_time = time.time()
            while collecting_data and (time.time() - start_time) < DURATION:
                raw_data = ser.readline().decode('utf-8', errors='ignore').strip()
                if raw_data:
                    timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
                    print(f"[{timestamp}] Measurement: {raw_data}")

                    # Update GUI with latest measurement
                    measurement_label.config(text=f"Measurement: {raw_data} mm")

                    # Write data to CSV
                    csv_writer.writerow([timestamp, raw_data])
                time.sleep(1 / READ_FREQUENCY)  # Wait 0.25 seconds between reads

        ser.close()
        print("\n✅ Data collection complete.")

    except serial.SerialException as e:
        messagebox.showerror("Serial Error", f"⚠️ Error connecting to {SERIAL_PORT}: {e}")
    except Exception as e:
        messagebox.showerror("Error", f"⚠️ Unexpected error: {e}")

# ====== START DATA COLLECTION THREAD =======
def start_collection():
    global collecting_data
    collecting_data = True
    start_button.config(state=tk.DISABLED)
    stop_button.config(state=tk.NORMAL)

    # Run data collection in a separate thread to keep GUI responsive
    threading.Thread(target=collect_caliper_data, daemon=True).start()

# ====== STOP DATA COLLECTION =======
def stop_collection():
    global collecting_data
    collecting_data = False
    start_button.config(state=tk.NORMAL)
    stop_button.config(state=tk.DISABLED)
    messagebox.showinfo("Info", "Data collection stopped.")

# ====== GUI SETUP =======
root = tk.Tk()
root.title("RS232 Caliper Data Logger")
root.geometry("400x200")
root.resizable(False, False)

# Title Label
title_label = tk.Label(root, text="Caliper Data Logger", font=("Arial", 14, "bold"))
title_label.pack(pady=10)

# Measurement Display
measurement_label = tk.Label(root, text="Measurement: -- mm", font=("Arial", 12))
measurement_label.pack(pady=10)

# Start Button
start_button = tk.Button(root, text="Start", font=("Arial", 12), command=start_collection)
start_button.pack(pady=5)

# Stop Button
stop_button = tk.Button(root, text="Stop", font=("Arial", 12), command=stop_collection, state=tk.DISABLED)
stop_button.pack(pady=5)

# Run GUI loop
root.mainloop()
