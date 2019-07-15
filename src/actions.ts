import * as $ from "jquery";

// TODO: Save api key in .env file
const RAILS_AUTH_HEADER = { "Authorization": "Token 80835fe4-3a21-449d-8b7d-ff79145dd011" }
const SESSION_BASE_URL = "/api/v1/session";
const USER_BASE_URL = "/api/v1/chatkit_users";
const DIRECT_MUSIC_SESSION_TOKEN_KEY = "directMusicSessionToken";
export const DIRECT_MUSIC_USER_ID_KEY = "directMusicUserId";

export async function createUser(name: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        return $.ajax({
            method: "POST",
            url: USER_BASE_URL,
            headers: RAILS_AUTH_HEADER,
            contentType: "application/json",
            data: JSON.stringify({
                chatkit_user: {
                    chatkit_id: name,
                    name,
                    password,
                },
            }),
            success: (response) => {
                localStorage.setItem(DIRECT_MUSIC_USER_ID_KEY, response.chatkit_id);
                localStorage.setItem(DIRECT_MUSIC_SESSION_TOKEN_KEY, response.session_token);
                resolve(response.chatkit_id);
            },
            error: (err) => {
                reject(err);
            }
        });
    })
}

export async function loginUser(name: string, password: string): Promise<any> {
    return new Promise ((resolve, reject) => {
        return $.ajax({
            headers: RAILS_AUTH_HEADER,
            method: "POST",
            url: SESSION_BASE_URL,
            contentType: "application/json",
            data: JSON.stringify({
                chatkit_user: {
                    name,
                    password,
                },
            }),
            success: (response) => {
                localStorage.setItem(DIRECT_MUSIC_USER_ID_KEY, response.chatkit_id);
                localStorage.setItem(DIRECT_MUSIC_SESSION_TOKEN_KEY, response.session_token);
                resolve(response.chatkit_id);
            },
            error: (error) => {
                reject(error);
            },
        });
    })
}

export async function fetchAllUsernames(): Promise<any> {
    return new Promise ((resolve, reject) => {
        return $.ajax({
            headers: RAILS_AUTH_HEADER,
            method: "GET",
            url: "/api/v1/chatkit_users",
            contentType: "application/json",
            success: (response) => {
                resolve(response.usernames);
            },
            error: (error) => {
                reject(error);
            },
        });
    })
}
