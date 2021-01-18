import React, { useState, useEffect } from "react";
import ReactGlobe from "react-globe";
import { inject, observer } from "mobx-react";



import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import defaultMarkers from "./GlobeData";

export const MyGlobe = inject("EventsStore")(
	observer((props) => {
		const [country, setCountry] = useState("");
		const [animations, setAnimetions] = useState();
		const [marker, setMarker] = useState();
		let animation = [];

		useEffect(() => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			animation = [
				{
					coordinates: marker,
					focusAnimationDuration: 1000,
					focusDistanceRadiusScale: 1.9,
					focusEasingFunction: ["Linear", "None"],
				},
			];
			setAnimetions(animation);
		}, [marker]);

		const clearCountriesFromStore = () => {
			props.EventsStore.countries = [];
		};
		const addCountriesToStore = (marker) => {
			props.EventsStore.countries.push(marker.country);
			console.log(props.EventsStore.countries)
		};

		const findCoordinates = () => {
			for (let markers of defaultMarkers) {
				if (markers.country === country) {
					return setMarker(markers.coordinates);
				} else {
					setMarker([0, 0]);
				}
			}
		};
		return (
			<div>
				<input type='text' onChange={({ target }) => setCountry(target.value)} />
				<button onClick={findCoordinates}>Filter</button>
				<button onClick={clearCountriesFromStore}>Clear</button>
				<div className='myGlob'>
					<ReactGlobe
						width='50vw'
						height='50vh'
						markers={defaultMarkers}
						animations={animations}
						options={{
							markerTooltipRenderer: (marker) => `${marker.country}`,
							markerRadiusScaleRange: [0.008, 0.008],
							cameraAutoRotateSpeed: 0,
							enableCameraAutoRotate: false,
							markerExitEasingFunction: ["Cubic", "Out"],
						}}
						onClickMarker={addCountriesToStore}
					/>
				</div>
			</div>
		);
	})
);
