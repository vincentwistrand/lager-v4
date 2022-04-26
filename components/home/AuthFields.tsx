import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    console.log(title);
    return (
        <View style={{ ...Typography.main }}>
            <Text style={Typography.h2}>{title}</Text>

            <Text style={Typography.p}>E-post</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
            />

            <Text style={Typography.p}>Lösenord</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
            />

            {title === "Registrera" && 
                <Button
                    title='Registrera'
                    onPress={() => submit()}
                />}

            {title === "Logga in" &&
                <Button
                    title='Logga in'
                    onPress={() => submit()}
                />}
            
            {title === "Logga in" &&
                <Button
                    title='Registrera ny användare'
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />}
        </View>
    );
};