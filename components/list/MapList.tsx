// import { ReactElement, useEffect, useRef, useState } from "react"; 
// import VietmapGL from '@vietmap/vietmap-gl-react-native'; 
// VietmapGL.setApiKey('a5a87f8bea7947c7006414f0c1b82eb35c5d9186942d504c')
// const MapList =  ReactElement => {
//   styleUrl: "https://maps.vietmap.vn/api/maps/light/styles.json?apikey=a5a87f8bea7947c7006414f0c1b82eb35c5d9186942d504c" 

//   const mapRef = useRef(null);

//   const [markerCoordinates, setMarkerCoordinates] = useState(null);
//   const [selectedFeatures, setSelectedFeatures] = useState([]);
//   const handleMapClick = async (feature) => {
//     // Handle the map click event
//     if (mapRef.current) {
//       console.log(feature);
//       const { geometry, properties } = feature;

//       setMarkerCoordinates(geometry.coordinates);
//       console.log('Clicked at coordinates:', geometry.coordinates);
//       console.log('Feature properties:', properties);

//       /// Query data from rendered map, like point, admin,...
//       const selectedFeatures = await mapRef.current.queryRenderedFeaturesAtPoint([properties.screenPointX, properties.screenPointX], undefined);

//       console.log('Rendered Features:', selectedFeatures);
//       setSelectedFeatures(selectedFeatures)

//     } else {
//       console.error('Feature failed')
//     }
//   };
//   const centerCoordinates = [106.6320, 10.7545]; // Replace with your desired coordinates
//   const lineCoordinates = [
//     [106.432502, 10.253619], // Starting point (longitude, latitude)
//     [106.732502, 10.653619], // Ending point (longitude, latitude)
//   ];
//   if (Platform.OS === 'web') {
//     return <Text>Map is not supported in this environment.</Text>;
//   }
//   return (<VietmapGL.MapView ref={mapRef} styleURL={styleUrl} style={{flex:1}} logoEnabled={false} onPress={handleMapClick}  >

//     <VietmapGL.Camera zoomLevel={13} followZoomLevel={13} followUserLocation={false} centerCoordinate={centerCoordinates} />

//     <VietmapGL.ShapeSource id="lineSource" shape={{ type: 'LineString', coordinates: lineCoordinates }}>
//       <VietmapGL.LineLayer id="lineLayer" style={{ lineColor: 'red', lineWidth: 20 }} />
//     </VietmapGL.ShapeSource>
//   </VietmapGL.MapView>);
// };
// export default MapList;


// import VietmapGL from '@vietmap/vietmap-gl-react-native';
// import React, { useState } from 'react';
// import {Platform, StyleSheet, View, Text} from 'react-native';
// VietmapGL.setApiKey(null)

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   container: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//   },
//   map: {
//     flex: 1,
//   },
// });

// const MapList = () => {
//   const [styleUrl, setStyleURL] = useState({ styleUrl: "https://maps.vietmap.vn/api/maps/light/styles.json?apikey=a5a87f8bea7947c7006414f0c1b82eb35c5d9186942d504c" })
//   if (Platform.OS === 'web') {
//     return <Text>Map is not supported in this environment.</Text>;
//   }
//   return (
//     <View style={styles.page}>
//       <View style={styles.container}>
      
//         <VietmapGL.MapView styleURL={styleUrl.styleUrl} style={{flex: 1}}>
//           <VietmapGL.Camera
//             zoomLevel={10}
//             followUserLocation={false}
//             centerCoordinate={[106.800106, 10.704619]}
//           />
//         </VietmapGL.MapView>
//       </View>
//     </View>
//   );
// };

// export default MapList;

import { View, Text } from 'react-native'
import React from 'react'

const MapList = () => {
  return (
    <View>
      <Text>MapList</Text>
    </View>
  )
}

export default MapList
