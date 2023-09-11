import { NextFunction, Request, Response } from 'express';

export default class ValidationLogin {
  static async validate(
    req: Request,
    res:Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        { message: 'All fields must be filled' },
      );
    }

    const regex = /\S+@\S+\.\S+/;

    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
