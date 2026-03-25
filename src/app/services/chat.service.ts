import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { 
  }

  sendMenssage(mensaje: string) {
    const payload = {
      de: 'Alfredo',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessage() {
    return this.wsService.listen('mensaje-nuevo');
  }

}
