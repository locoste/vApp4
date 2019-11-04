export * from './auth.service';
import { AuthService } from './auth.service';
export * from './config.service';
import { ConfigService } from './config.service';
export * from './controllers.service';
import { ControllersService } from './controllers.service';
export * from './manufacturingOrders.service';
import { ManufacturingOrdersService } from './manufacturingOrders.service';
export const APIS = [AuthService, ConfigService, ControllersService, ManufacturingOrdersService];
