import { Component, OnInit } from '@angular/core';
import { Geodata } from '@shared/models/geodata.interface';

@Component({
  selector: 'app-geodata',
  templateUrl: './geodata.component.html',
  styleUrls: ['./geodata.component.scss'],
})
export class GeodataComponent implements OnInit {
  geodataItems: Geodata[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log('INIT');
  }
}
