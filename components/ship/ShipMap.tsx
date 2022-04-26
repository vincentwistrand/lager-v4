import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState<any>(null);
    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);

        })();
    }, []);

    return (
        <View style={Base.base}>
            <View style={Typography.main}>
                <Text style={Typography.h1}>Leverera order</Text>
                <Text style={Typography.pBold}>{order.name}</Text>
                <Text style={Typography.pBold}>{order.address}</Text>
                <Text style={Typography.pBold}>{order.zip} {order.city}</Text>
                <Text></Text>
                <Text style={Typography.p}>Röd markör: leveransaddress</Text>
                <Text style={Typography.p}>Blå markör: din position</Text>
                {errorMessage !== null ? <Text style={{color: 'red'}}>{errorMessage}</Text>: null}
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.21,
                        longitude: 15.5969,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});