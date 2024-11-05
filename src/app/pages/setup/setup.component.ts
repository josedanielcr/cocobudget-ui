import {Component, signal, WritableSignal} from '@angular/core';
import {AccountService} from '../../services/accounts/account.service';
import {PeriodLength} from '../../models/utils/PeriodLength';
import {PeriodsLengthEnum} from '../../models/Enums/PeriodsLength.enum';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PeriodService} from '../../services/periods/period.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CreateUserRequest} from '../../models/contracts/account/CreateUserRequest';
import {CreatePeriodRequest} from '../../models/contracts/period/CreatePeriodRequest';
import {Result} from '../../shared/Result';
import {User} from '../../models/User';
import {merge} from 'rxjs';
import {MessageService} from '../../services/utils/message.service';
import {ToastType} from '../../models/Enums/ToastType.enum';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {

  public periodLengths: PeriodLength[] = [];

  // form controls
  readonly firstName: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly lastName: FormControl<string | null> = new FormControl('', [Validators.required]);
  readonly startDate: FormControl<string | null> = new FormControl(new Date().toISOString().split('T')[0],[Validators.required]);
  readonly dayLength: FormControl<number | null> = new FormControl(30);
  readonly length: FormControl<number | null> = new FormControl(0);

  firstNameErrorMessage: WritableSignal<string> = signal('');
  lastNameErrorMessage: WritableSignal<string> = signal('');
  startDateErrorMessage: WritableSignal<string> = signal('');
  dayLengthErrorMessage: WritableSignal<string> = signal('');
  lengthErrorMessage: WritableSignal<string> = signal('');
  // form controls end

  constructor(public accountService : AccountService,
              private router : Router,
              private periodService : PeriodService,
              private messageService : MessageService) {
    this.setFormControls();
    this.setPeriodLengthsToSelect();
    this.subscribeToStartDateChanges();
  }

  private setFormControls() {
    merge(
      this.firstName.statusChanges,
      this.firstName.valueChanges,
      this.lastName.statusChanges,
      this.lastName.valueChanges,
      this.startDate.statusChanges,
      this.startDate.valueChanges,
      this.dayLength.statusChanges,
      this.dayLength.valueChanges,
      this.length.statusChanges,
      this.length.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessages();
      });
  }

  public updateErrorMessages(): void {
    this.firstNameErrorMessage.set(this.getErrorMessage(this.firstName, 'first name'));
    this.lastNameErrorMessage.set(this.getErrorMessage(this.lastName, 'last name'));
    this.startDateErrorMessage.set(this.getErrorMessage(this.startDate, 'start date'));
    this.dayLengthErrorMessage.set(this.getErrorMessage(this.dayLength, 'day length'));
    this.lengthErrorMessage.set(this.getErrorMessage(this.length, 'length'));
  }

  public getErrorMessage(control: FormControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `You must enter a ${fieldName}`;
    } else if (control.hasError('email')) {
      return `Not a valid email for ${fieldName}`;
    }
    return '';
  }

  private setPeriodLengthsToSelect() {
    const startDate = new Date(this.startDate.value!);
    this.periodLengths = [
      new PeriodLength(PeriodsLengthEnum.Weekly, 0, 7),
      new PeriodLength(PeriodsLengthEnum.BiWeekly, 1, 14),
      new PeriodLength(PeriodsLengthEnum.Monthly, 2, this.getNumDaysInMonth(startDate)),
      new PeriodLength(PeriodsLengthEnum.Custom, 3, this.dayLength.value!)
    ]
  }

  setupUser() {
    if(!this.validateFormBeforeSetup()){
      this.messageService.showToastMessage('You must complete all the necessary information to set up your account', ToastType.Error, 5000);
    }
    const [createUserRequest, createPeriodRequest] = this.getCreateUserAndPeriodRequests();
    this.executeUserAndPeriodSetup(createUserRequest, createPeriodRequest);
  }

  private getCreateUserAndPeriodRequests(): [CreateUserRequest, CreatePeriodRequest] {
    const startDate = new Date(this.startDate.value!);
    const createUserRequest = new CreateUserRequest(this.firstName.value!, this.lastName.value!, this.accountService.userEmail(), '');
    const createPeriodRequest = new CreatePeriodRequest(startDate, Number(this.length.value), this.dayLength.value!,'');
    return [createUserRequest, createPeriodRequest];
  }

  private executeUserAndPeriodSetup(createUserRequest: CreateUserRequest, createPeriodRequest: CreatePeriodRequest) {
    this.accountService.setupUser(createUserRequest).subscribe({
      next: (result: Result<User>) => {
        createPeriodRequest.userId = result.value?.id!;
        this.setupPeriod(createPeriodRequest);
      },
      error: (result: Result<User>) => {
        console.log(result);
      }
    });
  }

  isCustomPeriodChecked(): boolean {
    return this.length.value == this.periodLengths.find(periodLength => periodLength.name == PeriodsLengthEnum.Custom)?.value;
  }

  public getDaysToAddToHint() {
    if (this.length.value == this.periodLengths.find(periodLength => periodLength.name == PeriodsLengthEnum.Custom)?.value) {
      return this.dayLength.value;
    }
    return this.periodLengths.find(periodLength => periodLength.value == this.length.value)?.numberOfDays;
  }

  private setupPeriod(createPeriodRequest: CreatePeriodRequest) {
    this.periodService.createPeriod(createPeriodRequest).subscribe({
      next: (result: Result<any>) => {
        this.messageService.showToastMessage('Your budget has been set up!', ToastType.Success, 5000);
        this.router.navigate(['/home/budget']).then();
      },
      error: (result: Result<any>) => {
        this.messageService.showToastMessage(result.error.message, ToastType.Error, 5000);
      }
    });
  }

  private validateFormBeforeSetup() {
    if(this.firstName.invalid || this.lastName.invalid) return false;
    if(this.isCustomPeriodChecked()){
      if(this.startDate.invalid || this.dayLength.invalid) return false;
    }
    else{
      if(this.startDate.invalid) return false;
    }
    return true;
  }

  private getNumDaysInMonth(startDate: Date) {
    return new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  }

  private subscribeToStartDateChanges() {
    this.startDate.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.setPeriodLengthsToSelect();
    });
  }
}
