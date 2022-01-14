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

function createLayers(map, fileNames, markerStyles, bufferStyles, mapSectionNames, elNames) {
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
					},
					onEachFeature: function (feature, layer) {
						text = `<b>${elNames[i]}</b>`
						if (feature.properties.description) {
							text += `<br>${feature.properties.description}`
						}
						layer.bindPopup(text)
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

	overlay["Polígono"] = poliLayer

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
	/*================ ADD THE POLIGON ================*/
	poli = L.geoJSON(poligonoAndrade, {
		style: poligonoAndradeStyle,
	}).bindPopup(layer => {
		return "<b>Polígono de la Andrade</b>"
	})
	poliLayer = L.layerGroup([poli]).addTo(map)

	/*================ VARIABLE CREATION ================*/
	let fileNames, markerStyles, bufferStyles, mapSectionNames, elementNames

	/*================ CHOSE THE MAP ================*/
	switch (state) {
		/*================ BUTTON 1 ================*/
		// Aquí deberías de hacer un caso por cada botón en la sección del mapa
		case "0":
				// Nombre de las variables donde están guardados tu geojson
				fileNames = [
					cicloestacionamientos,
					calles_compartidas,
					velocidad_maxima
				]
				// Nombre de las variables donde están guardados los estilos de los marcadores
				markerStyles = [
					cicloestacionamientos_marker_style,
					calles_compartidas_marker_style,
					velocidad_maxima_marker_style
				]
				// Nombre de las variables donde están guardados los estilos de los buffers
				// (Los circulos que están al rededor de los marcadores que suelen ser más tenues) 
				bufferStyles = [
					cicloestacionamientos_buffer_style,
					calles_compartidas_buffer_style,
					velocidad_maxima_buffer_style
				]
			  // Nombre que aparecerá en el menú del mapa (arriba a la derecha) 
				mapSectionNames = [
					"Ciclo estacionamientos",
					"Calles compartidas",
					"Señales de velocidad máxima"
				]
				// Nombre individual de cada elemento o punto en el mapa (para los binPopups)
				elementNames = [
					"Ciclo estacionamiento",
					"Calle compartida",
					"Señal de velocidad máxima"
				]
				
			createLayers(map,
				fileNames,
				markerStyles,
				bufferStyles,
				mapSectionNames,
				elementNames
			)
			
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
				"Equipamientos Urbanos"
			]
			elementNames = [
				"Infraestructura Verde",
				"Equipamiento Urbano"
			]
			createLayers(map,
				fileNames,
				markerStyles,
				bufferStyles,
				mapSectionNames,
				elementNames
			)
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
			elementNames = [
				"Banqueta",
				"Obstrucción",
				"Señamiento"
			]
			
			createLayers(map,
				fileNames,
				markerStyles,
				bufferStyles,
				mapSectionNames,
				elementNames
			)
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
/*================ ADD THE POLIGON ================*/
let poli = L.geoJSON(poligonoAndrade, {
	style: poligonoAndradeStyle
}).bindPopup(layer => {
	return "<b>Polígono de la Andrade</b>"
})

let poliLayer = L.layerGroup([poli]).addTo(map)

let layerControl = L.control.layers(null, {"Polígono": poliLayer}).addTo(map)

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