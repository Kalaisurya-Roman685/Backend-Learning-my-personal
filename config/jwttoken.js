import jwt from 'jsonwebtoken';

export const TokenGenrate = (id) => {
    return jwt.sign({ id },process.env.JWT_URL, { expiresIn: "3d" });
}

