import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MustMatch } from 'src/app/shared/services/Validators/CustomValidators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() title:string = '';
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  signUpForm: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private authServ: AuthService,
    private toasterService: ToastrService,
    ) {}

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = {
      validators:[ MustMatch('password', 'confirmPassword'),MustMatch('email', 'confirmEmail')],
    };

    this.signUpForm = this.fb.group(
      {
        firstName: ['', [, Validators.minLength(3), Validators.required]],
        lastName: ['', [, Validators.minLength(3), Validators.required]],
        address: ['', [, Validators.required]],

        password: ['', [, Validators.minLength(6),Validators.required]],
        confirmPassword: ['', [, Validators.required]], //TODO here custome to comfirm password

        email: ['', [, Validators.required, Validators.email]],
        confirmEmail: [
          '',
          [
            Validators.required,
            Validators.email, //TODO here custome to confirme email
          ],
        ],
        phoneNumber: [''],
        birthdate: ['', [, Validators.required]],
      },
      formOptions,
    );
  }

  get f() {
    return this.signUpForm.controls;
  }
  
  onAdd(){
      if(this.signUpForm.invalid){
        this.signUpForm.markAllAsTouched()
        return;
      }
      if(this.title === 'Add Amin User'){
        this.authServ.registerUserAdmin(this.signUpForm.value).subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.toasterService.success('Registeration Sucessuflly');
              this.activeModal.close()
              this.refresh.emit(true)
            } else {
              this.toasterService.error('Data is invalid');
            }
          },
          (err) => {
            this.toasterService.error('Error', err);
          }
        );
      }else{
        this.authServ.registerUser(this.signUpForm.value).subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.toasterService.success('Registeration Sucessuflly');
              this.activeModal.close()
              this.refresh.emit(true)
            } else {
              this.toasterService.error('Data is invalid');
            }
          },
          (err) => {
            this.toasterService.error('Error', err);
          }
        );
      }
     
  }


  
}
