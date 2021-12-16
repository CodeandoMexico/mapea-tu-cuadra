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
	layerControl.remove(map)
	L.geoJSON(poligonoAndrade, {
		style: poligonoAndradeStyle
	}).addTo(map);

	/*================ CHOSE THE MAP ================*/
	switch (state) {
		case "0":
		/*================ CICLOESTACIONAMIENTOS ================*/
		let cicloMarker = L.geoJSON(cicloestacionamientos, {
				pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, cicloestacionamientos_marker_style);
				}
		})
		let cicloBuffer = L.geoJSON(cicloestacionamientos, {
				pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, cicloestacionamientos_buffer_style);
				}
		})
		/*================ CALLES COMPARTIDAS ================*/
		let callesCMarker = L.geoJSON(calles_compartidas, {
				pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, calles_compartidas_marker_style);
				}
		})
		let callesCBuffer = L.geoJSON(calles_compartidas, {
				pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, calles_compartidas_buffer_style);
				}
		})
			
		/*================ VELOCIDAD MAXIMA ================*/
		let velocidadMMarker = L.geoJSON(velocidad_maxima, {
			pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, velocidad_maxima_marker_style);
				}
		})
		let velocidadMBuffer = L.geoJSON(velocidad_maxima, {
				pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, velocidad_maxima_buffer_style);
				}
		})
			
		/*================ ADD THEM TO A LAYER ================*/
			let cicloLayer = L.layerGroup([
					cicloMarker,
					cicloBuffer
			]),
				callesLayer = L.layerGroup([
					callesCMarker,
					callesCBuffer
				]),
				velocidadLayer = L.layerGroup([
				velocidadMMarker,
				velocidadMBuffer
			])

			cicloLayer.addTo(map)
			callesLayer.addTo(map)
			velocidadLayer.addTo(map)

			let overlayCiclista = {
				"Ciclo estacionamientos": cicloLayer,
				"Calles compartidas": callesLayer,
				"Señal de velocidad máxima": velocidadLayer
			}
			layerControl = L.control.layers(null, overlayCiclista).addTo(map);
			break
		case "1":
			L.geoJSON(poligonoAndrade).addTo(map);
			break
		case "2":
			L.geoJSON(poligonoAndrade).addTo(map);
			break
		case "3":
			L.geoJSON(poligonoAndrade).addTo(map);
			break
		default:
			break
	}
}

/*================ CHANGE BUTTONS INIT ================*/
const btns = document.getElementsByClassName("btn-map")
let map = createMap(
		latitude = 21.114320,
		longitud = -101.673210,
		zoom = 16,
)
drawMap(map)
L.geoJSON(poligonoAndrade, {
	style: poligonoAndradeStyle
}).addTo(map);

let layerControl = L.control.layers(null, null).addTo(map)

Array.from(btns).forEach(btn => {
	btn.addEventListener('click', function () {
		let state = this.id
		switchMap(
			map = map,
			state = state
		)
	})
})