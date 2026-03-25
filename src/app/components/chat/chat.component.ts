import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  texto = '';
  mensajesSubscription: Subscription;
  elemento: HTMLElement;
  mensajes: any[] = [];

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatService
      .getMessage()
      .subscribe((msg) => {
        this.mensajes.push(msg);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }

  ngOnDestroy(): void {
    if (this.mensajesSubscription) {
      this.mensajesSubscription.unsubscribe();
    }
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMenssage(this.texto);
    this.texto = '';
  }
}
