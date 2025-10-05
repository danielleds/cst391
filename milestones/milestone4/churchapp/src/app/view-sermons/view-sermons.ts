import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChurchService } from '../service/church-service';
import { Sermon } from '../models/sermon.model';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-sermons',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './view-sermons.html',
  styleUrl: './view-sermons.css'
})
export class ViewSermons {
  sermons: Sermon[] | null = null;
  selectedSermon: Sermon | null = null;

  constructor(private service: ChurchService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("Getting data");
    this.service.getSermons((sermons: Sermon[]) => {
      this.sermons = sermons;
      // Use change detector so that the page will load after detecting the changes
      // and actually display the list
      this.cd.detectChanges();
      console.log("Sermons retrieved.");
    })
  }

  public deleteSermon(id: number) {
    this.service.deleteSermon(id, () => {
      console.log(`Sermon ${id} deleted.`);
      this.service.getSermons((sermons: Sermon[]) => {
        this.sermons = sermons;
        // Use change detector so that the page will load after detecting the changes
        // and actually display the list
        this.cd.detectChanges();
        console.log("Sermons retrieved.");
      })
      alert("Sermon successfully deleted");
    });
  }
}
