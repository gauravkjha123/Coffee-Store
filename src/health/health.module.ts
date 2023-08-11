import { Module } from '@nestjs/common';
import HealthController from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ElasticsearchHealthIndicator } from './elasticsearchHealthIndicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [ElasticsearchHealthIndicator],
})
export default class HealthModule {}
