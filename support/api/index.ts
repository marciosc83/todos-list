import { APIRequest, request } from "@playwright/test"
import dotenv from 'dotenv'
dotenv.config()

export class Api {

    baseURL: string | undefined
    request: APIRequest

    constructor(request: APIRequest, baseURL: string | undefined) {
        this.baseURL = baseURL
        this.request = request
    }

    /**
     * API Request Context definition
     * Returns the API response
     */
    async getAPIResponse() {
        const context = await request.newContext({
            baseURL: process.env.BASE_URL,
            extraHTTPHeaders: {
                'Accept': 'application/json'
            }
        })
        const response = await context.get('/todos')
        return response
    }

}