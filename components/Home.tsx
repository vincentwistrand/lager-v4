import { DevSettings, Image, Text, View } from 'react-native';
import { Typography, Base } from '../styles/index.js';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from 'react';
import authModel from "../models/auth";
import saab from '../assets/saab.jpg';
import * as Updates from 'expo-updates';

export default function Home(props, route) {
    const { reload } = route.params || true;
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    async function reloadLoggedIn() {
        setIsLoggedIn(await authModel.loggedIn());
    }

    if (true) {
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
            <View style={Base.header}>
                <Text style={Base.text}>SaabReservdelar</Text>
            </View>
            <Image source={saab} style={Base.image} />
            <View style={Typography.main}>
                <Text style={Typography.h2}>Välkommen!</Text>
                {isLoggedIn ? 
                <Text style={Typography.h3}>Du är inloggad</Text>:
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => {
                        props.navigation.navigate("Login");
                    }}
                    underlayColor='#fff'>
                    <Text style={Base.loginText}>Logga in</Text>
                </TouchableOpacity>}
                {isLoggedIn ? 
                    <TouchableOpacity
                        style={Base.loginScreenButton}
                        onPress={async () => {
                            await authModel.logout();
                            reloadApp();
                        }}
                        underlayColor='#fff'>
                        <Text style={Base.loginText}>Logga ut</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity
                        style={Base.loginScreenButton}
                        onPress={() => {
                            props.navigation.navigate("Register");
                        }}
                        underlayColor='#fff'>
                        <Text style={Base.loginText}>Registrera ny användare</Text>
                    </TouchableOpacity>}
            </View>
        </View>
    );
};