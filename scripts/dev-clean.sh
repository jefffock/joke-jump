#!/bin/bash

# Function to find and kill processes on specific ports
kill_port_processes() {
    local ports=("$@")
    for port in "${ports[@]}"; do
        # Find process using the port
        pid=$(lsof -ti :$port)
        if [ ! -z "$pid" ]; then
            echo "Found process using port $port (PID: $pid). Stopping it..."
            kill -9 $pid
            echo "Process stopped"
        else
            echo "No process found using port $port"
        fi
    done
}

# Vite commonly used ports
VITE_PORTS=(5173 5174)

echo "Checking for existing Vite development servers..."
kill_port_processes "${VITE_PORTS[@]}"

echo "Starting React development server..."
cd react-router-app && NODE_ENV=development npm run dev 