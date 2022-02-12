import { Repository, Service } from "@/infrastructure/interfaces";
import { injectable } from "inversify";
@injectable()
class BaseService implements Service {
  constructor(private readonly baseRepository: Repository) {
    this.baseRepository = baseRepository;
  }
  async get(id: string) {
    if (!id) {
      const error = new Error();
      error.message = "id must be sent";
      throw error;
    }
    const currentEntity = await this.baseRepository.get(id);
    if (!currentEntity) {
      const error = new Error();
      error.message = "entity does not found";
      throw error;
    }
    return currentEntity;
  }
  async getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ) {
    return await this.baseRepository.getAll(
      propName,
      value,
      pageSize,
      pageNum,
      orderBy
    );
  }
  async create(entity: any) {
    return await this.baseRepository.create(entity);
  }
  async update(id: string, entity: any) {
    if (!id) {
      const error = new Error();
      error.message = "id must be sent";
      throw error;
    }
    return await this.baseRepository.update(id, entity);
  }
  async delete(id: string) {
    if (!id) {
      const error = new Error();
      error.message = "id must be sent";
      throw error;
    }
    return await this.baseRepository.delete(id);
  }
}
export default BaseService;
