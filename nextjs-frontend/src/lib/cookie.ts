import Cookies from 'cookies'
import type {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

export const fetchCookie = (cookieName: string, req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res)
    return cookies.get(cookieName)
}

export const setCookie = (cookieName: string, value: string, req: NextApiRequest, res: NextApiResponse) => {
    const serialized = serialize(cookieName, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
}