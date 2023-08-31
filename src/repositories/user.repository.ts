import { TYPES } from "@/infrastructure/types";
import { User } from "@/models/user.model";
import { inject, injectable } from "inversify";
import { FilterQuery, Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class UserRepository extends BaseRepository {
  constructor(@inject(TYPES.User) private readonly user: Model<typeof User>) {
    super(user);
    user = this.user;
  }
  async getByAuth(
    auth: string
  ): Promise<FilterQuery<Model<any, {}, {}, {}>> | null> {
    return await this.user.findOne({ auth }).lean();
  }
}
export default UserRepository;
