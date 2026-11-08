import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder/seeder.module.js";
import { SeederService } from "./seeder/seeder.service.js";


async function bootstrap() {
    const app = await NestFactory.create(SeederModule);
    const seeder = app.get(SeederService)
    await seeder.seed()
    await app.close()
}

bootstrap();