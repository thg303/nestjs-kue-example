import { Injectable } from '@nestjs/common';
import { Job, JobCallback, DoneCallback } from 'kue';
import { Task } from 'nestjs-kue';
import { AppService } from './app.service';

@Injectable()
export class UsersTasks {
  constructor(private appService: AppService) {}
    @Task({ name: 'justATest' })
    justATest(job: Job, done: DoneCallback) {
        const result: string = this.appService.root();
        done(null, result);
    }
}