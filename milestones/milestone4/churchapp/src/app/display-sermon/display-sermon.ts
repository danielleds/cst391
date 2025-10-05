import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Sermon } from '../models/sermon.model';
import { ChurchService } from '../service/church-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-sermon',
  imports: [],
  templateUrl: './display-sermon.html',
  styleUrl: './display-sermon.css'
})
export class DisplaySermon {
  sermonId: number = 0;
  sermon: Sermon | null = null;

  constructor(private service: ChurchService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sermonId = parseInt(params.get('id')!);
    });
    console.log("Getting data");
    this.service.getSermonById(this.sermonId, (sermon: Sermon) => {
      this.sermon = sermon;
      // Use change detector so that the page will load after detecting the changes
      this.cd.detectChanges();
      console.log("Sermon retrieved.");
    });
  }
}
