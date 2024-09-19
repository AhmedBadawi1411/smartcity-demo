import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';
import fs from 'fs';

const lon = 13.137822;
const lat = 32.834387;
// Calculate __filename and __dirname in ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define path to the data file
const filePath = join(__dirname, 'data', 'json', 'apiJsons', 'airQuality.json');

async function fetchDataAndSave() {
    try {
        console.log('Fetching data...');
        // Fetch data from API
        const response = await fetch(`https://air-quality.p.rapidapi.com/current/airquality?lon=${lon}&lat=${lat}`,{
            method:"GET",
            headers:{
                "x-rapidapi-key": "c7a6f82089msh1d076723e6d9035p1fa535jsn8650615730e1",
                "x-rapidapi-host": "air-quality.p.rapidapi.com"
            }
        });
        const data = await response.json();

        // Add lastSync property to data
        const currentdate = new Date(); 
        const datetime = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

        data.lastSync = datetime;

        // Save data to JSON file
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`Data fetched and saved successfully with last sync timestamp: ${datetime}`);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval(fetchDataAndSave, 3600000);

fetchDataAndSave();
