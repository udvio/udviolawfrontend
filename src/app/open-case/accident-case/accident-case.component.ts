import { CaseStatusService } from './../../services/case-status/case-status.service';
import { AppConfig } from './../../../environments/environment';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accident-case',
  templateUrl: './accident-case.component.html',
  styleUrls: ['./accident-case.component.scss']
})
export class AccidentCaseComponent implements OnInit {

  accidentForm: FormGroup = this.fb.group({
    clientName: ["", Validators.required],
    identityCardNumber: ["", Validators.required],
    accidentDate: ["", Validators.required],
    licensePlateNumber: ["", Validators.required]

  })

  isProduction = AppConfig.production

  constructor(
    private fb: FormBuilder,
    private router: Router, //This will change the route.
    private caseStatusService: CaseStatusService
    ) { }
  
  
  submit() {
    if (this.isProduction === false) {
      console.info(`${AccidentCaseComponent.name}::${this.submit.name} -> ${JSON.stringify(this.accidentForm.value)}`)
    }
    let formObject = this.accidentForm.getRawValue()

    this.caseStatusService.createCaseData(formObject)
    .subscribe(
      res => { 
        if (res === true) {
          this.router.navigate(['case-status'])
        } else (console.error("unable to communicate"))
      },
      err => {
        console.error("Error during communication: ", err)
      }
    )
    
  }

  resetForm(){
    this.accidentForm.reset({
      clientName: "",
      identityCardNumber: "",
      accidentDate: "",
      licensePlateNumber: ""
    })
  }

  ngOnInit() {
    
  }

}
