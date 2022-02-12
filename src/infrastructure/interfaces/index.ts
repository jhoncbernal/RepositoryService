import { Request, Response } from "express";
import { Model as MongooseModel } from "mongoose";
export interface Service {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
}

export interface Repository {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
}

export interface Controller {
  get(req: Request, res: Response): Promise<any>;
  getAll(req: Request, res: Response): Promise<any>;
  update(req: Request, res: Response): Promise<any>;
  delete(req: Request, res: Response): Promise<any>;
  create(req: Request, res: Response): Promise<any>;
}
