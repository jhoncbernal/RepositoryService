import { Repository, Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import BaseService from "./base.service";
import { IAuthDocument } from "@/models/auth.model";
import AuthRepository from "@/repositories/auth.repository";
@injectable()
class AuthService extends BaseService {
  constructor(
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthRepository
  ) {
    super(authRepository);
    this.authRepository = authRepository;
  }
  async getByEmail(email: string) {
    return this.authRepository.getByEmail(email);
  }
}
export default AuthService;
