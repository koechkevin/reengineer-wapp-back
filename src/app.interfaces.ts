import { Request, Response } from 'express';

export type ExpressCallBack = (req: Request, res: Response, next?: ExpressCallBack) => void;
export interface Message {
  recipient: string;
  sender: string;
  id: string;
  text: string;
  createdAt: string;
  delivered?: boolean;
  sent?: boolean;
}
