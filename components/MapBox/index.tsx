import React from 'react';
import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import styles from './style.module.scss';

interface MapBoxProps {
  map_key: string;
}

const MapBox = ({
  map_key
}: MapBoxProps) => {
  return (
    <div className={styles.MapBox_container}>
      <ReactMapGL
          mapboxAccessToken={map_key}
          mapStyle="mapbox://styles/doctorpok/cluya34wl004i01qvdpl7gele"
          latitude={44.827789}
          longitude={-0.57918}
          zoom={11}
          pitch={45}
      />
    </div>
  );
};

export default MapBox;
