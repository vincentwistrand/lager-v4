import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Typography, Base } from '../../styles/index.js';
import { useState, useEffect } from 'react';
import authModel from "../../models/auth";
import saab from '../../assets/saab.jpg';
import * as Updates from 'expo-updates';

export default function Home({ route, navigation }) {
    const { reload } = route.params || false;

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    async function reloadLoggedIn() {
        setIsLoggedIn(await authModel.loggedIn());
        route.params = false;
    }

    if (reload) {
        reloadLoggedIn();
    }

    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

    async function reloadApp () {
        await Updates.reloadAsync();
    }

    return (
        <View>
            <View style={{backgroundColor: '#FFF', height: 24}}></View>
            <View style={Base.header}>
                <Text style={Base.headline}>SaabReservdelar</Text>
            </View>
            <Image source={saab} style={Base.image} />
            <View style={Typography.main}>
                <Text style={Typography.h2}>Välkommen!</Text>
                {isLoggedIn ? 
                <Text style={Typography.h3}>Du är inloggad</Text>:
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                    >
                    <Text style={Base.loginText}>Logga in</Text>
                </TouchableOpacity>}
                {isLoggedIn ? 
                    <TouchableOpacity
                        style={Base.loginScreenButton}
                        onPress={async () => {
                            await authModel.logout();
                            reloadApp();
                        }}
                        >
                        <Text style={Base.loginText}>Logga ut</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity
                        style={Base.loginScreenButton}
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                        >
                        <Text style={Base.loginText}>Registrera ny användare</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    );
};