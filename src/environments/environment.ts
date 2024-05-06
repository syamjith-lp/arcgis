export const environment = {
  production: true,
  apiUrl: 'https://scoutprodwebapi.azurewebsites.net/api/',
  locationUrl: 'http://app.scoutinsight.ai/api/',
  swellApiUrl: 'https://cvg-prodapi.azurewebsites.net/api/',
  swellWebUrl: 'https://cvgprodstorage.z13.web.core.windows.net/#/',

  clientId: 'a1f6ec26-cc1c-4b7c-8642-63c615e1b809',
  redirectUri: 'https://www.scoutinsight.ai',

  // Map
  webMapId: 'eaacbd9b777f472a90055b9cb0d441d3',
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
