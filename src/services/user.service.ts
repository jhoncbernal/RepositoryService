import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
@injectable()
class UserService extends BaseService {
  constructor(
    @inject(TYPES.Repository) private readonly userRepository: Repository
  ) {
    super(userRepository);
    this.userRepository = userRepository;
  }
}
export default UserService;
