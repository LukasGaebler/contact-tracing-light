import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {

  addPersonForm = new FormGroup({
    name: new FormControl("", Validators.required)
  });

  people:any[] = []


  constructor(private personService: PersonService) { }

  addPerson() {
    if (this.addPersonForm.invalid) {
      alert("Please enter a name for the Person")
      return;
    }

    if (this.people.includes(this.addPersonForm.controls["name"].value)) {
      alert("Someone with this name is already registered")
      return;
    }
    this.personService.addPerson(this.addPersonForm.controls["name"].value)
    .subscribe(() => {
      alert("person added")
      this.getPeople();
    })
  }

  private getPeople() {
    this.people = [];
    this.personService.getPeople().subscribe((data) => {
      this.peopleAPIToWeb(data);
    })
  }

  private peopleAPIToWeb(apiData: any) {
    apiData.records.forEach((record:any) => {
      this.people.push(record["_fields"][0].properties.name)
    });
  }
}
