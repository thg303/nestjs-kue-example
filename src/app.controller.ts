import { Get, Response, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersTasks } from 'users.tasks';
import { KueService } from 'nestjs-kue';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kueService: KueService,
    private readonly tasks: UsersTasks
  ) {}

  @Get()
  root(@Response() res): string {
    const job = this.kueService.createJob(this.tasks.justATest, {a: 'b'}).save();
    job.on('complete', (result) => res.send(result));
    // return this.appService.root();
  }
}
