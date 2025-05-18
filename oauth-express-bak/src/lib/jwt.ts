import jwt from 'jsonwebtoken';
import { KeystoneUser } from './keystone';
import { Request, Response, NextFunction } from "express";
import type { RequestHandler } from 'express';

export const issueJwt = (user: KeystoneUser): string => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        provider: user.provider,
        hideComplete: user.hideComplete,
        websitePreference: user.websitePreference,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export const verifyJwt: RequestHandler = (req, res, next) => {
    const authHeader = req.headers['authorization'] as string | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }

    try {
        const token = authHeader.split(' ')[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET!) as KeystoneUser
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid token' });
    }
};