// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://skillstracking.motjo.io/api/',
  appUrl: 'http://skillstracking.motjo.io/',
  appImageUrl: 'http://skillstracking.motjo.io/uploads/images/',
  appCalendarUrl: 'http://skillstracking.motjo.io/uploads/calendars/',

  tableProgressRadiusTeacher: 30,
  tableProgressRadiusStudent: 24,
  tableProgressColorTeacher: "#E689B8",
  tableProgressColorStudent: "#A3A1FB",
  tableProgressStrokeTeacher: 4,
  tableProgressStrokeStudent: 4,

  progressRadiusTeacher: 70,
  progressRadiusStudent: 56,
  progressColorTeacher: "#E689B8",
  progressColorStudent: "#A3A1FB",
  progressStrokeTeacher: 10,
  progressStrokeStudent: 10,

  progressMax: 100
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
