import React, { useState } from "react";
import Bcrypt from "bcryptjs";

import { createUser, fetchUser, IUser } from "./actions";

const SALT = Bcrypt.genSaltSync(10);

enum LoginTypes {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
}

interface ILoginContainerProps {
    onSuccess(user: IUser): void;
}

export const LoginContainer: React.FC<ILoginContainerProps> = (props: ILoginContainerProps) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginType, setLoginType ] = useState(LoginTypes.SIGN_IN);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hashedPassword = Bcrypt.hashSync(password, SALT);
        if (loginType === LoginTypes.SIGN_IN) {
            const user = await fetchUser(username, password);
            Bcrypt.compare(password, user.fields.password, function(err, isLoginValid) {
                console.log("isLoginValid", isLoginValid)
                if (isLoginValid) {
                    props.onSuccess(user);
                } else {
                    
                }
            });
        } else {
            console.log("password for signin: ", password);
            try {
                Bcrypt.genSalt(10, (err, salt) => {
                    Bcrypt.hash(password, salt, async function(err, hash) {
                        console.log("hash to save: ", hash);
                        await createUser(username, hash);
                    });
                });
            } finally {
                console.log("finally");
            }
        }
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("username", event.currentTarget.value);
        setUsername(event.currentTarget.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("username", event.currentTarget.value);
        setPassword(event.currentTarget.value);
    }
    const renderButtonText = () => {
        if (loginType === LoginTypes.SIGN_IN) {
            return "Sign in";
        }
        return "Sign up";
    }
    const toggleLoginType = () => {
        if (loginType === LoginTypes.SIGN_IN) {
            setLoginType(LoginTypes.SIGN_UP);
        } else {
            setLoginType(LoginTypes.SIGN_IN);
        }
    }
    const renderToggleSection = () => {
        if (loginType === LoginTypes.SIGN_IN) {
            return (
                <>
                    <div>Don't have an account?</div>
                    <div onClick={toggleLoginType}>Sign up</div>
                </>
            );
        }
        return (
            <>
                <div>Already have an account?</div>
                <div onClick={toggleLoginType}>Sign in</div>
            </>
        );
    }
    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="username" onChange={handleUsernameChange} />
                <input type="password" name="password" onChange={handlePasswordChange} />
                <button type="submit">{renderButtonText()}</button>
            </form>
            {renderToggleSection()}
        </div>
    )
}