import { USER_SERVICE } from "../../domain/outbound/user.service";
import { RestUserService } from "./rest-user.service";

export const REST_SERVICES = [
  {
    provide: USER_SERVICE,
    useClass: RestUserService,
  },
];
