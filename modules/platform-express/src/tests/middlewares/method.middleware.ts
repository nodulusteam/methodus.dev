

export function MethodMiddleware(req: any, res: any, next: any) {
    res.status(200);
    return next();
}