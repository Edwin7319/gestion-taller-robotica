import {Module} from '@nestjs/common';
import {ServicioGateway} from './servicio.gateway';

@Module({
    imports: [ServicioGateway],
    exports: [ServicioGateway]
})
export class WebsocketModule {}
