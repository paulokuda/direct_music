import * as $ from "jquery";

const BASE_URL = "https://api.airtable.com/v0/appbeGZ736QMn0jCE/Users?typecast=true";
// TODO: Save api key in .env file
const HEADERS = { "Authorization": "Bearer keyATHby2hjblrLXQ" }

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
