export async function awaitIfPromise<T>(value: T | Promise<T>): Promise<T> {
    if (value instanceof Promise) {
        return await value
    }
    return value
}
