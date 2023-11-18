
import jwt from 'jsonwebtoken';
import ResponseError from './responseError';

export const check = async (req, res, next) => {
    try {
        // const authHeader = req?.headers?.authorization || '';
        // const token = authHeader.split(' ')[1]
        // // console.log('token', token);

        // if (token) {
        //   const decoded = jwtDecode<Auth0JwtPayload>(token)
        //   if (decoded?.sub) {
        //     next()
        //   }
        // } else {
        //   res.status(403).json({
        //     status: 403,
        //     code: 'INVALID_TOKEN',
        //     message: 'Invalid token',
        //   })
        // }
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!`${authHeader}`?.startsWith('Bearer ')) return res.status(401).json({
            status: 401,
            code: 'Unauthorized',
            message: 'Unauthorized',
        });
        const token = `${authHeader}`?.split(' ')[1];
        console.log('token in check', token, authHeader)
        jwt.verify(
            token,
            'localsecret',
            (err, decoded) => {
                if (err) return res.status(403).json({
                    status: 403,
                    code: 'INVALID_TOKEN',
                    message: 'Invalid Token',
                }); //invalid token
                if (decoded) {
                    next();
                }
            }
        );
    } catch (error) {
        ResponseError(error, res)
    }
}

