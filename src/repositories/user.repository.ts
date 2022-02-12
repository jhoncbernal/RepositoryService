import { TYPES } from "@/infrastructure/types";
import { User } from "@/models/user.model";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class UserRepository extends BaseRepository {
  constructor(@inject(TYPES.User) private readonly user: Model<any>) {
    super(user);
    user = this.user;
  }
}
export default UserRepository;
