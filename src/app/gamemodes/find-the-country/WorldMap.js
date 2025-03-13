"use client";

import React, { useEffect, useState } from "react";

const WorldMap = ({
	onCountryClick,
	selectedCountry,
	targetCountry,
	showResult,
	isAnswerCorrect,
}) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Set loading to false after component mounts
		setLoading(false);
	}, []);

	// Get fill color for a country
	const getCountryFillColor = (code) => {
		if (!showResult) {
			return code === selectedCountry
				? "var(--main)"
				: "var(--foreground-muted)";
		}

		if (code === targetCountry) {
			return "var(--success)";
		}

		if (code === selectedCountry && !isAnswerCorrect) {
			return "var(--error)";
		}

		return "var(--foreground-muted)";
	};

	// Handle loading state
	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--main)]"></div>
			</div>
		);
	}

	// Handle error state
	if (error) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="bg-[var(--error)] bg-opacity-10 p-4 rounded-lg text-[var(--error)]">
					<p>Failed to load world map data: {error}</p>
					<p className="mt-2">Please check your connection and try again.</p>
				</div>
			</div>
		);
	}

	// Simple SVG map with major countries
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 500"
			width="1000"
			height="500"
			style={{ width: "1000px", height: "500px" }}
		>
			{/* Background */}
			<rect width="1000" height="500" fill="#D6EAF8" />

			{/* North America */}
			<path
				id="USA"
				d="M148 120 L280 120 L300 230 L200 250 L120 210 Z"
				fill={getCountryFillColor("USA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("USA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "USA" !== targetCountry && "USA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="USA"
			/>

			<path
				id="CAN"
				d="M150 50 L290 50 L280 119 L148 119 Z"
				fill={getCountryFillColor("CAN")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("CAN")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "CAN" !== targetCountry && "CAN" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="CAN"
			/>

			<path
				id="MEX"
				d="M150 231 L199 231 L220 280 L160 280 L130 250 Z"
				fill={getCountryFillColor("MEX")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("MEX")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "MEX" !== targetCountry && "MEX" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="MEX"
			/>

			{/* South America */}
			<path
				id="BRA"
				d="M250 300 L320 280 L350 350 L300 400 L240 370 Z"
				fill={getCountryFillColor("BRA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("BRA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "BRA" !== targetCountry && "BRA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="BRA"
			/>

			<path
				id="ARG"
				d="M240 371 L300 401 L290 470 L220 450 L210 400 Z"
				fill={getCountryFillColor("ARG")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("ARG")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "ARG" !== targetCountry && "ARG" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="ARG"
			/>

			{/* Europe */}
			<path
				id="GBR"
				d="M405 110 L420 110 L425 130 L410 135 L400 125 Z"
				fill={getCountryFillColor("GBR")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("GBR")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "GBR" !== targetCountry && "GBR" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="GBR"
			/>

			<path
				id="FRA"
				d="M410 135 L435 135 L445 160 L420 170 L405 150 Z"
				fill={getCountryFillColor("FRA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("FRA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "FRA" !== targetCountry && "FRA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="FRA"
			/>

			<path
				id="DEU"
				d="M435 120 L455 120 L465 145 L445 160 L435 145 Z"
				fill={getCountryFillColor("DEU")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("DEU")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "DEU" !== targetCountry && "DEU" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="DEU"
			/>

			<path
				id="ITA"
				d="M430 160 L445 160 L465 200 L450 210 L430 190 Z"
				fill={getCountryFillColor("ITA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("ITA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "ITA" !== targetCountry && "ITA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="ITA"
			/>

			<path
				id="ESP"
				d="M390 160 L420 160 L420 180 L390 190 L380 170 Z"
				fill={getCountryFillColor("ESP")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("ESP")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "ESP" !== targetCountry && "ESP" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="ESP"
			/>

			{/* Asia */}
			<path
				id="RUS"
				d="M450 50 L700 50 L700 150 L600 180 L500 150 L450 120 Z"
				fill={getCountryFillColor("RUS")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("RUS")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "RUS" !== targetCountry && "RUS" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="RUS"
			/>

			<path
				id="CHN"
				d="M600 151 L700 151 L720 220 L650 250 L580 220 Z"
				fill={getCountryFillColor("CHN")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("CHN")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "CHN" !== targetCountry && "CHN" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="CHN"
			/>

			<path
				id="IND"
				d="M580 190 L615 190 L630 250 L590 270 L550 240 Z"
				fill={getCountryFillColor("IND")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("IND")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "IND" !== targetCountry && "IND" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="IND"
			/>

			<path
				id="JPN"
				d="M730 160 L740 160 L745 190 L735 200 L725 180 Z"
				fill={getCountryFillColor("JPN")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("JPN")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "JPN" !== targetCountry && "JPN" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="JPN"
			/>

			{/* Oceania */}
			<path
				id="AUS"
				d="M700 320 L780 320 L790 370 L750 390 L690 370 Z"
				fill={getCountryFillColor("AUS")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("AUS")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "AUS" !== targetCountry && "AUS" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="AUS"
			/>

			{/* Africa */}
			<path
				id="ZAF"
				d="M470 350 L510 350 L520 380 L490 390 L460 370 Z"
				fill={getCountryFillColor("ZAF")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("ZAF")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "ZAF" !== targetCountry && "ZAF" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="ZAF"
			/>

			<path
				id="EGY"
				d="M470 190 L510 190 L520 220 L490 240 L460 220 Z"
				fill={getCountryFillColor("EGY")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("EGY")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "EGY" !== targetCountry && "EGY" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="EGY"
			/>

			<path
				id="NGA"
				d="M440 260 L470 260 L480 280 L460 290 L430 280 Z"
				fill={getCountryFillColor("NGA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("NGA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "NGA" !== targetCountry && "NGA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="NGA"
			/>

			{/* More European Countries */}
			<path
				id="PRT"
				d="M380 160 L390 160 L390 190 L380 195 L375 180 Z"
				fill={getCountryFillColor("PRT")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("PRT")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "PRT" !== targetCountry && "PRT" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="PRT"
			/>

			<path
				id="POL"
				d="M455 120 L470 120 L480 140 L465 145 L455 135 Z"
				fill={getCountryFillColor("POL")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("POL")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "POL" !== targetCountry && "POL" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="POL"
			/>

			<path
				id="UKR"
				d="M480 120 L510 120 L520 140 L495 150 L480 140 Z"
				fill={getCountryFillColor("UKR")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("UKR")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "UKR" !== targetCountry && "UKR" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="UKR"
			/>

			{/* More Asian Countries */}
			<path
				id="KOR"
				d="M715 170 L725 170 L730 185 L720 195 L710 180 Z"
				fill={getCountryFillColor("KOR")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("KOR")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "KOR" !== targetCountry && "KOR" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="KOR"
			/>

			<path
				id="IRN"
				d="M520 170 L550 170 L560 200 L540 210 L510 200 Z"
				fill={getCountryFillColor("IRN")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("IRN")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "IRN" !== targetCountry && "IRN" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="IRN"
			/>

			<path
				id="VNM"
				d="M660 220 L675 220 L680 250 L670 260 L655 245 Z"
				fill={getCountryFillColor("VNM")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("VNM")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "VNM" !== targetCountry && "VNM" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="VNM"
			/>

			<path
				id="THA"
				d="M640 220 L660 220 L670 245 L655 255 L635 245 Z"
				fill={getCountryFillColor("THA")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("THA")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "THA" !== targetCountry && "THA" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="THA"
			/>

			{/* More African Countries */}
			<path
				id="MAR"
				d="M400 190 L430 190 L435 210 L420 220 L390 210 Z"
				fill={getCountryFillColor("MAR")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("MAR")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "MAR" !== targetCountry && "MAR" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="MAR"
			/>

			<path
				id="ETH"
				d="M500 240 L520 240 L525 260 L510 270 L495 260 Z"
				fill={getCountryFillColor("ETH")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("ETH")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "ETH" !== targetCountry && "ETH" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="ETH"
			/>

			<path
				id="KEN"
				d="M495 260 L515 260 L520 280 L505 290 L490 280 Z"
				fill={getCountryFillColor("KEN")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("KEN")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "KEN" !== targetCountry && "KEN" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="KEN"
			/>

			{/* South American Countries */}
			<path
				id="COL"
				d="M220 280 L250 280 L260 310 L240 325 L215 305 Z"
				fill={getCountryFillColor("COL")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("COL")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "COL" !== targetCountry && "COL" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="COL"
			/>

			<path
				id="PER"
				d="M210 310 L240 310 L245 340 L220 360 L200 340 Z"
				fill={getCountryFillColor("PER")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("PER")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "PER" !== targetCountry && "PER" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="PER"
			/>

			<path
				id="CHL"
				d="M220 361 L240 361 L245 420 L230 430 L215 410 Z"
				fill={getCountryFillColor("CHL")}
				stroke="var(--background)"
				strokeWidth="1"
				onClick={() => onCountryClick("CHL")}
				style={{
					cursor: "pointer",
					transition: "fill 0.3s ease",
					opacity:
						showResult && "CHL" !== targetCountry && "CHL" !== selectedCountry
							? 0.5
							: 1,
				}}
				data-country="CHL"
			/>

			{/* Add Antarctica for visual completeness */}
			<path
				d="M400 460 L600 460 L600 490 L400 490 Z"
				fill="#FFFFFF"
				stroke="#CCCCCC"
				strokeWidth="1"
			/>
		</svg>
	);
};

export default WorldMap;
