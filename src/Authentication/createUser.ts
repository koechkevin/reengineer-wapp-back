import { ExpressCallBack } from '../app.interfaces';
import { Request, Response } from 'express';

export const createUser: ExpressCallBack = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'The endpoint works',
  });
};

export const sendMessage: ExpressCallBack = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'The endpoint works',
  });
};
