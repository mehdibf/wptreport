(function($) {

  $(document).ready(function() {
    //get the number of compared browsers
    var countTh = $(".table tr:first > th").length;
    appendFilterList(countTh - 1);
  });

  function appendFilterList(numberOfBrowsers) {
    const isMultipleBrowser = numberOfBrowsers > 1;
    var filterArray = [{
      name: "All",
      id: "all",
      type: "multipleBrowser"
    }, {
      name: "Pass",
      id: "pass",
      type: "singleBrowser"
    }, {
      name: "Fail",
      id: "fail",
      type: "singleBrowser"
    }, {
      name: "Not run",
      id: "notRun",
      type: "singleBrowser"
    }, {
      name: "Not Passed",
      id: "notPassed",
      type: "singleBrowser"
    }];
    if (isMultipleBrowser) {
      var multipleBrowserFilterArray = [{
        name: "-------",
        id: "separator",
        type: "multipleBrowser"
      }, {
        name: "All Pass",
        id: "allPass",
        type: "multipleBrowser"
      }, {
        name: "All Fail",
        id: "allFail",
        type: "multipleBrowser"
      }, {
        name: "All Not Run",
        id: "allNotRun",
        type: "multipleBrowser"
      }, {
        name: "All Not Pass",
        id: "allNotPass",
        type: "multipleBrowser"
      }];
      var filterArray = filterArray.concat(multipleBrowserFilterArray);
    }
    var selectList = document.createElement("select");
    selectList.id = "filterSelect";
    $(selectList).insertBefore(".table");

    //Create and append the options
    for (var i = 0; i < filterArray.length; i++) {
      const filter = filterArray[i];
      var option = document.createElement("option");
      option.value = filter.id;
      option.text = filter.name;
      if (filter.id == "separator" || (isMultipleBrowser && filter.type == "singleBrowser")) {
        option.disabled = true;
      }
      selectList.appendChild(option);
    }
    //selected list value changed
    $('#filterSelect').change(function() {
      var filterId = $(this).val();
      filterTable(filterId, numberOfBrowsers);
    });
  }

  function filterTable(filterId, numberOfBrowsers) {
    switch (filterId) {
      case "all":
        showAll();
        break;
      case "pass":
        hideAll();
        showIfAllRow("PASS", numberOfBrowsers);
        break;
      case "fail":
        hideAll();
        showIfAllRow("FAIL", numberOfBrowsers);
        break;
      case "notRun":
        hideAll();
        showIfAllRow("NOTRUN", numberOfBrowsers);
        break;
      case "notPassed":
        hideAll();
        showIfAllRow("FAIL", numberOfBrowsers);
        showIfAllRow("NOTRUN", numberOfBrowsers);
        break;
      case "allPass":
        hideAll();
        showIfAllRow("PASS", numberOfBrowsers);
        break;
      case "allFail":
        hideAll();
        showIfAllRow("FAIL", numberOfBrowsers);
        break;
      case "allNotRun":
        hideAll();
        showIfAllRow("NOTRUN", numberOfBrowsers);
        break;
      case "allNotPass":
        hideAll();
        showIfAllRow("FAIL", numberOfBrowsers);
        showIfAllRow("NOTRUN", numberOfBrowsers);
        break;
      default:
        showAll();
        break;
    }
  }

  function showIfAllRow(row, numberOfBrowsers) {
    $('.table tr').each(function() {
      if ($(this).find("td." + row).length == numberOfBrowsers) {
        $(this).show();
      }
    });
  }

  function showAll() {
    $('.table tr.subtest').each(function() {
      $(this).show();
    });
  }

  function hideAll() {
    $('.table tr.subtest').each(function() {
      $(this).hide();
    });
  }

}(jQuery));
