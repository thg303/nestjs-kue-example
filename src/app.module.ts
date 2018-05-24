import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleRef } from '@nestjs/core';
import { KueModule, KueTaskRegisterService } from 'nestjs-kue';
import { UsersTasks } from './users.tasks';
import { OnModuleInit } from '@nestjs/common/interfaces';

@Module({
  imports: [KueModule],
  controllers: [AppController],
  providers: [ AppService, UsersTasks ]
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly taskRegister: KueTaskRegisterService
) {}

onModuleInit() {
    this.taskRegister.setModuleRef(this.moduleRef);
    this.taskRegister.register(UsersTasks);
}
}
