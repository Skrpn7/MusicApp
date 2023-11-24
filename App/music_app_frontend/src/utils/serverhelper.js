import { Backendurl } from "./config";


export const makeUnaauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(Backendurl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const fromattedresponse = response.json();
    return fromattedresponse;
};


export const makeAuthenticatedPOSTRequest = async (route, body) => {

    const token = getToken();

    const response = await fetch(Backendurl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });
    const fromattedresponse = response.json();
    return fromattedresponse;
};

export const makeAuthenticatedGETRequest = async (route) => {

    const token = getToken();

    const response = await fetch(Backendurl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
    });
    const fromattedresponse = response.json();
    return fromattedresponse;
};


const getToken = ()=> {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
}