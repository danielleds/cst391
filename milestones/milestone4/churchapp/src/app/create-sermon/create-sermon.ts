import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sermon } from '../models/sermon.model';
import { ChurchService } from '../service/church-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sermon',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-sermon.html',
  styleUrl: './create-sermon.css'
})
export class CreateSermon {
  sermonId: number = 0;
  dateString: string = "";
  sermon: Sermon = {
    sermonId: 0,
    title: "",
    date: new Date(),
    summary: ""
  }

  constructor(private service: ChurchService,
    private router: Router) { }

  ngOnInit() { }

  public onSubmit() {
    this.sermon.date =
      new Date((document.getElementById("date")! as HTMLInputElement).value);
    this.service.createSermon(this.sermon, () => {
      alert("Sermon successfully added.");
      this.router.navigate(['/sermons']);
    });
  }
}
