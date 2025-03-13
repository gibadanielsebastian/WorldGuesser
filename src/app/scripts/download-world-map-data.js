// This script downloads the world map TopoJSON data and saves it locally
// Run with: node scripts/download-world-map-data.js

const fs = require("fs");
const path = require("path");
const https = require("https");

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir, { recursive: true });
}

// URL for the world map TopoJSON data
const url = "https://unpkg.com/world-atlas@2/countries-110m.json";

console.log("Downloading world map data from:", url);

// Download the data
https
	.get(url, (res) => {
		let data = "";

		res.on("data", (chunk) => {
			data += chunk;
		});

		res.on("end", () => {
			try {
				// Parse the TopoJSON to validate it
				const topoJSON = JSON.parse(data);

				// Save the TopoJSON file
				const outputPath = path.join(publicDir, "countries-110m.json");
				fs.writeFileSync(outputPath, JSON.stringify(topoJSON, null, 2));

				console.log(
					"World map data has been downloaded and saved to:",
					outputPath
				);
				console.log("File size:", (data.length / 1024).toFixed(2), "KB");

				// Show some stats
				const countries = topoJSON.objects.countries.geometries.length;
				console.log("Number of countries:", countries);
			} catch (error) {
				console.error("Error processing data:", error);
			}
		});
	})
	.on("error", (err) => {
		console.error("Error downloading data:", err);
	});
