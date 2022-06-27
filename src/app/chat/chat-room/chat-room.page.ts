import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent) content: IonContent;

  form: FormGroup;
  testBool = true;
  constructor(
    private navController: NavController,
  ) {
    window.addEventListener('keyboardDidShow', () => {
      this.scrollToBottom();
  });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
      this.scrollToBottom();
  }

  goBack() {
    this.navController.pop();
  }
  scrollToBottom() {
    console.log('Scrolling to bottom!');
    this.content.scrollToBottom(300);
  }
}
