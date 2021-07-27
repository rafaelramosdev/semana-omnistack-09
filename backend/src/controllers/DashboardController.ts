import { Request, Response } from 'express';

import Spot from '../models/Spot';

export default {
  async show(request: Request, response: Response) {
    const { user_id } = request.headers;

    const spots = await Spot.find({ user: user_id });

    return response.json(spots);
  }
}