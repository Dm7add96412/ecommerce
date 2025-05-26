import { ApiError } from "../types/ApiError";

export function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'data' in error
}