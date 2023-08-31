import { TYPES } from "@/infrastructure/types";
import { Auth, IAuthDocument } from "@/models/auth.model";
import { inject, injectable } from "inversify";
import { FilterQuery, Model } from "mongoose";
import BaseRepository from "./base.repository";
@injectable()
class AuthRepository extends BaseRepository {
  constructor(@inject(TYPES.Auth) private readonly auth: Model<typeof Auth>) {
    super(auth);
    auth = this.auth;
  }
  async getByEmail(
    email: string
  ): Promise<FilterQuery<Model<any, {}, {}, {}>> | null> {
    return await this.auth.findOne({ email });
  }
}
export default AuthRepository;
