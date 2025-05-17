import {ErrorWrapper} from "../error-handler.js";
import { Request, Response } from "express";
import {getKeystoneUserById} from "../lib/keystone";

export class GenericAuthHandler {
    errorWrapper = new ErrorWrapper()

    logout = (req: Request, res: Response) => {
        req.logout(() => {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.json({ success: true });
            });
        });
    }

    getUserSession = (req: Request, res: Response) => {
        res.json({
            user: req.user,
            session: req.session,
            sessionID: req.sessionID
        })
    }

    refreshSession = async (req: Request, res: Response) => {
         try {
             const userId = (req.user as { id: string })?.id;

             if (!userId) {
                 res.status(401).json({error: 'Not logged in'});
             }

            const updatedUser = await getKeystoneUserById(userId);
            if (req.session.passport) {
                req.session.passport.user = updatedUser;
            }

            // ✅ Mark session as modified and explicitly save
            req.session.touch();      // updates session timestamp
            req.session.save((err) => {
                if (err) {
                    console.error('❌ Failed to save session:', err);
                    res.status(500).json({error: 'Could not save session'});
                }

                res.json({user: updatedUser});
            });
        } catch (err) {
             console.error('❌ Error refreshing session:', err);
             res.status(500).json({ error: 'Internal error' });
        }
    }
}