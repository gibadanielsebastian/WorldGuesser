"use client";

import { countries } from "country-flag-icons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Itim } from "next/font/google";

const itim = Itim({
	subsets: ["latin"],
	weight: "400",
});

export default function GuessTheFlag() {
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
			"HR",
			"CU",
			"CY",
			"CZ",
			"DK",
			"DJ",
			"DM",
			"DO",
			"TL",
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
			"CI",
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
		],
		[]
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
			"vatican city": "VA",
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
		countriesCodesArr[Math.floor(Math.random() * countriesCodesArr.length)]
	);

	const [guessedCountries, setGuessedCountries] = useState([]);

	const getRandomCountry = useCallback(() => {
		let newCountry;
		do {
			newCountry =
				countriesCodesArr[Math.floor(Math.random() * countriesCodesArr.length)];
		} while (guessedCountries.includes(newCountry));
		return newCountry;
	}, [countriesCodesArr, guessedCountries]);

	const [isCorrect, setIsCorrect] = useState(0);
	const [isWrong, setIsWrong] = useState(0);

	const [timeLeft, setTimeLeft] = useState(120);

	useEffect(() => {
		if (isOn && timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else if (timeLeft === 0) {
			setIsStarted(false);
			setIsOn(false);
			setTimeLeft(120);
			setIsCorrect(0);
			setIsWrong(0);
			setInputValue("");
			setGuessedCountries([]);
		}
	}, [isOn, timeLeft]);

	const handleChange = (e) => {
		const value = e.target.value;
		setInputValue(value.toLowerCase());

		// Check if the input value matches the flag
		if (countriesArr[value.toLowerCase()] === randomCountry) {
			setIsCorrect(isCorrect + 1);
			setTimeLeft(timeLeft + 5);
			setInputValue("");
			guessedCountries.push(randomCountry);
			setRandomCountry(getRandomCountry());
		} else if (countriesArr[value]) {
			setIsWrong(isWrong + 1);
			setInputValue("");
			setRandomCountry(getRandomCountry());
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
			{!isStarted && (
				<div className="flex flex-col items-center gap-y-16 w-3/4 md:w-1/2 text-center">
					<h1 className={`text-4xl ${itim.className}`}>Guess the Flag</h1>
					<p>
						You will be shown a flag and you have to guess the country it
						belongs to by writing the name in the box. <br /> Try to be as fast
						as possible to beat your highest score!
					</p>
					<div className="flex space-x-4">
						<button
							onClick={() => setIsStarted(!isStarted)}
							className="p-4 px-8 bg-[var(--main)] text-xl text-center"
						>
							Start
						</button>
						<Link
							href={"/gamemodes"}
							className="p-4 px-8 bg-[var(--main)] text-xl text-center"
						>
							Back
						</Link>
					</div>
				</div>
			)}
			{isStarted && (
				<div className="flex flex-col items-center gap-y-8 w-3/4 md:w-1/2 text-center">
					<h1 className={`text-4xl ${itim.className}`}>Guess the Flag</h1>
					{!isOn && <h2>Starting in: {countdown}</h2>}
					{isOn && (
						<div className="flex flex-col items-center justify-center gap-y-8">
							<h2 className="text-xl text-[#eeeeee]">Time Left: {timeLeft}</h2>
							<div>
								<Image
									src={`/4x3/${randomCountry}.svg`}
									width={300}
									height={200}
									alt={`${randomCountry}`}
								></Image>
							</div>
							<div>
								<span className="text-green-400">Correct: {isCorrect}</span> |{" "}
								<span className="text-red-500">Wrong: {isWrong}</span>
							</div>
							<input
								className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
								name="text"
								placeholder="Enter the Country"
								type="text"
								value={inputValue}
								onChange={handleChange}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
