import React from "react";

import { IUser } from "./actions";

interface IMainPageProps {
    user: IUser | undefined;
}

export const MainPage: React.FC<IMainPageProps> = (props: IMainPageProps) => {
    if (props.user === undefined) {
        return null;
    }
    return (
        <div>hello {props.user.fields.username}</div>
    );
}