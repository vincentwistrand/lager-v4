import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { TouchableOpacity } from "react-native-gesture-handler";

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
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => submit()}
                    underlayColor='#fff'>
                    <Text style={Base.loginText}>Registrera</Text>
                </TouchableOpacity>}
            {title === "Logga in" &&
            <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={() => submit()}
                underlayColor='#fff'>
                <Text style={Base.loginText}>Logga in</Text>
            </TouchableOpacity>}
            {title === "Logga in" &&
                <TouchableOpacity
                     style={Base.loginScreenButton}
                     onPress={() => {
                        navigation.navigate("Register");
                    }}
                    underlayColor='#fff'>
                    <Text style={Base.loginText}>Registrera ny användare</Text>
                </TouchableOpacity>
            }
        </View>
    );
};