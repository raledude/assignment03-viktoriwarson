import { APIRequestContext } from "playwright";
export class APIHelper {
    private baseUrl: string;
    private username: string;
    private token: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

    }

    async loginRequest(request: APIRequestContext) {
        const loginPost = await request.post(`${this.baseUrl}/login`, {
            data: {
                "username": `${process.env.TEST_USERNAME}`,
                "password": `${process.env.TEST_PASSWORD}`
            }
        });

        const loginData = await loginPost.json();
        this.username = loginData.username;
        this.token = loginData.token;
        return loginPost;
    }

    private getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-user-auth': JSON.stringify(
                {
                    "username": this.username,
                    "token": this.token
                })
        };
    }
    
    async getAllClients(request: APIRequestContext) {
        const headers = this.getAuthHeaders();
        return await request.get(`${this.baseUrl}/clients`, { headers });
    }


    async createClient(request: APIRequestContext, payload: object) {
        const headers = this.getAuthHeaders();
        const response = await request.post(`${this.baseUrl}/client/new`, {
            headers,
            data: JSON.stringify(payload)
        })
        return response;
    }
}


