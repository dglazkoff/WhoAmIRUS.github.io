const withError = false;

export const mockedFetch: typeof fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    console.log(input);
    console.log(init);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!withError) {
                resolve({
                    json: () => Promise.resolve({ data: 'some data' }),
                } as Response);
            } else {
                reject(new Error('some error').message);
            }
        }, 2000);
    })
}