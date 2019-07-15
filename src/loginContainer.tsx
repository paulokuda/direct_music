import React, { useState } from "react";
import Bcrypt from "bcryptjs";
import { FormGroup, InputGroup, Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { loginUser, createUser } from "./actions";
import "./loginContainer.css";

enum LoginTypes {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
}

interface ILoginContainerProps {
    onSuccess(user: any): void;
}

export const LoginContainer: React.FC<ILoginContainerProps> = (props: ILoginContainerProps) => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginType, setLoginType ] = useState(LoginTypes.SIGN_IN);

    const isButtonDisabled = () => username === "" || password === "";
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await (loginType === LoginTypes.SIGN_IN ? loginUser(username, password) : createUser(username, password));
        props.onSuccess(user);
    }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }
    const renderButtonText = () => loginType === LoginTypes.SIGN_IN ? "Sign in" : "Sign up";

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
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <FormGroup
                    className="login-form-input"
                    label="Username"
                    labelFor="username"
                    labelInfo="(required)"
                >
                    <InputGroup id="username" autoFocus={true} onChange={handleUsernameChange} placeholder="Username" />
                </FormGroup>
                <FormGroup
                    className="login-form-input"
                    label="Password"
                    labelFor="password"
                    labelInfo="(required)"
                >
                    <InputGroup id="password" type="password"  onChange={handlePasswordChange} placeholder="Password" />
                </FormGroup>
                <Button type="submit" disabled={isButtonDisabled()}>{renderButtonText()}</Button>
            </form>
            {renderToggleSection()}
        </div>
    )
}