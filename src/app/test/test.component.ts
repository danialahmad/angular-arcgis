import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements AfterViewInit {

  //private map= L.map('map',{});
  protected map: any;
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([37.837, -122.479], 6);
    esri.basemapLayer('Gray').addTo(this.map);
  
    // renderer type: unique value
    esri.featureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0'
    }).addTo(this.map);
  }
}
