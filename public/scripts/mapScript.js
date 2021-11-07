mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsaWNvIiwiYSI6ImNrc3NucmRnZDBxcmEzMXBua2g3cjdjYjMifQ.1DIvZtAtBoI8ItCTqR8cJw';
const styles = ['satellite-streets-v11', 'outdoors-v11', 'satellite-v9'];
let chosenStyle = styles[0];


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/'+chosenStyle,
    center: [-12.44,36.21],
    zoom: 1
});

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [35.13,31.47]
            },
            properties: {
                title: 'Mapbox',
                description: 'Jerusalem, Israel'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [ 34.855, 32.109]
            },
            properties: {
                title: 'Mapbox',
                description: 'Tel-Aviv, Israel'
            }
        }
    ]
};

let center = [];
map.on('click', (e) => {
    JSON.stringify(e.lngLat.wrap());
    const centerObj = e.lngLat.wrap();
    center[0] = parseFloat(centerObj.lng.toFixed(2))
    center[1] = parseFloat(centerObj.lat.toFixed(2))

    document.getElementById('info').innerHTML = center;
    // `e.point` is the x, y coordinates of the `mousemove` event
    // relative to the top-left corner of the map.
    // `e.lngLat` is the longitude, latitude geographical position of the event.
});

function SetHiddenInputVal(event){   
    const hidden1 = document.getElementById('send-center1');
    const hidden2 = document.getElementById('send-center2');
    hidden1.value = center[0];
    hidden2.value = center[1];

}


function ChangeMapStyle(element) {
    for (let i = 0; i < styles.length; i++) 
    {
        if(element.id.indexOf(i) > -1) 
        {
            chosenStyle = styles[i]
            map.setStyle('mapbox://styles/mapbox/' + chosenStyle);
        }       
    }   
    
}
