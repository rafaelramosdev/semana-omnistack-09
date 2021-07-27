import { Request, Response } from 'express';

import User from '../models/User';
import Spot from '../models/Spot';

export default {
  async index(request: Request, response: Response) {
    const { tech } = request.query;

    const spots = await Spot.find({ techs: tech });

    return response.json(spots);
  },

  async store(request: Request, response: Response) {
    const { company, techs, price } = request.body;
    const { user_id } = request.headers;
    const { filename } = request.file as Express.Multer.File;

    const user = await User.findById(user_id);

    if (!user)
      return response.status(400).json({ error: 'User does not exists' });

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map((tech: string) => tech.trim()),
      price
    })

    return response.json(spot)
  }
};