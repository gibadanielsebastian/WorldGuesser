"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";
import { useSettings } from "../../contexts/SettingsContext";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function GuessTheFlag() {
	const { difficulty, soundEnabled } = useSettings();

	// Base time for different difficulty levels
	const difficultySettings = useMemo(
		() => ({
			easy: {
				timeLimit: 150,
				bonusTime: 7,
				countryCount: 100, // Use fewer countries for easy mode
			},
			medium: {
				timeLimit: 120,
				bonusTime: 5,
				countryCount: 150, // Use most countries for medium mode
			},
			hard: {
				timeLimit: 90,
				bonusTime: 3,
				countryCount: 195, // Use all countries for hard mode
			},
		}),
		[]
	);

	const countriesCodesArr = useMemo(
		() => [
			"AF",
			"AL",
			"DZ",
			"AD",
			"AO",
			"AG",
			"AR",
			"AM",
			"AU",
			"AT",
			"AZ",
			"BS",
			"BH",
			"BD",
			"BB",
			"BY",
			"BE",
			"BZ",
			"BJ",
			"BT",
			"BO",
			"BA",
			"BW",
			"BR",
			"BN",
			"BG",
			"BF",
			"BI",
			"CV",
			"KH",
			"CM",
			"CA",
			"CF",
			"TD",
			"CL",
			"CN",
			"CO",
			"KM",
			"CD",
			"CG",
			"CR",
			"CI",
			"HR",
			"CU",
			"CY",
			"CZ",
			"DK",
			"DJ",
			"DM",
			"DO",
			"EC",
			"EG",
			"SV",
			"GQ",
			"ER",
			"EE",
			"SZ",
			"ET",
			"FJ",
			"FI",
			"FR",
			"GA",
			"GM",
			"GE",
			"DE",
			"GH",
			"GR",
			"GD",
			"GT",
			"GN",
			"GW",
			"GY",
			"HT",
			"HN",
			"HU",
			"IS",
			"IN",
			"ID",
			"IR",
			"IQ",
			"IE",
			"IL",
			"IT",
			"JM",
			"JP",
			"JO",
			"KZ",
			"KE",
			"KI",
			"KP",
			"KR",
			"KW",
			"KG",
			"LA",
			"LV",
			"LB",
			"LS",
			"LR",
			"LY",
			"LI",
			"LT",
			"LU",
			"MG",
			"MW",
			"MY",
			"MV",
			"ML",
			"MT",
			"MH",
			"MR",
			"MU",
			"MX",
			"FM",
			"MD",
			"MC",
			"MN",
			"ME",
			"MA",
			"MZ",
			"MM",
			"NA",
			"NR",
			"NP",
			"NL",
			"NZ",
			"NI",
			"NE",
			"NG",
			"MK",
			"NO",
			"OM",
			"PK",
			"PW",
			"PS",
			"PA",
			"PG",
			"PY",
			"PE",
			"PH",
			"PL",
			"PT",
			"QA",
			"RO",
			"RU",
			"RW",
			"KN",
			"LC",
			"VC",
			"WS",
			"SM",
			"ST",
			"SA",
			"SN",
			"RS",
			"SC",
			"SL",
			"SG",
			"SK",
			"SI",
			"SB",
			"SO",
			"ZA",
			"SS",
			"ES",
			"LK",
			"SD",
			"SR",
			"SE",
			"CH",
			"SY",
			"TJ",
			"TZ",
			"TH",
			"TG",
			"TO",
			"TT",
			"TN",
			"TR",
			"TM",
			"TV",
			"UG",
			"UA",
			"AE",
			"GB",
			"US",
			"UY",
			"UZ",
			"VU",
			"VA",
			"VE",
			"VN",
			"YE",
			"ZM",
			"ZW",
			"PR",
		],
		[]
	);

	// Filter countries based on difficulty
	const activeCountries = useMemo(() => {
		const settings = difficultySettings[difficulty];

		// Easy mode - most common/recognizable countries
		const easyCountries = [
			"US",
			"GB",
			"FR",
			"DE",
			"IT",
			"ES",
			"RU",
			"CN",
			"JP",
			"AU",
			"CA",
			"BR",
			"IN",
			"MX",
			"ZA",
			"AR",
			"SE",
			"NO",
			"FI",
			"DK",
			"PT",
			"GR",
			"TR",
			"EG",
			"MA",
			"KE",
			"NG",
			"TH",
			"MY",
			"SG",
			"ID",
			"PH",
			"NZ",
			"CL",
			"PE",
			"CO",
			"VE",
			"CH",
			"AT",
			"BE",
			"NL",
			"IE",
			"PL",
			"UA",
			"CZ",
			"HU",
			"RO",
			"BG",
			"RS",
			"HR",
			"SI",
			"SK",
			"LT",
			"LV",
			"EE",
			"BY",
			"KZ",
			"IL",
			"SA",
			"AE",
			"QA",
			"KW",
			"IQ",
			"IR",
			"PK",
			"BD",
			"LK",
			"MM",
			"VN",
			"TW",
			"KR",
			"KP",
			"MN",
			"CU",
			"JM",
			"DO",
			"PR",
			"PA",
			"CR",
			"NI",
			"HN",
			"SV",
			"GT",
			"BZ",
			"BS",
			"IS",
			"GL",
			"GR",
			"CY",
			"MT",
			"LU",
			"LI",
			"MC",
			"SM",
			"VA",
			"AD",
			"MU",
			"SC",
			"MV",
			"SY",
			"JO",
			"LB",
			"UY",
			"PY",
			"BO",
		];

		if (difficulty === "easy") {
			return countriesCodesArr
				.filter((code) => easyCountries.includes(code))
				.slice(0, settings.countryCount);
		} else if (difficulty === "medium") {
			return countriesCodesArr.slice(0, settings.countryCount);
		} else {
			// Hard - use all countries
			return countriesCodesArr;
		}
	}, [countriesCodesArr, difficulty, difficultySettings]);

	// Hints for countries
	const countryHints = useMemo(
		() => ({
			AF: "Landlocked country in Central Asia with a history of conflict",
			AL: "Southeastern European country on the Adriatic Sea",
			DZ: "Largest country in Africa by land area",
			AD: "Small principality between France and Spain",
			AO: "Southern African country, formerly a Portuguese colony",
			AG: "Caribbean island nation with many beaches",
			AR: "South American country known for tango and beef",
			AM: "Landlocked country in the Caucasus region",
			AU: "Country and continent in the Southern Hemisphere",
			AT: "Central European country, home of Mozart",
			AZ: "Country in the Caucasus region with a coastline on the Caspian Sea",
			BS: "Island nation in the Caribbean",
			BH: "Small island country in the Persian Gulf",
			BD: "South Asian country with a large population",
			BB: "Caribbean island nation and birthplace of Rihanna",
			BY: "Eastern European landlocked country",
			BE: "Western European country known for chocolate and waffles",
			BZ: "Central American country with a barrier reef",
			BJ: "West African country, formerly known as Dahomey",
			BT: "Himalayan kingdom known for measuring Gross National Happiness",
			BO: "Landlocked South American country with Andean highlands",
			BA: "Balkan country with a short coastline on the Adriatic",
			BW: "Southern African country with the Kalahari Desert",
			BR: "Largest country in South America",
			BN: "Small Southeast Asian country on the island of Borneo",
			BG: "Balkan country on the Black Sea",
			BF: "West African landlocked country",
			BI: "Small, densely populated country in East Africa",
			CV: "Island nation off the west coast of Africa",
			KH: "Southeast Asian country home to Angkor Wat",
			CM: "Central African country on the Gulf of Guinea",
			CA: "Second largest country in the world by land area",
			CF: "Landlocked country in the heart of Africa",
			TD: "Large landlocked country in north-central Africa",
			CL: "Long, narrow South American country along the Pacific",
			CN: "Most populous country in the world",
			CO: "South American country with both Pacific and Caribbean coastlines",
			KM: "Island nation off the east coast of Africa",
			CD: "Large country in Central Africa, formerly Zaire",
			CG: "Central African country on the Equator",
			CR: "Central American country known for eco-tourism",
			HR: "Southeastern European country with long Adriatic coastline",
			CU: "Largest Caribbean island nation",
			CY: "Island country in the eastern Mediterranean",
			CZ: "Central European country known for historic castles",
			DK: "Nordic country consisting of a peninsula and islands",
			DJ: "Small country on the Horn of Africa",
			DM: "Small island nation in the eastern Caribbean",
			DO: "Caribbean country sharing an island with Haiti",
			TL: "Southeast Asian island nation, one of the world's newest countries",
			EC: "South American country named for the Equator",
			EG: "North African country home to the Pyramids",
			SV: "Smallest Central American country",
			GQ: "Central African country, only Spanish-speaking nation in Africa",
			ER: "Horn of Africa country on the Red Sea",
			EE: "Baltic country, one of the most digitally advanced nations",
			SZ: "Small landlocked kingdom in Southern Africa",
			ET: "Horn of Africa country with ancient Christian history",
			FJ: "Pacific island nation with over 300 islands",
			FI: "Nordic country known for saunas and lakes",
			FR: "Western European country known for cuisine and culture",
			GA: "Central African country on the Equator",
			GM: "Small West African country surrounded by Senegal",
			GE: "Caucasus country at the intersection of Europe and Asia",
			DE: "Central European country with the largest economy in Europe",
			GH: "West African country, first to gain independence in sub-Saharan Africa",
			GR: "Southern European country with ancient history",
			GD: "Small Caribbean island known as the 'Spice Isle'",
			GT: "Central American country with Mayan heritage",
			GN: "West African country formerly known as French Guinea",
			GW: "Small West African country, formerly Portuguese Guinea",
			GY: "Only English-speaking country in South America",
			HT: "Caribbean country sharing an island with Dominican Republic",
			HN: "Central American country with Caribbean and Pacific coastlines",
			HU: "Central European landlocked country",
			IS: "Nordic island country with volcanic landscape",
			IN: "South Asian country with the second-largest population",
			ID: "Largest island country in the world",
			IR: "Middle Eastern country formerly known as Persia",
			IQ: "Middle Eastern country between the Tigris and Euphrates rivers",
			IE: "Island nation in northwestern Europe",
			IL: "Middle Eastern country on the Mediterranean",
			IT: "Southern European country shaped like a boot",
			CI: "West African country known for cocoa production",
			JM: "Caribbean island nation, birthplace of reggae music",
			JP: "East Asian island nation known for technology and traditions",
			JO: "Middle Eastern kingdom bordering the Dead Sea",
			KZ: "Central Asian country, ninth-largest in the world by area",
			KE: "East African country known for wildlife and marathoners",
			KI: "Pacific island nation straddling the equator",
			KP: "East Asian country on the northern part of the Korean Peninsula",
			KR: "East Asian country on the southern part of the Korean Peninsula",
			KW: "Small oil-rich country in the Persian Gulf",
			KG: "Central Asian mountainous country",
			LA: "Landlocked Southeast Asian country",
			LV: "Baltic country on the shores of the Baltic Sea",
			LB: "Middle Eastern country on the Mediterranean",
			LS: "Mountain kingdom completely surrounded by South Africa",
			LR: "West African country founded by freed American slaves",
			LY: "North African country on the Mediterranean",
			LI: "Tiny principality between Switzerland and Austria",
			LT: "Baltic country, southernmost of the Baltic states",
			LU: "Small Western European country surrounded by France, Germany, and Belgium",
			MG: "Large island nation off the southeast coast of Africa",
			MW: "Landlocked country in southeastern Africa",
			MY: "Southeast Asian country with peninsular and island territories",
			MV: "Island nation in the Indian Ocean, lowest country in the world",
			ML: "Large landlocked country in West Africa",
			MT: "Small Mediterranean island nation",
			MH: "Pacific island nation spread across 29 atolls",
			MR: "Northwest African country with Atlantic coastline",
			MU: "Island nation in the Indian Ocean east of Madagascar",
			MX: "North American country south of the United States",
			FM: "Island nation in the western Pacific",
			MD: "Eastern European country between Romania and Ukraine",
			MC: "Second-smallest country in the world, on the French Riviera",
			MN: "Large landlocked country between Russia and China",
			ME: "Small Balkan country on the Adriatic Sea",
			MA: "North African country with both Atlantic and Mediterranean coastlines",
			MZ: "Southeast African country with a long Indian Ocean coastline",
			MM: "Southeast Asian country formerly known as Burma",
			NA: "Southern African country, formerly called South West Africa",
			NR: "Tiny island nation in the South Pacific",
			NP: "Himalayan country home to Mount Everest",
			NL: "Western European country known for tulips and windmills",
			NZ: "Island nation in the southwestern Pacific",
			NI: "Central American country with the largest freshwater lake in Central America",
			NE: "Landlocked West African country",
			NG: "Most populous African country",
			MK: "Landlocked Balkan country",
			NO: "Nordic country known for fjords",
			OM: "Middle Eastern country on the Arabian Peninsula",
			PK: "South Asian country bordering India and China",
			PW: "Island nation in the western Pacific",
			PS: "Middle Eastern territory in the West Bank and Gaza Strip",
			PA: "Central American country with the famous canal",
			PG: "Oceanian country occupying the eastern half of New Guinea",
			PY: "Landlocked South American country",
			PE: "South American country home to Machu Picchu",
			PH: "Southeast Asian archipelago with over 7,000 islands",
			PL: "Central European country on the Baltic Sea",
			PT: "Southwestern European country on the Iberian Peninsula",
			QA: "Small peninsula country in the Persian Gulf",
			RO: "Southeastern European country, home to Transylvania",
			RU: "Largest country in the world, spanning Eastern Europe and Northern Asia",
			RW: "Small landlocked country in East Africa",
			KN: "Two-island nation in the eastern Caribbean",
			LC: "Island nation in the eastern Caribbean",
			VC: "Island nation in the eastern Caribbean",
			WS: "Pacific island nation formerly known as Western Samoa",
			SM: "Microstate completely surrounded by Italy",
			ST: "Island nation in the Gulf of Guinea",
			SA: "Largest country on the Arabian Peninsula",
			SN: "West African country named after the Senegal River",
			RS: "Landlocked Balkan country, formerly part of Yugoslavia",
			SC: "Island nation in the Indian Ocean northeast of Madagascar",
			SL: "West African country on the Atlantic coast",
			SG: "City-state in Southeast Asia",
			SK: "Central European landlocked country",
			SI: "Small Central European country in the Julian Alps",
			SB: "Pacific island nation consisting of hundreds of islands",
			SO: "Horn of Africa country with the longest coastline in mainland Africa",
			ZA: "Southern African country with 11 official languages",
			SS: "East-Central African country, the world's newest nation",
			ES: "Southwestern European country on the Iberian Peninsula",
			LK: "Island nation south of India",
			SD: "North African country on the Nile",
			SR: "Small country on the northern coast of South America",
			SE: "Nordic country in Northern Europe",
			CH: "Central European alpine country",
			SY: "Middle Eastern country on the eastern Mediterranean",
			TJ: "Central Asian mountainous country",
			TZ: "East African country home to Mount Kilimanjaro",
			TH: "Southeast Asian country formerly known as Siam",
			TG: "Narrow West African country",
			TO: "Polynesian kingdom in the South Pacific",
			TT: "Twin-island country in the southern Caribbean",
			TN: "North African country on the Mediterranean",
			TR: "Country spanning Southeastern Europe and Western Asia",
			TM: "Central Asian country largely covered by the Karakum Desert",
			TV: "Polynesian island nation consisting of nine coral atolls",
			UG: "East African landlocked country",
			UA: "Eastern European country, the second-largest in Europe",
			AE: "Federation of seven emirates on the Arabian Peninsula",
			GB: "Island nation in northwestern Europe",
			US: "North American country consisting of 50 states",
			UY: "Small South American country between Argentina and Brazil",
			UZ: "Central Asian doubly landlocked country",
			VU: "Pacific island nation consisting of about 80 islands",
			VA: "World's smallest sovereign state, surrounded by Rome",
			VE: "South American country with the world's largest oil reserves",
			VN: "Southeast Asian country on the South China Sea",
			YE: "Middle Eastern country at the southern end of the Arabian Peninsula",
			ZM: "Landlocked country in Southern Africa",
			ZW: "Landlocked country in Southern Africa with Victoria Falls",
		}),
		[]
	);

	// For easier difficulty, provide more specific hints
	const getHintForDifficulty = useCallback(
		(countryCode) => {
			const baseHint = countryHints[countryCode] || "No hint available";

			// For easy mode, add more specific clues
			if (difficulty === "easy") {
				const easyHints = {
					US: baseHint + " Its flag has stars and stripes.",
					GB: baseHint + " Its flag is known as the Union Jack.",
					FR: baseHint + " Its flag has vertical blue, white, and red stripes.",
					DE:
						baseHint +
						" Its flag has horizontal black, red, and yellow stripes.",
					IT:
						baseHint + " Its flag has vertical green, white, and red stripes.",
					JP:
						baseHint + " Its flag features a red circle on a white background.",
					CA: baseHint + " Its flag features a red maple leaf.",
					CH: baseHint + " Its flag is a white cross on a red background.",
					BR:
						baseHint +
						" Its flag has a yellow diamond on a green background with a blue circle.",
					AU:
						baseHint +
						" Its flag features the Union Jack and stars of the Southern Cross.",
					// Add more easy hints as needed
				};

				return easyHints[countryCode] || baseHint;
			}

			// For hard mode, provide more vague hints
			if (difficulty === "hard") {
				return baseHint.split(",")[0] + "."; // Just the first part of the hint
			}

			return baseHint;
		},
		[countryHints, difficulty]
	);

	const countriesArr = useMemo(
		() => ({
			afghanistan: "AF",
			albania: "AL",
			algeria: "DZ",
			andorra: "AD",
			angola: "AO",
			"antigua and barbuda": "AG",
			argentina: "AR",
			armenia: "AM",
			australia: "AU",
			austria: "AT",
			azerbaijan: "AZ",
			bahamas: "BS",
			bahrain: "BH",
			bangladesh: "BD",
			barbados: "BB",
			belarus: "BY",
			belgium: "BE",
			belize: "BZ",
			benin: "BJ",
			bhutan: "BT",
			bolivia: "BO",
			"bosnia and herzegovina": "BA",
			botswana: "BW",
			brazil: "BR",
			brunei: "BN",
			bulgaria: "BG",
			"burkina faso": "BF",
			burundi: "BI",
			"cape verde": "CV",
			cambodia: "KH",
			cameroon: "CM",
			canada: "CA",
			"central african republic": "CF",
			chad: "TD",
			chile: "CL",
			china: "CN",
			colombia: "CO",
			comoros: "KM",
			"congo democratic republic": "CD",
			"congo republic": "CG",
			"costa rica": "CR",
			croatia: "HR",
			cuba: "CU",
			cyprus: "CY",
			"czech republic": "CZ",
			denmark: "DK",
			djibouti: "DJ",
			dominica: "DM",
			"dominican republic": "DO",
			"east timor": "TL",
			ecuador: "EC",
			egypt: "EG",
			"el salvador": "SV",
			"equatorial guinea": "GQ",
			eritrea: "ER",
			estonia: "EE",
			eswatini: "SZ",
			ethiopia: "ET",
			fiji: "FJ",
			finland: "FI",
			france: "FR",
			gabon: "GA",
			gambia: "GM",
			georgia: "GE",
			germany: "DE",
			ghana: "GH",
			greece: "GR",
			grenada: "GD",
			guatemala: "GT",
			guinea: "GN",
			"guinea-bissau": "GW",
			guyana: "GY",
			haiti: "HT",
			honduras: "HN",
			hungary: "HU",
			iceland: "IS",
			india: "IN",
			indonesia: "ID",
			iran: "IR",
			iraq: "IQ",
			ireland: "IE",
			israel: "IL",
			italy: "IT",
			"ivory coast": "CI",
			jamaica: "JM",
			japan: "JP",
			jordan: "JO",
			kazakhstan: "KZ",
			kenya: "KE",
			kiribati: "KI",
			"north korea": "KP",
			"south korea": "KR",
			kuwait: "KW",
			kyrgyzstan: "KG",
			laos: "LA",
			latvia: "LV",
			lebanon: "LB",
			lesotho: "LS",
			liberia: "LR",
			libya: "LY",
			liechtenstein: "LI",
			lithuania: "LT",
			luxembourg: "LU",
			madagascar: "MG",
			malawi: "MW",
			malaysia: "MY",
			maldives: "MV",
			mali: "ML",
			malta: "MT",
			"marshall islands": "MH",
			mauritania: "MR",
			mauritius: "MU",
			mexico: "MX",
			micronesia: "FM",
			moldova: "MD",
			monaco: "MC",
			mongolia: "MN",
			montenegro: "ME",
			morocco: "MA",
			mozambique: "MZ",
			myanmar: "MM",
			namibia: "NA",
			nauru: "NR",
			nepal: "NP",
			netherlands: "NL",
			"new zealand": "NZ",
			nicaragua: "NI",
			niger: "NE",
			nigeria: "NG",
			"north macedonia": "MK",
			norway: "NO",
			oman: "OM",
			pakistan: "PK",
			palau: "PW",
			palestine: "PS",
			panama: "PA",
			"papua new guinea": "PG",
			paraguay: "PY",
			peru: "PE",
			philippines: "PH",
			poland: "PL",
			portugal: "PT",
			qatar: "QA",
			romania: "RO",
			russia: "RU",
			rwanda: "RW",
			"saint kitts and nevis": "KN",
			"saint lucia": "LC",
			"saint vincent and the grenadines": "VC",
			samoa: "WS",
			"san marino": "SM",
			"sao tome and principe": "ST",
			"saudi arabia": "SA",
			senegal: "SN",
			serbia: "RS",
			seychelles: "SC",
			"sierra leone": "SL",
			singapore: "SG",
			slovakia: "SK",
			slovenia: "SI",
			"solomon islands": "SB",
			somalia: "SO",
			"south africa": "ZA",
			"south sudan": "SS",
			spain: "ES",
			"sri lanka": "LK",
			sudan: "SD",
			suriname: "SR",
			sweden: "SE",
			switzerland: "CH",
			syria: "SY",
			tajikistan: "TJ",
			tanzania: "TZ",
			thailand: "TH",
			togo: "TG",
			tonga: "TO",
			"trinidad and tobago": "TT",
			tunisia: "TN",
			turkey: "TR",
			turkmenistan: "TM",
			tuvalu: "TV",
			uganda: "UG",
			ukraine: "UA",
			"united arab emirates": "AE",
			"united kingdom": "GB",
			"united states": "US",
			uruguay: "UY",
			uzbekistan: "UZ",
			vanuatu: "VU",
			vatican: "VA",
			venezuela: "VE",
			vietnam: "VN",
			yemen: "YE",
			zambia: "ZM",
			zimbabwe: "ZW",
		}),
		[]
	);

	const [isStarted, setIsStarted] = useState(false);
	const [isOn, setIsOn] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [showHint, setShowHint] = useState(false);

	useEffect(() => {
		if (isStarted && countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prevCountdown) => prevCountdown - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (countdown === 0) {
			setIsOn(true);
			setCountdown(5);
		}
	}, [isStarted, countdown]);

	const [inputValue, setInputValue] = useState("");
	const [randomCountry, setRandomCountry] = useState(
		activeCountries[Math.floor(Math.random() * activeCountries.length)]
	);
	const [guessedCountries, setGuessedCountries] = useState([]);

	const getRandomCountry = useCallback(() => {
		let newCountry;
		do {
			newCountry =
				activeCountries[Math.floor(Math.random() * activeCountries.length)];
		} while (guessedCountries.includes(newCountry));
		return newCountry;
	}, [activeCountries, guessedCountries]);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);
	const [timeLeft, setTimeLeft] = useState(
		difficultySettings[difficulty].timeLimit
	);

	// Play sound effect when enabled
	const playSound = useCallback(
		(type) => {
			if (!soundEnabled) return;

			// Create audio elements for sounds
			const correctSound = new Audio("/sounds/correct.mp3");
			const wrongSound = new Audio("/sounds/wrong.mp3");

			if (type === "correct") {
				correctSound.play();
			} else if (type === "wrong") {
				wrongSound.play();
			}
		},
		[soundEnabled]
	);

	useEffect(() => {
		if (isOn && timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeLeft === 0) {
			// Save the score to localStorage
			const newRecord = {
				id: Date.now(),
				score: isCorrect,
				date: new Date().toISOString().split("T")[0],
				time: difficultySettings[difficulty].timeLimit, // Original time limit
				gameMode: "Guess the Flag",
				difficulty: difficulty,
			};

			// Get existing records
			const existingRecordsJSON = localStorage.getItem("guessTheFlagRecords");
			const existingRecords = existingRecordsJSON
				? JSON.parse(existingRecordsJSON)
				: [];

			// Add new record and sort by score (highest first)
			const updatedRecords = [...existingRecords, newRecord].sort(
				(a, b) => b.score - a.score
			);

			// Keep only top 10 records
			const topRecords = updatedRecords.slice(0, 10);

			// Save back to localStorage
			localStorage.setItem("guessTheFlagRecords", JSON.stringify(topRecords));

			// Reset the game
			setIsStarted(false);
			setIsOn(false);
			setTimeLeft(difficultySettings[difficulty].timeLimit);
			setIsCorrect(0);
			setIsWrong(0);
			setInputValue("");
			setGuessedCountries([]);
			setShowHint(false);
		}
	}, [isOn, timeLeft, isCorrect, difficulty, difficultySettings]);

	const normalizeCountryName = useCallback((name) => {
		return name.toLowerCase();
	}, []);

	// Get the correct country name for the current flag
	const getCorrectCountryName = useCallback(() => {
		return Object.entries(countriesArr).find(
			([_, code]) => code === randomCountry
		)?.[0];
	}, [countriesArr, randomCountry]);

	// Function to check if input is a potential match for a longer country name
	const isPotentialMatchForLongerCountry = useCallback(
		(input) => {
			// Special case for Niger/Nigeria
			if (
				randomCountry === "NG" && // Nigeria's flag is shown
				input === "niger" // User has typed "niger"
			) {
				return true; // "niger" could be part of "nigeria"
			}

			// Check if input is a prefix of the correct country
			const correctCountry = getCorrectCountryName();
			if (correctCountry && correctCountry.startsWith(input)) {
				return true;
			}

			return false;
		},
		[randomCountry, getCorrectCountryName]
	);

	const handleChange = (e) => {
		const value = e.target.value;
		const lowerValue = normalizeCountryName(value);
		setInputValue(lowerValue);

		// Get the correct country name
		const correctCountry = getCorrectCountryName();

		// CASE 1: Correct answer
		if (correctCountry && normalizeCountryName(correctCountry) === lowerValue) {
			setIsCorrect((prev) => prev + 1);
			setTimeLeft((prev) => prev + difficultySettings[difficulty].bonusTime);
			setInputValue("");
			playSound("correct");
			setGuessedCountries((prev) => [...prev, randomCountry]);
			setRandomCountry(getRandomCountry());
			setShowHint(false); // Reset hint for next country
			return;
		}

		// CASE 2: Wrong answer, but need to check special cases
		if (countriesArr[lowerValue]) {
			// First check if it's a potential match for a longer country
			// (like "niger" could be part of "nigeria")
			if (!isPotentialMatchForLongerCountry(lowerValue)) {
				setIsWrong((prev) => prev + 1);
				playSound("wrong");
				setInputValue("");
				setRandomCountry(getRandomCountry());
				setShowHint(false); // Reset hint for next country
			}
		}
	};

	// Handle skip button click
	const handleSkip = () => {
		setIsWrong((prev) => prev + 1);
		playSound("wrong");
		setInputValue("");
		setGuessedCountries((prev) => [...prev, randomCountry]);
		setRandomCountry(getRandomCountry());
		setShowHint(false); // Reset hint for next country
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)] py-8 px-4">
			{!isStarted && (
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>Guess the Flag</h1>
					<p className="mb-8">
						You will be shown a flag and you have to guess the country it
						belongs to by writing the name in the box. <br /> Try to be as fast
						as possible to beat your highest score!
					</p>
					<div className="mb-6">
						<p className="text-lg font-medium mb-2">
							Current Difficulty:{" "}
							<span className="text-[var(--main)]">
								{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
							</span>
						</p>
						<p className="text-sm">
							{difficulty === "easy"
								? "Fewer countries, more time, and better hints"
								: difficulty === "medium"
								? "Standard difficulty with balanced time and countries"
								: "All countries, less time, and minimal hints"}
						</p>
						<p className="text-sm mt-2">
							Change difficulty in{" "}
							<Link
								href="/settings"
								className="text-[var(--main)] hover:underline"
							>
								Settings
							</Link>
						</p>
					</div>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<button
							onClick={() => setIsStarted(true)}
							className="btn-primary text-xl"
						>
							Start Game
						</button>
						<Link
							href={"/gamemodes"}
							className="py-3 px-6 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300 text-xl text-center"
						>
							Back to Games
						</Link>
					</div>
				</div>
			)}
			{isStarted && (
				<div className="card max-w-lg mx-auto text-center">
					<h1 className={`text-4xl ${itim.className} mb-6`}>Guess the Flag</h1>

					{!isOn ? (
						<div className="text-3xl font-bold mb-4">
							Starting in: {countdown}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-y-8">
							<div className="flex justify-between w-full mb-4">
								<div className="text-xl font-semibold">
									Time:{" "}
									<span className={timeLeft < 30 ? "text-[var(--error)]" : ""}>
										{timeLeft}s
									</span>
								</div>
								<div className="text-xl">
									<span className="text-[var(--success)]">✓ {isCorrect}</span> /
									<span className="text-[var(--error)]">✗ {isWrong}</span>
								</div>
							</div>

							<div className="border-4 rounded-lg border-[var(--foreground-muted)] overflow-hidden">
								<Image
									src={`/4x3/${randomCountry}.svg`}
									width={300}
									height={200}
									alt="Country flag"
									className="w-full"
								/>
							</div>

							{showHint && (
								<div className="text-lg italic mb-4 bg-[var(--foreground-muted)] bg-opacity-20 p-3 rounded-lg">
									Hint: {getHintForDifficulty(randomCountry)}
								</div>
							)}

							<form
								onSubmit={(e) => e.preventDefault()}
								className="w-full mt-4"
							>
								<input
									className="w-full bg-[var(--background)] px-4 py-3 outline-none text-[var(--foreground)] rounded-lg border-2 transition-colors duration-300 border-solid focus:border-[var(--main)] border-[var(--foreground-muted)]"
									name="text"
									placeholder="Enter country name..."
									type="text"
									value={inputValue}
									onChange={handleChange}
									autoComplete="off"
									autoFocus
								/>
							</form>

							<div className="flex gap-4 justify-center mt-6">
								<button
									onClick={() => setShowHint(true)}
									className="py-2 px-4 border-2 border-[var(--main)] text-[var(--main)] rounded-lg hover:bg-[var(--main)] hover:text-[#eeeeee] transition-colors duration-300"
									disabled={showHint}
								>
									Show Hint
								</button>
								<button
									onClick={handleSkip}
									className="py-2 px-4 border-2 border-[var(--error)] text-[var(--error)] rounded-lg hover:bg-[var(--error)] hover:text-[#eeeeee] transition-colors duration-300"
								>
									Skip
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
