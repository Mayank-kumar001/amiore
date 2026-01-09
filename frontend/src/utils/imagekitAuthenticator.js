import { axiosInstance } from "./axiosInstance";

export const imagekitAuthenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await axiosInstance.get("/auth/imagekitAuth");
        const authData = response.data;
        console.log(authData)
        if (!authData.success) {
            // If the server response is not successful, extract the error text for debugging.
            console.log("some axios error")
        }

        // Parse and destructure the response JSON for upload credentials.
        // const data = await authData.json();
        const { signature, expire, token, publicKey } = authData.data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};