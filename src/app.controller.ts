import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  START_APP() {
    return this.appService.startApp();
  }

  // Agregar un  post para aceptar el uuid de la work order
  // @Post()
  // ACCEPT_WORK_ORDER(@Body() body: { uuid: string }) {
  //   return this.appService.acceptWorkOrder(body.uuid);
  // }
}
