import * as $ from "jquery";

// TODO: Save api key in .env file
const RAILS_AUTH_HEADER = { "Authorization": "Token 80835fe4-3a21-449d-8b7d-ff79145dd011" }
const BASE_URL = "https://fierce-waters-94489.herokuapp.com/api/v1/chatkit_users";

export async function createUser(name: string, passwordHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
        return $.ajax({
            method: "POST",
            url: BASE_URL,
            headers: RAILS_AUTH_HEADER,
            contentType: "application/x-www-form-urlencoded",
            data: {
                chatkit_user: {
                    chatkit_id: name,
                    name,
                    password_hash: passwordHash,
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

export async function fetchUser(username: string): Promise<any> {
    return new Promise ((resolve, reject) => {
        return $.ajax({
            headers: RAILS_AUTH_HEADER,
            method: "GET",
            url: BASE_URL,
            data: {
                chatkit_id: username,
            },
            success: (response) => resolve(response),
            error: (error) => reject(error),
        });
    })
}
