export enum Action {
    CREATE_ACTION = 'create',
    DELETE_ACTION = 'delete',
    UPDATE_ACTION = 'update',
    SUCCESS_ACTION = 'success',
    CANCEL_ACTION = 'cancel',
  }
  
  export enum RoleType {
    Organization = 1,
    SuperUser = 2,
    OrganizationalAdmin = 3.
  }
  
  export enum ScreenName {
    Users = 'Users',
    Market = 'Market',
    County = 'County',
    Practice = 'Practice',
    Physician = 'Physician',
    // Building = 'Building',
    Building = 'PrizeFinder',
    Speciality = 'Speciality',
    Horizon = 'SiteFinder',
    // Horizon = 'Horizon',
    LeaseUp = 'LeaseUp'
  }
  
  export enum ScreenValues {
    Users = 1,
    Market = 2,
    County = 3,
    Practice = 4,
    Physician = 5,
    Building = 6,
    Speciality = 7,
    Horizon = 8,
    LeaseUp = 9
  }
  
  export enum PhysicianCategory {
    Referring = 'Referrals In',
    Receiving = 'Referrals Out',
    NoReferrals = 'No Referrals',
    All = 'Referrals All'
  
  }
  
  export enum DefaultNearMOBDistanceFilter {
    DefaultDistance = '2'
  }
  
  export enum DefaultLeaseUpDistanceFilter {
    DefaultDistance = '10'
  }
  
  export const PracticeGroupClaimYears = ['2018', '2019', '2020'];
  
  export const PracticeGroupClaimCategory = ['Commercial', 'Medicare', 'Total'];
  
  export enum PracticeGroupClaimCategories {
    Commercial = 'Commercial',
    Medicare = 'Medicare',
    Total = 'Total'
  }
  
  // tslint:disable-next-line: max-line-length
  export const BlackJackDataURL = 'https://app.powerbi.com/groups/942faf7f-ef95-47c3-987f-d137f5af7550/reports/59d91668-4777-4983-8ab3-65b8f9d47da2/ReportSection';
  
  export const PhysicianTypes = {
    category: [{ id: 4, description: 'Referrals All' }, { id: 1, description: 'Referrals In' }, { id: 2, description: 'Referrals Out' },
    { id: 3, description: 'No Referrals' }]
  };
  
  export const DistanceFilterValues = {
    distance: [{ id: 1, value: '1' }, { id: 2, value: '2' },
    { id: 3, value: '5' }, { id: 4, value: '10' }, { id: 5, value: '15' },
    { id: 6, value: '20' }, { id: 7, value: '30' }, { id: 8, value: '60' }, { id: 9, value: '90' }]
  };
  
  export const DollarFilterMinValues = {
    minimumDollars: [{ id: '$50K', value: '50000' }, { id: '$100K', value: '100000' },
    { id: '$200K', value: '200000' }, { id: '$500K', value: '500000' }, { id: '$1M', value: '1000000' },
    { id: '$2M', value: '2000000' }, { id: '$3M', value: '3000000' }]
  };
  
  export const DollarFilterMaxValues = {
    maximumDollars: [{ id: '$50K', value: '50000' }, { id: '$100K', value: '100000' },
    { id: '$200K', value: '200000' }, { id: '$500K', value: '500000' }, { id: '$1M', value: '1000000' },
    { id: '$2M', value: '2000000' }, { id: '$3M', value: '3000000' }]
  };
  
  export const RegionFilterValues = [{ id: 'Northcentral', value: 'North Central' }, { id: 'Northeast', value: 'North East' },
  { id: 'Southcentral', value: 'South Central' }, { id: 'Southeast', value: 'South East' }, { id: 'West', value: 'West' }];
  
  export const ValidateStatus = [{ id: 1, class: 'greenDot', value: 'Validated' }, { id: 2, class: 'yellowDot', value: 'Attempted' },
  { id: 3, class: 'redDot', value: 'Incorrect' }];
  
  export const CompanyTypeValues = {
    companyTypes: [{ id: 'Health System', value: 'Health System' }, { id: 'Medical Practice', value: 'Medical Practice' },
    { id: 'REIT', value: 'REIT' }, { id: 'Developer', value: 'Developer' }, { id: 'Owner/Buyer', value: 'Owner/Buyer' },
    { id: 'Full Service Real Estate', value: 'Full Service Real Estate' }, { id: 'Broker', value: 'Broker' }]
  };
  
  export const DistanceFilterValuesForNearMOB = {
    distance: [{ id: 1, value: '1' }, { id: 2, value: '2' },
    { id: 3, value: '5' }, { id: 4, value: '10' }, { id: 5, value: '15' },
    { id: 6, value: '20' }, { id: 7, value: '30' }, { id: 8, value: '60' }, { id: 9, value: '90' }]
  };
  
  // tslint:disable-next-line: max-line-length
  export const ParcelLayerAllCode = 'LOT_SIZE >= 0 AND SIT_HSE_NU = 0 AND IMPR_VALUE = 0 AND BLDG_AREA = 0 AND NO_OF_UNIT = 0 AND BEDROOMS = 0 AND BATHROOMS = 0 AND STD_LAND_U IN (8000, 8001, 8002, 8003, 8008)';
  
  export const ParcelLayerLotSize = 'LOT_SIZE >= 0';
  
  export const ParcelLandAllCode = '8000, 8001, 8002, 8003, 8008';
  
  export const ParcelLayerDefaultLandCode = [
    { title: 'All Codes - 8000, 8001, 8002, 8003, 8008', value: '8000, 8001, 8002, 8003, 8008', status: true }
  ];
  
  export const ParcelLayerFilterValues = [
    { title: 'All Codes - 8000, 8001, 8002, 8003, 8008', value: '8000, 8001, 8002, 8003, 8008', status: true },
    { title: 'General - 8000', value: '8000', status: false },
    { title: 'Residential - 8001', value: '8001', status: false },
    { title: 'Commercial - 8002', value: '8002', status: false },
    { title: 'Industrial - 8003', value: '8003', status: false },
    { title: 'Agricultural - 8008', value: '8008', status: false }
  ];
  
  export enum AdvanceSearch {
    Building = 'building',
    Company = 'company',
    Contact = 'contact',
    Ownership = 'ownership'
  }
  
  export enum BuildingType {
    Mob = 1,
    Vet = 2
  }
  
  export enum PartyClassificationType {
    SpecialityClassfication = 1,
    SizeClassification = 2,
    CompanyClassification = 3,
    TierClassification = 4,
    BuildingClassification = 5,
    VetCompanyClassification = 6,
    VetCompanyTypeClassification = 7,
    VetBuildingClassification = 8
  }
  
  export enum Section {
    Building = 1,
    Ownership = 2,
    Company = 3,
    Contact = 4
  }
  
  export enum CaseType {
    Facility = 1,
    Contact = 2,
    Company = 3,
    Airstrike = 4,
    Broker = 5
  }
  
  export enum CaseStatus {
    TypeId = 1
  }
  
  export enum FacilityAttributeType {
    occupancy = 8,
    salePrice = 7,
    saleDate = 9,
    capRate = 10
  }
  
  export const BrokerType = ['Investment', 'Leasing'];
  
  export enum ContactType {
    email = 'Email',
    phone = 'Phone'
  }
  
  export enum UserRoleType {
    brokerRoleTypeID = 7
  }
  
  export enum LeaseUpGridCategory {
    PrimaryCare = 'PrimaryCare',
    Surgical = 'Surgical',
    Speciality = 'Specialists',
    Ancillary = 'Ancillary',
  }
  
  export enum LeaseUpToggles {
    NearByMOB = 'NearByMOB',
    PrimaryCare = 'Primary Care',
    Hospital = 'Hospital',
    Competitors = 'Competitors',
    PracticeLocations = 'Practice Locations'
  }
  
  export enum UserAction {
    Insert = 'Insert',
    Update = 'Update'
  }
  
  export enum CountryPhoneCode {
    US = '+1'
  }
  
  export enum StatusCode {
    Success = 200,
    OTPSuccess = 307
  }
  
  export enum Demographics {
    medianHouseholdIncome = 1,
    population = 2,
    populationGrowth = 3,
    populationAge = 4
  }
  
  export const SortingTypes = [['Square Feet', 'Sfeet'], ['Year Built', 'Ybuild'], ['Building Score', 'Bscore'], ['Last Viewed', 'Lastview']];
  export const IssueTypes = ['Main Specialty', 'Building Score', 'Square Feet', 'Exists in Salesforce', 'Year Built', 'Last Viewed', 'Other'];
  
  export enum BuildingResult {
    prizeFinderLogo = '../../../assets/img/logos/prizefinder.png',
    circleColour = 'blue',
    default = 'default'
  }
  
  export enum AgmMapType {
    roadmap = 'roadmap',
    satellite = 'satellite'
  }
  
  export enum SelectedDetailTab {
    location = 'Location',
    building = 'Building',
    practice = 'Practice'
  }
  
  export enum SelectedSorterTab {
    asc = 'asc',
    desc = 'desc'
  }
  
  export class BuildCentralTableSetting {
    public static defaultPage = 1;
    public static itemsPerPage = 100;
  }
  
  export class BuildCentralCategory {
    public static Category = [
      { name: 'All', value: 'all', status: true },
      { name: 'Planning', value: 'planning', status: true },
      { name: 'Construction', value: 'construction', status: true },
      { name: 'Completed', value: 'completed', status: true },
      { name: 'On Hold', value: 'on_hold', status: true },
      { name: 'Cancelled', value: 'cancelled', status: true }
    ];
  }
  export class ZipCodeDemographics {
    public static ZipCodeHeaders = [
      { name: 'Zip Code' },
      { name: 'County' },
      { name: 'State' },
      { name: 'County Score' },
      { name: 'Physician Count' },
      { name: 'County Population (Male)' },
      { name: 'County Population (Female)' },
      { name: 'County Population (<18)' },
      { name: 'County Population (>64)' },
      { name: 'County Household Income' },
      { name: 'Commercial' },
      { name: 'Medicare' },
      { name: 'County Average Physician Pay' },
    ];
  }
  
  export enum LeaseUpSearch {
    BuildingAddress = 'buildingAddress',
    MontecitoId = 'montecitoId',
  }
  
  export class DefaultSpecialty {
    public static Category = { text: 'Select Specialty', value: 'Specialty' };
  }
  
  export enum Icon {
    width = '24px',
    height = '24px',
    iconGreen = '/assets/img/icon/icon-green.png',
    iconBlue = '/assets/img/icon/icon-blue.png',
    iconYellow = '/assets/img/icon/icon-yellow.png',
    iconPurple = '/assets/img/icon/icon-purple.png',
    iconRed = '/assets/img/icon/icon-red.png',
    iconGrey = '/assets/img/icon/icon-grey.png',
    iconOrange = '/assets/img/icon/icon-orange.png',
    iconHospital = '/assets/img/icon/hospital-icon.png',
    analysisIcon = '/assets/img/icon/analysis-icon.png',
    comparativeIcon = '/assets/img/icon/comparative.png',
    iconYellowDoctor = '/assets/img/icon/doctor-yellow.png',
    deleteIcon = '/assets/img/icon/delete.png',
    resetIcon = '/assets/img/icon/reset.png'
  }
  
  export enum Layers {
    nearByMobs = 'nearByMobs',
    hospital = 'hospital',
    competitors = 'competitors',
    primaryCare = 'primaryCare',
    referringPhysicians = 'referringPhysicians',
    locationData = 'locationData',
  }
  
  export enum LayerName {
    practiceLocation = 'Practice Location',
    nearByMobs = 'Near By Mobs',
    hospital = 'Hospital',
    competitors = 'Competitors',
    primaryCare = 'Primary Care',
    referringPhysicians = 'Referring Physicians',
    doctorLocation = 'Doctor Location',
    addressList = 'Address List'
  }
  
  export enum Lable {
    nearByMobsMontecitoOwned = 'Near By Mobs (Montecito Owned)',
    doctorLocation = 'Doctor Location',
  }
  
  export enum AddressListAction {
    saveList = 'SaveAddressList',
    selectList = 'SelectAddressList',
  }
  
  export class FieldTemplate {
    public static practiceLocationField = [
      { fieldName: 'hospitalName', label: 'Practice Location' },
      { fieldName: 'address', label: 'Address' },
      { fieldName: 'city', label: 'City' },
      { fieldName: 'state', label: 'State' },
      { fieldName: 'zip', label: 'Zipcode' }
    ];
  
    public static nearByMobsField = [
      { fieldName: 'address_line_1', label: 'Address' },
      { fieldName: 'address_city', label: 'City' },
      { fieldName: 'address_state', label: 'State' },
      { fieldName: 'address_postal_code', label: 'Zipcode' }
    ];
  
    public static hospitalField = [
      { fieldName: 'hospitalName', label: 'Hospital Name' },
      { fieldName: 'hospitalAddress', label: 'Address' }
    ];
  
    public static competitorsField = [
      { fieldName: 'locationName', label: 'Location Name' },
      { fieldName: 'address_line_1', label: 'Address' },
      { fieldName: 'addressLine2', label: 'Address 2' },
      { fieldName: 'noOfLocations', label: 'No Of Offices' },
      { fieldName: 'NUMBER_PHYSICIANS_PG', label: 'No Of Physicians' }
    ];
  
    public static primaryCareField = [
      { fieldName: 'locationName', label: 'Location Name' },
      { fieldName: 'address_line_1', label: 'Address' },
      { fieldName: 'addressLine2', label: 'Address 2' }
    ];
  
    public static referringPhysiciansField = [
      { fieldName: 'physicianName', label: 'Physician Name' },
      { fieldName: 'hospitalName', label: 'Hospital Name' }
    ];
  
    public static addressListField = [
      { fieldName: 'Address', label: 'Address' },
      { fieldName: 'MontecitoId', label: 'Montecito ID' },
      { fieldName: 'lat', label: 'Latitude' },
      { fieldName: 'lng', label: 'Longitude' }
    ];
  
    public static doctorLocationField = [
      { fieldName: 'name', label: 'Hospital' },
      { fieldName: 'address_line1', label: 'Address Line 1' },
      { fieldName: 'street', label: 'Street' },
      { fieldName: 'city', label: 'City' },
      { fieldName: 'state', label: 'State' },
      { fieldName: 'postcode', label: 'Postal Code' },
      { fieldName: 'country', label: 'Country' }
    ];
    public static competitors = [
      { fieldName: 'locationName', label: 'Location Name' },
      { fieldName: 'specialty', label: 'Specialty' },
      { fieldName: 'hospitalId', label: 'Hospital Id' },
      { fieldName: 'montecitoId', label: 'Montecito Id' },
      { fieldName: 'locationId', label: 'Location Id' },
      { fieldName: 'addressLine1', label: 'AddressLine 1' },
      { fieldName: 'addressLine2', label: 'AddressLine 2' },
      { fieldName: 'state', label: 'State' },
      { fieldName: 'zipcode', label: 'Zipcode' }
    ];
  }
  
  export class Fields {
    public static practiceLocationField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'hospitalName', alias: 'Practice Location', type: 'string' },
      { name: 'address', alias: 'Address', type: 'string' },
      { name: 'city', alias: 'City', type: 'string' },
      { name: 'state', alias: 'State', type: 'string' },
      { name: 'zip', alias: 'Zipcode', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static nearByMobsField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'address_line_1', alias: 'Address', type: 'string' },
      { name: 'address_city', alias: 'City', type: 'string' },
      { name: 'address_state', alias: 'State', type: 'string' },
      { name: 'address_postal_code', alias: 'Zipcode', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static hospitalField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'hospitalName', alias: 'Hospital Name', type: 'string' },
      { name: 'hospitalAddress', alias: 'Address', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static competitorsField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'locationName', alias: 'Location Name', type: 'string' },
      { name: 'address_line_1', alias: 'Address', type: 'string' },
      { name: 'addressLine2', alias: 'Address 2', type: 'string' },
      { name: 'noOfLocations', alias: 'No Of Offices', type: 'string' },
      { name: 'NUMBER_PHYSICIANS_PG', alias: 'No Of Physicians', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static primaryCareField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'locationName', alias: 'Location Name', type: 'string' },
      { name: 'address_line_1', alias: 'Address', type: 'string' },
      { name: 'addressLine2', alias: 'Address 2', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static referringPhysiciansField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'physicianName', alias: 'Physician Name', type: 'string' },
      { name: 'hospitalName', alias: 'Hospital Name', type: 'string' },
      { name: 'urlTitle', alias: 'Url Title', type: 'string' },
      { name: 'url', alias: 'Url', type: 'string' }
    ];
  
    public static addressListField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'MontecitoId', alias: 'Montecito ID', type: 'string' },
      { name: 'Address', alias: 'Address', type: 'string' },
      { name: 'lat', alias: 'Latitude', type: 'double' },
      { name: 'lng', alias: 'Longitude', type: 'double' }
    ];
  
    public static doctorLocationField = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'name', alias: 'Hospital', type: 'string' },
      { name: 'address_line1', alias: 'Address Line 1', type: 'string' },
      { name: 'street', alias: 'Street', type: 'string' },
      { name: 'city', alias: 'City', type: 'string' },
      { name: 'state', alias: 'State', type: 'string' },
      { name: 'postcode', alias: 'Postal Code', type: 'string' },
      { name: 'country', alias: 'Country', type: 'string' }
    ];
    public static competitors = [
      { name: 'ObjectID', alias: 'ObjectID', type: 'oid' },
      { name: 'locationName', alias: 'Location Name', type: 'string' },
      { name: 'specialty', alias: 'Specialty', type: 'string' },
      { name: 'hospitalId', alias: 'Hospital Id', type: 'string' },
      { name: 'montecitoId', alias: 'Montecito Id', type: 'string' },
      { name: 'locationId', alias: 'Location Id', type: 'string' },
      { name: 'addressLine1', alias: 'AddressLine 1', type: 'string' },
      { name: 'addressLine2', alias: 'AddressLine 2', type: 'string' },
      { name: 'state', alias: 'State', type: 'string' },
      { name: 'zipcode', alias: 'Zipcode', type: 'string' }
    ];
  }
  
  export const TimeIntervals = {
    time: [{ id: 1, value: '5' }, { id: 2, value: '10' }, { id: 3, value: '15' }]
  };
  
  export enum Comparative {
    selectedParcels = 'selectedParcels',
    currentLocations = 'current-location',
    competitorLocations = 'competitor-location',
    addressList = 'addressList',
    allcurrentLocations = 'all-current-location',
    resetLoactions = 'reset-all-locations'
  }
  
  export enum SiteFinderWarnings {
    practice = 'Practice is required',
    specialty = 'Specialty is required',
    practiceOrSpecialty = 'Practice or Specialty is required',
    practiceAndSpecialty = 'Practice and Specialty is required',
    parcel = 'Enable parcel layer ',
    polygon = 'Polygon is required',
    selectParcel = 'Select at least one parcel'
  }
  
  export class Heatmap {
    public static colorStops = [
      { ratio: 0, color: 'rgba(63, 40, 102, 0)' },
      { ratio: 0.2, color: 'rgba(2, 136, 209, 0.75)' },
      { ratio: 0.4, color: 'rgba(67, 160, 71, 0.75)' },
      { ratio: 0.6, color: 'rgba(192, 202, 51, 0.75)' },
      { ratio: 0.8, color: 'rgba(245, 124, 0, 0.75)' },
      { ratio: 1, color: 'rgba(229, 57, 53, 0.75)' }
    ];
  }
  
  export enum LocationData {
    doctor = 'Upload Doctor Location',
    patient = 'Upload Patient Location',
    other = 'Upload Other File'
  }
  
  export enum DropdownTypeSiteFinder {
    Layer = 'Layer',
    Demographics = 'Demographic',
    SaveSearch = 'SaveSearch',
    SelectSearch = 'SelectSearch'
  }
  
  export enum DemoGraphicLayers {
    MedianHouseholdIncome = 'MedianHouseholdIncome',
    Population = 'Population',
    PopulationGrowth = 'PopulationGrowth',
    Age = 'Age'
  }
  
  export const LayerScaleConfig = {
    country: {
      id: 'demographic_13',
      minScale: 591657527.591555,
      maxScale: 73957190.948944,
      layerId: 13
    },
    state: {
      id: 'demographic_15',
      minScale: 73957190.948944,
      maxScale: 18489297.737236,
      layerId: 15
    },
    county: {
      id: 'demographic_23',
      minScale: 18489297.737236,
      maxScale: 2311162.217155,
      layerId: 23
    },
    subDivision: {
      id: 'demographic_24',
      minScale:2311162.217155,
      maxScale: 288895.277144,
      layerId: 24
    },
    city: {
      id: 'demographic_25',
      minScale: 288895.277144,
      maxScale: 72223.819286,
      layerId: 25
    },
    tract: {
      id: 'demographic_27',
      minScale: 72223.819286,
      maxScale: 70,
      layerId: 27
    },
  }
  
  export enum DemoGraphicLayersDescription {
    MedianHouseholdIncome = 'The median household income is $ {MEDHINC_CY}',
    Age = 'The median age of the population is {MEDAGE_CY}',
    // tslint:disable-next-line: max-line-length
    Population = 'The population density is {POPDENS_CY} people per square mile. In five years, it will be {POPDENS_FY} people per square mile.',
    // tslint:disable-next-line: max-line-length
    PopulationGrowth = 'The current population is {TOTPOP_CY} and is estimated to be {TOTPOP_FY} in five years. The estimated annual rate of change is {POPGRWCYFY}%.',
  }
  
  export const ColorRamps = {
    ageColors: ["rgb(0, 114, 153)", "rgb(82, 160, 191)", "rgb(180, 172, 151)", "rgb(250, 182, 120)", "rgb(255, 218, 191)"],
    populationColors: ["rgb(255, 255, 178)", "rgb(254, 198, 119)", "rgb(253, 141, 60)", "rgb(221, 71, 49)", "rgb(189, 0, 38)"],
    householdColors: ["rgb(59, 97, 66)", "rgb(176, 217, 184)", "rgb(250, 250, 250)", "rgb(162, 177, 191)", "rgb(26, 74, 120)"],
    growthRateColors: ["rgb(166, 97, 26)", "rgb(198, 156, 114)", "rgb(229, 215, 201)", "rgb(196, 223, 219)", "rgb(99, 178, 166)", "rgb(1, 133, 113)"]
  }