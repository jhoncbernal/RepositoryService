const TYPES = {
  Router: Symbol.for("Router"),
  Logger: Symbol.for("Logger"),
  EventBus: Symbol.for("EventBus"),
  Config: Symbol.for("Config"),

  UserController: Symbol.for("UserController"),
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),
  User: Symbol.for("User"),

  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  AuthRepository: Symbol.for("AuthRepository"),
  Auth: Symbol.for("Auth"),
};
const TAGS = {
  Controller: "Controller",
};
export { TYPES, TAGS };
