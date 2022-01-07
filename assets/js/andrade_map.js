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

function createLayers(map, fileNames, markerStyles, bufferStyles, mapSectionNames) {
	let markers = [],
			buffers = [],
			layers = []
	
	/*================ CREATE MARKERS AND BUFFERS ================*/
	for (let i = 0; i < fileNames.length; i++) {
		markers.push(
			L.geoJSON(fileNames[i], {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, markerStyles[i])
				}
			})
		)
		if (bufferStyles[i] !== undefined) {
			buffers.push(
				L.geoJSON(fileNames[i], {
					pointToLayer: function (feature, latlng) {
						return L.circleMarker(latlng, bufferStyles[i])
					}
				})
			)
		}
	}

	/*================ CREATE AND ADD LAYERS ================*/
	for (let i = 0; i < fileNames.length; i++) {
		if (buffers[i] !== undefined) {
			layers.push(
				L.layerGroup([
					markers[i],
					buffers[i] 
				])
			)
		} else {
			layers.push(
				L.layerGroup([
					markers[i]
				])
			)
		}
	
		layers[i].addTo(map)
	}

	/*================ OVERLAY ================*/
	let overlay = {}

	for (let i = 0; i < fileNames.length; i++) {
		overlay[mapSectionNames[i]] = layers[i]
	}

	/*================ ADD EVERYTHING ================*/
	layerControl = L.control.layers(null, overlay).addTo(map)

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

	/*================ VARIABLE CREATION ================*/
	let fileNames, markerStyles, bufferStyles, mapSectionNames;

	/*================ CHOSE THE MAP ================*/
	switch (state) {
		/*================ BUTTON 1 ================*/
		case "0":
		fileNames = [
			cicloestacionamientos,
			calles_compartidas,
			velocidad_maxima
		]
		markerStyles = [
			cicloestacionamientos_marker_style,
			calles_compartidas_marker_style,
			velocidad_maxima_marker_style
		]
		bufferStyles = [
			cicloestacionamientos_buffer_style,
			calles_compartidas_buffer_style,
			velocidad_maxima_buffer_style
		]
		mapSectionNames = [
			"Ciclo estacionamientos",
			"Calles compartidas",
			"Señal de velocidad máxima"
		]
			
		createLayers(map, fileNames, markerStyles, bufferStyles, mapSectionNames)
			break
		/*================ BUTTON 2 ================*/
		case "1":
			fileNames = [
				infraestructura_verde,
				equipamiento,
			]
			markerStyles = [
				infraestructura_verde_marker_style,
				equipamiento_marker_style,
			]
			bufferStyles = [
				infraestructura_verde_buffer_style,
				equipamiento_buffer_style,
			]
			mapSectionNames = [
				"Infraestructura Verde",
				"Equipamiento Urbano"
			]
			createLayers(map, fileNames, markerStyles, bufferStyles, mapSectionNames)
			break
		/*================ BUTTON 3 ================*/
		case "2":
			fileNames = [
				banquetas,
				obstrucciones,
				señalamientos
			]
			markerStyles = [
				banquetas_marker_style,
				obstrucciones_marker_style,
				señalamientos_marker_style
			]
			bufferStyles = [
				banquetas_buffer_style,
				obstrucciones_buffer_style,
				señalamientos_buffer_style
			]
			mapSectionNames = [
				"Banquetas",
				"Obstruccines",
				"Señalamientos"
			]
			createLayers(map, fileNames, markerStyles, bufferStyles, mapSectionNames)
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

/*================ SCROLLUP ================*/
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 150) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp);