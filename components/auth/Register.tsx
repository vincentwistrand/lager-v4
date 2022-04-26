import Auth from '../../interface/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    console.log(setIsLoggedIn);

    async function Register() {
        if (auth.email && auth.password) {
            // Snart återkommer vi till AuthModel :)
            const result = await AuthModel.register(auth.email, auth.password);

            setIsLoggedIn(true);
            navigation.navigate("Home", { reload: true });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={Register}
            title="Registrera"
            navigation={navigation}
        />
    );
};