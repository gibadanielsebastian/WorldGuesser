"use client";

// This is a simplified map generator that returns a basic SVG map
// with clickable country paths for the Find the Country game

// Sample country data with path coordinates for common countries
const countryPaths = {
	USA: {
		path: "M 150,120 L 250,120 L 250,180 L 150,180 Z",
		name: "United States",
	},
	CHN: {
		path: "M 600,150 L 670,150 L 670,200 L 600,200 Z",
		name: "China",
	},
	IND: {
		path: "M 580,200 L 630,200 L 630,240 L 580,240 Z",
		name: "India",
	},
	BRA: {
		path: "M 250,270 L 310,270 L 310,330 L 250,330 Z",
		name: "Brazil",
	},
	RUS: {
		path: "M 450,80 L 650,80 L 650,150 L 450,150 Z",
		name: "Russia",
	},
	JPN: {
		path: "M 720,160 L 740,160 L 740,190 L 720,190 Z",
		name: "Japan",
	},
	DEU: {
		path: "M 430,130 L 455,130 L 455,150 L 430,150 Z",
		name: "Germany",
	},
	GBR: {
		path: "M 400,120 L 420,120 L 420,135 L 400,135 Z",
		name: "United Kingdom",
	},
	FRA: {
		path: "M 410,140 L 435,140 L 435,160 L 410,160 Z",
		name: "France",
	},
	ITA: {
		path: "M 430,160 L 450,160 L 450,185 L 430,185 Z",
		name: "Italy",
	},
	CAN: {
		path: "M 150,80 L 250,80 L 250,119 L 150,119 Z",
		name: "Canada",
	},
	AUS: {
		path: "M 700,300 L 760,300 L 760,350 L 700,350 Z",
		name: "Australia",
	},
	ESP: {
		path: "M 390,160 L 415,160 L 415,180 L 390,180 Z",
		name: "Spain",
	},
	MEX: {
		path: "M 150,181 L 200,181 L 200,220 L 150,220 Z",
		name: "Mexico",
	},
	KOR: {
		path: "M 700,160 L 715,160 L 715,175 L 700,175 Z",
		name: "South Korea",
	},
	IDN: {
		path: "M 650,250 L 700,250 L 700,270 L 650,270 Z",
		name: "Indonesia",
	},
	TUR: {
		path: "M 480,170 L 510,170 L 510,190 L 480,190 Z",
		name: "Turkey",
	},
	SAU: {
		path: "M 500,200 L 550,200 L 550,240 L 500,240 Z",
		name: "Saudi Arabia",
	},
	ZAF: {
		path: "M 460,320 L 490,320 L 490,350 L 460,350 Z",
		name: "South Africa",
	},
	ARG: {
		path: "M 250,331 L 280,331 L 280,380 L 250,380 Z",
		name: "Argentina",
	},
	// Add medium difficulty countries
	POL: {
		path: "M 450,130 L 470,130 L 470,145 L 450,145 Z",
		name: "Poland",
	},
	UKR: {
		path: "M 480,140 L 510,140 L 510,160 L 480,160 Z",
		name: "Ukraine",
	},
	EGY: {
		path: "M 470,200 L 500,200 L 500,220 L 470,220 Z",
		name: "Egypt",
	},
	// More can be added as needed...
};

// Generate an SVG map with clickable countries
export function generateSVGMap() {
	// Create SVG content
	let svgContent = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 400" 
      width="800" 
      height="400" 
      style="background-color: #f0f0f0;"
    >
      <rect x="0" y="0" width="800" height="400" fill="#D6E8F5" />
  `;

	// Add country paths
	Object.entries(countryPaths).forEach(([code, data]) => {
		svgContent += `
      <path 
        id="${code}" 
        d="${data.path}" 
        fill="var(--foreground-muted)" 
        stroke="var(--background)" 
        stroke-width="1"
        data-country="${code}"
        data-name="${data.name}"
        style="cursor: pointer; transition: fill 0.3s ease;"
      />
    `;
	});

	// Close SVG tag
	svgContent += "</svg>";

	return svgContent;
}

// Export the list of country codes for reference
export const getCountryCodes = () => Object.keys(countryPaths);
