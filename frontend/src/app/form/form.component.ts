import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public authForm: FormGroup = this.formBuilder.group({});
  @Input() public buttonText: string = '';
  @Output() public buttonClick: EventEmitter<string[]> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      'email': '',
      'password': ''
    });
  }

  public buttonAction() {
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];

    this.buttonClick.emit([email, password]);
  }

}
