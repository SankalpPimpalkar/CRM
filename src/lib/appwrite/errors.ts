export function ThrowErrorAppwrite(error: unknown, callbackFnName: string) {
    console.error(`Error <${callbackFnName}:Appwrite>`);

    if (error instanceof Error) {
        console.error("Error details:", error.message);
        throw error;
    } else {
        throw Error('Unexpected Error')
    }
}
