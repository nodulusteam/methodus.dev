

export function AuthMiddleware(req: any, res: any, next: any) {

    res.status(200);

    return next();
}