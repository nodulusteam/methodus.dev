

export function MethodMiddleware(req: any, res: any, next: any) {
    console.log('MethodMiddleware', req.url);
    res.status(200);
    return next();
}