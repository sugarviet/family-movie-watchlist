import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
}

export const verityToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const decodedToken = (token) => {
    return jwt.decode(token);
}