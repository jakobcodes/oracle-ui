import {Action} from "../types/Action";

export async function loadActions(): Promise<Action[]> {
    const API_URL = "http://localhost:8888";

    try {
        const response = await fetch(`${API_URL}/history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch actions");
        }

        return await response.json();
    } catch (error) {
        console.error("Error loading actions:", error);
        throw error;
    }
}
