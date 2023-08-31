import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
import UserRepository from "@/repositories/user.repository";
@injectable()
class UserService extends BaseService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {
    super(userRepository);
    this.userRepository = userRepository;
  }
  async getByAuth(auth: string) {
    return this.userRepository.getByAuth(auth);
  }
}
export default UserService;
