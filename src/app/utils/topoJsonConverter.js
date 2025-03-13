"use client";

// A simplified implementation of TopoJSON to GeoJSON conversion
export function convertTopoJsonToSvgPaths(
	topoJson,
	width = 1000,
	height = 500
) {
	if (!topoJson || !topoJson.objects || !topoJson.objects.countries) {
		return {};
	}

	try {
		// First, convert the TopoJSON to GeoJSON features
		const features = topoFeature(topoJson, topoJson.objects.countries);
		const countryPaths = {};

		// Process each country feature
		features.features.forEach((feature) => {
			try {
				// The TopoJSON from Natural Earth uses the ISO3 country code as id
				const id = feature.id;
				if (!id) return; // Skip features without an id

				const name = feature.properties ? feature.properties.name : id;

				// Generate SVG path
				const svgPath = geoPathToSvg(feature.geometry, width, height);

				// Add to our mapping
				countryPaths[id] = {
					path: svgPath,
					name: name || id,
				};
			} catch (err) {
				console.error("Error processing country:", err);
			}
		});

		return countryPaths;
	} catch (err) {
		console.error("Error converting TopoJSON:", err);
		return {};
	}
}

// Convert a TopoJSON to GeoJSON
function topoFeature(topology, o) {
	if (o.type === "GeometryCollection") {
		return {
			type: "FeatureCollection",
			features: o.geometries.map(function (o) {
				return feature(o, topology);
			}),
		};
	}

	return feature(o, topology);

	function feature(o, topology) {
		const f = {
			type: "Feature",
			id: o.id,
			properties: o.properties || {},
			geometry: { type: o.type },
		};

		if (o.type === "Point") {
			f.geometry.coordinates = o.coordinates;
		} else if (o.type === "Polygon") {
			f.geometry.coordinates = o.arcs.map(function (arc) {
				return extractArcs(topology, arc);
			});
		} else if (o.type === "MultiPolygon") {
			f.geometry.coordinates = o.arcs.map(function (polygon) {
				return polygon.map(function (arc) {
					return extractArcs(topology, arc);
				});
			});
		}

		return f;
	}

	// Extract the coordinates from TopoJSON arcs
	function extractArcs(topology, arc) {
		const coordinates = [];

		// Simple case - just a straightforward coordinate
		if (!Array.isArray(arc)) {
			return [arc.x, arc.y];
		}

		// Convert arc indices to coordinates
		arc.forEach((arcIndex) => {
			if (topology.arcs && topology.arcs[Math.abs(arcIndex)]) {
				const a = topology.arcs[Math.abs(arcIndex)];

				if (Array.isArray(a)) {
					a.forEach((coord) => {
						if (Array.isArray(coord) && coord.length >= 2) {
							coordinates.push([coord[0], coord[1]]);
						}
					});
				}
			}
		});

		return coordinates;
	}
}

// Convert GeoJSON to SVG path
function geoPathToSvg(geoJson, width, height) {
	let svgPath = "";

	try {
		// Handle different geometry types
		if (geoJson.type === "Polygon" && Array.isArray(geoJson.coordinates)) {
			geoJson.coordinates.forEach((ring) => {
				if (Array.isArray(ring)) {
					const ringPath = ring
						.map((coord, i) => {
							// Make sure coord is a pair of numbers
							if (Array.isArray(coord) && coord.length >= 2) {
								const [x, y] = projectPoint(coord[0], coord[1], width, height);
								return `${i === 0 ? "M" : "L"}${x},${y}`;
							}
							return "";
						})
						.filter((p) => p)
						.join(" ");

					if (ringPath) {
						svgPath += ringPath + "Z ";
					}
				}
			});
		} else if (
			geoJson.type === "MultiPolygon" &&
			Array.isArray(geoJson.coordinates)
		) {
			geoJson.coordinates.forEach((polygon) => {
				if (Array.isArray(polygon)) {
					polygon.forEach((ring) => {
						if (Array.isArray(ring)) {
							const ringPath = ring
								.map((coord, i) => {
									if (Array.isArray(coord) && coord.length >= 2) {
										const [x, y] = projectPoint(
											coord[0],
											coord[1],
											width,
											height
										);
										return `${i === 0 ? "M" : "L"}${x},${y}`;
									}
									return "";
								})
								.filter((p) => p)
								.join(" ");

							if (ringPath) {
								svgPath += ringPath + "Z ";
							}
						}
					});
				}
			});
		}
	} catch (err) {
		console.error("Error creating SVG path:", err);
	}

	return svgPath.trim();
}

// Simple Mercator projection
function projectPoint(lon, lat, width, height) {
	try {
		// Convert longitude/latitude to x/y coordinates
		const x = (parseFloat(lon) + 180) * (width / 360);

		const latRad = (parseFloat(lat) * Math.PI) / 180;
		const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
		const y = height / 2 - (width * mercN) / (2 * Math.PI);

		return [x, y];
	} catch (err) {
		console.error("Error projecting point:", err);
		return [0, 0]; // Return a default value on error
	}
}
