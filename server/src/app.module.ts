import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PaymentsModule } from './payments/payments.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [PaymentsModule, CampaignsModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
