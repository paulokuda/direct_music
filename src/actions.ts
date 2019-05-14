import * as $ from "jquery";

const BASE_URL = "https://api.airtable.com/v0/appbeGZ736QMn0jCE/Users?typecast=true";
// TODO: Save api key in .env file
const HEADERS = { "Authorization": "Bearer keyATHby2hjblrLXQ" }
const INSTANCE_LOCATOR = "v1:us1:77b21d6a-9c4c-4f53-bc62-09e71a32a680";

export interface IUser {
    id: string;
    createdTime: string;
    fields: {
        username: string;
        password: string;
    };
}

interface IFetchUserResponse {
    records: IUser[];
}

export async function createUserWithRails(name: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        return $.ajax({
            method: "POST",
            url: "https://fierce-waters-94489.herokuapp.com/api/v1/chatkit_users",
            headers: {
                "Authorization": "Token 80835fe4-3a21-449d-8b7d-ff79145dd011",
            },
            contentType: "application/x-www-form-urlencoded",
            data: {
                chatkit_user: {
                    name, chatkit_id: name,
                },
            },
            success: (response) => {
                console.log("response", response);
                resolve(response);
            },
            error: (err) => {
                console.log("err", err);
                reject(err);
            }
        });
    })
}

export async function createUser(username: string, password: string): Promise<IUser> {
    return new Promise((resolve, reject) => {
        return $.ajax({
            headers: HEADERS,
            method: "POST",
            url: BASE_URL,
            data: {
                fields: { username, password },
            },
            success: (response) => resolve(response),
            error: (error) => reject(error),
        });
    });
}

export async function fetchUser(username: string, password: string): Promise<IUser> {
    return new Promise ((resolve, reject) => {
        return $.ajax({
            headers: {
                "Authorization": "Bearer keyATHby2hjblrLXQ",
            },
            method: "GET",
            url: BASE_URL,
            data: {
                filterByFormula: `{username} = "${username}"`,
            },
            success: (response: IFetchUserResponse) => {
                const user = response.records[0];
                return resolve(user);
            },
            error: (error) => reject(error),
        });
    })
}

export async function createChatkitUser(username: string) {
    return new Promise((resolve, reject) => {
        return $.ajax({
            url: `https://us1.pusherplatform.io/services/chatkit/v4/${INSTANCE_LOCATOR}/users`,
            method: "POST",
            data: {
                id: username,
                name: username,
            },
            success: (result) => resolve(result),
            error: (error) => reject(error), 
        });
    })
}
