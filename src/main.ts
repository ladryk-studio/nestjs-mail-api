import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './config/app/app-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as defaultCluster from 'cluster';
import { cpus } from 'os';

const cluster: any = defaultCluster;

async function bootstrap() {
  const numCPUs = cpus().length;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  if (cluster.isMaster) {
    console.log(`Master server started on ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting`);
      cluster.fork();
    });
  } else {
    console.log(`Cluster server started on ${process.pid}`);

    // app.enableCors({
    //   origin: 'http://localhost:4001',
    // });
    await app.listen(appConfig.port);
  }
}
bootstrap();
