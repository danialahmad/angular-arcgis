import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from "esri-loader";

@Component({
  selector: 'app-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.css']
})
export class EsriComponent implements OnInit, OnDestroy {

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) 
  protected mapViewEl: any;
  view: any;

  constructor() { }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, SceneView,Fullscreen,VectorTileLayer,TileLayer,FeatureLayer] = await loadModules([
      "esri/Map","esri/views/MapView",
      "esri/views/SceneView",
      "esri/widgets/Fullscreen",
      "esri/layers/VectorTileLayer",
      "esri/layers/TileLayer",
      "esri/layers/FeatureLayer"
      ]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets-vector",
        ground: "world-elevation"
      };

      const mapBlend = {
        basemap: {
          baseLayers: [
            new TileLayer({
              portalItem: {
                id: "1b243539f4514b6ba35e7d995890db1d" // world hillshade
              }
            }),
            new VectorTileLayer({
              portalItem: {
                id: "273bf8d5c8ac400183fc24e109d20bcf" // community style vector tiles
              },
              blendMode: "multiply"
            })
          ]
        }
      }
      // Trailheads feature layer (points)
var trailheadsLayer = new FeatureLayer({
  url:
    "https://services7.arcgis.com/NnDzPoFTVu9j0JAS/arcgis/rest/services/jangkitan_covid/FeatureServer"
});


      const map = new Map(mapBlend);
      map.add(trailheadsLayer);
      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        scale: 50000000, // Sets the initial scale to 1:50,000,000
        center: [101.9758,4.2105],
        map: map
      };

      this.view = new SceneView(mapViewProperties);
      this.view.popup.autoOpenEnabled = false;
      const fullscreen = new Fullscreen({
        view: this.view
      });
      this.view.ui.add(fullscreen, "top-right");
      this.view.on("click", function(event:any) {
       // alert('test')
        console.log("click event: ", event);
      });
      await this.view.when(); // wait for map to load
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

}
