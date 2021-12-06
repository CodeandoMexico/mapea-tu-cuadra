/*================ CREATE THE MAP ================*/
function createMap(latitude, longitud, zoom, layers=[]) {
	let map = L.map('map', {
		center: [latitude, longitud],
		zoom: zoom,
		layers: layers
	})

	return map
}

/*================ DRAW THE MAP ================*/
function drawMap(map) {
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiZGF2aWRidWJ1Y29kZWFuZG8iLCJhIjoiY2t3c2NwbHlhMTU5OTMwbzJhZ2tzZWMzMiJ9.EOyBAqg-1xevyla4wgDGVg'
	}).addTo(map)
}
/*================ SWITCH MAP STATE ================*/
function switchMap(map, state) {
	/*================ RESETING THE MAP ================*/
	map.eachLayer(function (layer) {
		map.removeLayer(layer)
	})
	drawMap(map)

	/*================ CHOSE THE MAP ================*/
	switch (state) {
		case "0":
			L.geoJSON(frentesManzana).addTo(map);
			L.geoJSON(intersecciones).addTo(map);
			L.geoJSON(poligonoAndrade).addTo(map);
			break
		case "1":
			L.geoJSON(poligonoAndrade).addTo(map);
			break
		case "2":
			L.geoJSON(frentesManzana).addTo(map);
			break
		case "3":
			L.geoJSON(intersecciones).addTo(map);
			break
		default:
			break
	}
}

/*================ CHANGE BUTTONS INIT ================*/
const btns = document.getElementsByClassName("map-btn")
let map = createMap(
		latitude = 21.114320,
		longitud = -101.673210,
		zoom = 16,
)
drawMap(map)
L.geoJSON(poligonoAndrade).addTo(map);

Array.from(btns).forEach(btn => {
	btn.addEventListener('click', function () {
		let state = this.id
		switchMap(
			map = map,
			state = state
		)
	})
})