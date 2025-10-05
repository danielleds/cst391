import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sermon } from '../models/sermon.model';
import { ChurchService } from '../service/church-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-sermon',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-sermon.html',
  styleUrl: './edit-sermon.css'
})
export class EditSermon {
  sermonId: number = 0;
  dateString: string = "";
  sermon: Sermon = {
    sermonId: 0,
    title: "",
    date: new Date(),
    summary: ""
  }

  constructor(private service: ChurchService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sermonId = parseInt(params.get('id')!);
      this.service.getSermonById(this.sermonId, (sermon: Sermon) => {
        this.sermon = sermon;
        // The retrieved date apparently is not a date object
        // So parse it as one and convert it to a string the input element can use
        this.dateString = new Date(this.sermon.date).toLocaleDateString("en-CA");

        // Use change detector so that the page will load after detecting the changes
        this.cd.detectChanges();
        console.log("Sermon retrieved.");
      });
    });
  }

  public onSubmit() {
    this.sermon.date =
      new Date((document.getElementById("date")! as HTMLInputElement).value);
    this.service.editSermon(this.sermon, () => {
      alert("Sermon successfully updated.");
      this.router.navigate(['/sermons']);
    });
  }
}
