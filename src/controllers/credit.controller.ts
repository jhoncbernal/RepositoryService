import { Service } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import { inject, injectable } from "inversify";
import { UserController } from "./user.controller";

@injectable()
class CreditController extends UserController {
  constructor(@inject(TYPES.Service) creditService: Service) {
    super(creditService);
  }
}
export default CreditController;
