import { Repository } from "@/infrastructure/interfaces";
import { Model } from "mongoose";
import { injectable } from "inversify";

@injectable()
class BaseRepository implements Repository {
  constructor(private readonly model: Model<any>) {
    this.model = model;
  }
  async get(id: string) {
    return await this.model.findById(id);
  }
  async getAll(
    propName: any,
    value: any,
    pageSize = 5,
    pageNum = 1,
    orderBy = "_id"
  ) {
    const skips = pageSize * (pageNum - 1);
    return await this.model
      .find({ [propName]: value })
      .sort(`-${orderBy}`)
      .skip(skips)
      .limit(pageSize)
      .lean();
  }
  async create(entity: any) {
    return await this.model.create(entity);
  }
  async update(id: any, entity: any) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true }).lean();
  }
  async delete(id: any) {
    return await this.model.findByIdAndDelete(id).lean();
  }
}
export default BaseRepository;
