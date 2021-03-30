import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthUserService from '@modules/users/services/AuthUserService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    console.log('process.env.MONGO_URL', process.env.MONGO_URL)
    console.log('process.env.APP_SECRET', process.env.APP_SECRET)
    console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)
    console.log('process.env.REDIS_URL', process.env.REDIS_URL)

    const authUser = container.resolve(AuthUserService);

    const { user, token } = await authUser.run({ email, password });

    return res.status(201).json({ user: classToClass(user), token });
  }
}
