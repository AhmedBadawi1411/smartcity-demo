import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';
import fs from 'fs';

const lon = 13.137822;
const lat = 32.834387;

const app = express(); // إنشاء تطبيق Express
const port = process.env.PORT || 3000; // تعيين رقم المنفذ

//! app.get('/', (req, res) => {
//!     res.sendFile(join(__dirname, 'public/index.html'));
//!  });
  
// Calculate __filename and __dirname in ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define path to the data file
const filePath = join(__dirname, 'data', 'json', 'apiJsons', 'airQuality.json');

// Middleware لتقديم الملفات الثابتة
app.use(express.static('./public'));

// Endpoint لعرض بيانات جودة الهواء
app.get('/airquality', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// وظيفتك لجلب البيانات
async function fetchDataAndSave() {
    try {
        console.log('Fetching data...');
        const response = await fetch(`https://air-quality.p.rapidapi.com/current/airquality?lon=${lon}&lat=${lat}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "c7a6f82089msh1d076723e6d9035p1fa535jsn8650615730e1",
                "x-rapidapi-host": "air-quality.p.rapidapi.com"
            }
        });
        const data = await response.json();

        const currentdate = new Date(); 
        const datetime = `Last Sync: ${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        
        data.lastSync = datetime;

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

// تشغيل جلب البيانات كل ساعة
setInterval(fetchDataAndSave, 3600000);
fetchDataAndSave(); // تشغيل الوظيفة عند بدء الخادم

// بدء تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
