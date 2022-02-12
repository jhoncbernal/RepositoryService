import { Controller, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { provide } from "inversify-binding-decorators";

@provide(TYPES.Controller)
export class UserController implements Controller {
  constructor(@inject(TYPES.Service) private readonly userService: Service) {}
  async get(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.userService.get(userId);
      return res.send(user);
    } catch (error: any) {
      res.send("Error" + error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const user = await this.userService.create(body);
      return res.send(user);
    } catch (error: any) {
      res.send("Error." + error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      const { pageSize, pageNum } = req.query;

      const users = await this.userService.getAll("uniquecode", "", 10, 1, "");
      return res.send(users);
    } catch (error: any) {
      res.send("Error." + error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updateUser = await this.userService.update(userId, body);
      return res.send(updateUser);
    } catch (error: any) {
      res.send("Error." + error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const deleteUser = await this.userService.delete(userId);
      return res.send(deleteUser);
    } catch (error: any) {
      res.send("Error." + error);
    }
  }
}
