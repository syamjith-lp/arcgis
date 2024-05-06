// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://scoutdevwebapi.azurewebsites.net/api/',
  locationUrl: 'http://app.scoutinsight.ai/api/',
  swellApiUrl: 'https://cvg-devapi.azurewebsites.net/api/',
  swellWebUrl: 'https://cvgdevstorage.z20.web.core.windows.net/#/',

  clientId: 'a1f6ec26-cc1c-4b7c-8642-63c615e1b809',
  redirectUri: 'http://localhost:4200/',

  // Map
  webMapId: 'd872f01816314754b86657c77280f030',
  downloadSegment: 'https://downloads.esri.com/esri_content_doc/dbl/us/tapestry',

  // Layer URL
  householdIncomeLayer: 'https://demographics5.arcgis.com/arcgis/rest/services/USA_Demographics_and_Boundaries_2022/MapServer',
  populationLayer: 'https://demographics5.arcgis.com/arcgis/rest/services/USA_Demographics_and_Boundaries_2022/MapServer',
  censusLayer: '  https://demographics5.arcgis.com/arcgis/rest/services/USA_Demographics_and_Boundaries_2022/MapServer',
  ageLayer: 'https://demographics5.arcgis.com/arcgis/rest/services/USA_Demographics_and_Boundaries_2022/MapServer',

  parcelAtlasUrl: 'https://services8.arcgis.com/2G8bTpCps4vdRut5/arcgis/rest/services/ParcelAtlas_V2_4/FeatureServer/0',
  driveTimeLayer: 'https://route.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea',
  geoenrichmentUrl: 'https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/Enrich',
  demographicData: 'https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
