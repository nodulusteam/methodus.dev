

export function AuthMiddleware(req: any, res: any, next: any) {

    console.log('AuthMiddleware', req.url);
    res.status(200);

    return next();
}