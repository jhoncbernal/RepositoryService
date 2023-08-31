import { Controller, Service } from "@/infrastructure/interfaces";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController<T extends Service> implements Controller {
  constructor(protected readonly baseService: T) {}
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { Id } = req.params;
      const result = await this.baseService.get(Id);
      return res.send(result);
    } catch (error: any) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const result = await this.baseService.create(body);
      return res.send(result);
    } catch (error: any) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageSize, pageNum, orderBy } = req.query;
      const results = await this.baseService.getAll(
        "",
        "",
        Number(pageSize),
        Number(pageNum),
        String(orderBy)
      );
      return res.send(results);
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { Id } = req.params;
      const updateBase = await this.baseService.update(Id, body);
      return res.send(updateBase);
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { Id } = req.params;
      const deleteBase = await this.baseService.delete(Id);
      return res.send(deleteBase);
    } catch (error: any) {
      next(error);
    }
  }
}
