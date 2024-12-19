// import jwt from 'jsonwebtoken';
import { createToken, verifyToken, decodeToken } from "./JWT";

export async function encodeJWT(header, payload, secret) {
    try {
        const headerObj = JSON.parse(header);
        const payloadObj = JSON.parse(payload);
        return await createToken(headerObj, payloadObj, secret); // Await the async function
    } catch (error) {
        console.error("Error encoding JWT:", error);
        return '';
    }
}

export async function decodeJWT(token) {
    try {
        const decoded = await decodeToken(token); // Await the async function
        console.log("decoded: ", decoded);
        
        if (decoded) {
            return {
                header: decoded.header,
                payload: decoded.payload
            };
        }
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
    return null;
}

export async function verify(token, secret){
    try {
        const signed = await verifyToken(token, secret); 
        if (signed) {
            const decoded = await decodeToken(token);
            return decoded;
        }
        return false;
    } catch (error) {
        console.error("Error verifying JWT:", error);
    }
}
