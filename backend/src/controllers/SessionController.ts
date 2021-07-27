import { Request, Response } from 'express';

import User from '../models/User';

export default {
  async store(request: Request, response: Response) {
    const { email } = request.body;

    let user = await User.findOne({ email });

    if (!user)
      user = await User.create({ email });

    return response.json(user);
  }
};
