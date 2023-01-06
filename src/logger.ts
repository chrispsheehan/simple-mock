export function logRequest(reference: string, req) {

    // make things appear in console
    console.log(`${reference}: ${req.url}`);
    console.log(`Params: ${JSON.stringify(req.params)}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
}