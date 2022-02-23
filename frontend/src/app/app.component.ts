import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from './event.service';
import { PersonService } from './person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private personService: PersonService, private eventService: EventService) {}

  addPersonForm = new FormGroup({
    name: new FormControl("", Validators.required)
  });

  linkPersonToEventForm = new FormGroup({
    event: new FormControl("", Validators.required),
    person: new FormControl("", Validators.required)
  })

  addEventForm = new FormGroup({
    title: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required)
  })

  people:any[] = []
  events: any[] = []

  ngOnInit(): void {
      this.getPeople();
      this.getEvents();
  }


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

  removePerson(name: string) {
    this.personService.removePerson(name).subscribe(() => {
      alert("person removed")
      this.getPeople();
    });
  }

  linkPersonToEvent() {
    if (this.linkPersonToEventForm.invalid) {
      alert("Please select a person and an event!")
      return;
    }
    let title = this.linkPersonToEventForm.controls["event"].value
    let name = this.linkPersonToEventForm.controls["person"].value

    this.personService.linkPersonToEvent(name, title).subscribe(() => {
      alert("WUHUUU")
    })
    
  }

  addEvent() {
    if (this.addEventForm.invalid) {
      alert("Please enter a title and a date for the Event")
      return;
    }

    this.eventService.addEvent(this.addEventForm.controls["title"].value, this.addEventForm.controls["date"].value)
    .subscribe(() => {
      alert("event added")
      this.getEvents();
    })
  }

  removeEvent(title: string) {
    this.eventService.removeEvent(title).subscribe(() => {
      alert("event removed")
      this.getEvents();
    });
  }

  private getPeople() {
    this.people = [];
    this.personService.getPeople().subscribe((data) => {
      this.peopleAPIToWeb(data);
    })
  }

  private getEvents() {
    this.events = [];
    this.eventService.getEvents()
    .subscribe((data) => {
      this.eventAPIToWeb(data);
    })
  }

  private peopleAPIToWeb(apiData: any) {
    apiData.records.forEach((record:any) => {
      this.people.push(record["_fields"][0].properties.name)
    });
  }

  private eventAPIToWeb(apiData:any) {
    apiData.records.forEach((record:any) => {
      this.events.push({
        title: record["_fields"][0].properties.title,
        date: record["_fields"][0].properties.date
      })
    });
  }
}
