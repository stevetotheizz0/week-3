(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  // clean data






  _.each(schools, function(oneSchool){
    if (typeof oneSchool.ZIPCODE === 'string') {

      split = oneSchool.ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      oneSchool.ZIPCODE = normalized_zip;
    }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    if (typeof oneSchool.GRADE_ORG === 'number') {  // if number
      oneSchool.HAS_KINDERGARTEN = oneSchool.GRADE_LEVEL < 1;
      oneSchool.HAS_ELEMENTARY = oneSchool.GRADE_LEVEL === _.range(2,6);
      oneSchool.HAS_MIDDLE_SCHOOL = oneSchool.GRADE_LEVEL === _.range(6, 9);
      oneSchool.HAS_HIGH_SCHOOL = oneSchool.GRADE_LEVEL === _.range(9,13);
    } else {  // otherwise (in case of string)
      oneSchool.HAS_KINDERGARTEN = oneSchool.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      oneSchool.HAS_ELEMENTARY = oneSchool.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      oneSchool.HAS_MIDDLE_SCHOOL = oneSchool.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      oneSchool.HAS_HIGH_SCHOOL = oneSchool.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  });

  // filter data
  var filtered_data = [];
  var filtered_out = [];


  _.each(schools, function(oneSchool){


    isOpen = oneSchool.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (oneSchool.TYPE.toUpperCase() !== 'CHARTER' ||
                oneSchool.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (oneSchool.HAS_KINDERGARTEN ||
                oneSchool.HAS_ELEMENTARY ||
                oneSchool.HAS_MIDDLE_SCHOOL ||
                oneSchool.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = oneSchool.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(oneSchool.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      filtered_data.push(oneSchool);
    } else {
      filtered_out.push(oneSchool);
    }
  });
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  var color;
  for (i = 0; i < filtered_data.length - 1; i++) {
    isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (filtered_data[i].HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
      .bindPopup(filtered_data[i].FACILNAME_LABEL)
      .addTo(map);
  }

})();
