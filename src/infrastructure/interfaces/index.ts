export interface Service {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
}

export interface Repository {
  get(id: string): Promise<any>;
  getAll(
    propName: string,
    value: string,
    pageSize: number,
    pageNum: number,
    orderBy: string
  ): Promise<any>;
  update(id: string, entity: any): Promise<any>;
  delete(id: string): Promise<any>;
  create(entity: any): Promise<any>;
}

export interface Controller {
  get(...args: any): Promise<any>;
  getAll(...args: any): Promise<any>;
  update(...args: any): Promise<any>;
  delete(...args: any): Promise<any>;
  create(...args: any): Promise<any>;
}

export interface ILogger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

export interface IEventBus {
  subscribe(event: string, callback: Function): boolean;
  unsubscribe(event: string, callback: Function): boolean;
  emit(event: string, data: any): void;
}
