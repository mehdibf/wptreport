(function($) {

  var shouldShowMessages = false;

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
      }, {
        name: "> 1 Pass",
        id: "greater1Pass",
        type: "multipleBrowser"
      }, {
        name: "> 1 Fail",
        id: "greater1Fail",
        type: "multipleBrowser"
      }, {
        name: "> 1 Not Run",
        id: "greater1NotRun",
        type: "multipleBrowser"
      }, {
        name: "> 1 Not Pass",
        id: "greater1NotPass",
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
      filterTable(filterId, numberOfBrowsers, false);
    });

    $('.message_toggle').click(function() {
      var filterId = $('#filterSelect').val();
      shouldShowMessages = !shouldShowMessages
      filterTable(filterId, numberOfBrowsers, shouldShowMessages);
    });
  }

  function filterTable(filterId, numberOfBrowsers, showMessages) {
    switch (filterId) {
      case "all":
        showAll(showMessages);
        break;
      case "pass":
        hideAll();
        showIfCondition("PASS", numberOfBrowsers, "equal", showMessages);
        break;
      case "fail":
        hideAll();
        showIfCondition("FAIL", numberOfBrowsers, "equal", showMessages);
        break;
      case "notRun":
        hideAll();
        showIfCondition("NOTRUN", numberOfBrowsers, "equal", showMessages);
        break;
      case "notPassed":
        hideAll();
        showIfCondition("FAIL", numberOfBrowsers, "equal", showMessages);
        showIfCondition("NOTRUN", numberOfBrowsers, "equal", showMessages);
        break;
      case "allPass":
        hideAll();
        showIfCondition("PASS", numberOfBrowsers, "equal", showMessages);
        break;
      case "allFail":
        hideAll();
        showIfCondition("FAIL", numberOfBrowsers, "equal", showMessages);
        break;
      case "allNotRun":
        hideAll();
        showIfCondition("NOTRUN", numberOfBrowsers, "equal", showMessages);
        break;
      case "allNotPass":
        hideAll();
        showIfCondition("FAIL", numberOfBrowsers, "equal", showMessages);
        showIfCondition("NOTRUN", numberOfBrowsers, "equal", showMessages);
        break;
      case "greater1Pass":
        hideAll();
        showIfCondition("PASS", 1, "grater", showMessages);
        break;
      case "greater1Fail":
        hideAll();
        showIfCondition("FAIL", 1, "grater", showMessages);
        break;
      case "greater1NotRun":
        hideAll();
        showIfCondition("NOTRUN", 1, "grater", showMessages);
        break;
      case "greater1NotPass":
        hideAll();
        showIfCondition("FAIL", 1, "grater", showMessages);
        showIfCondition("NOTRUN", 1, "grater", showMessages);
        break;
      default:
        showAll();
        break;
    }
  }

  function showIfCondition(row, numberOfBrowsers, condition, showMessages) {
    $('.table tr').each(function() {
      var shouldShow = false;
      if (condition == "equal") {
        shouldShow = ($(this).find("td." + row).length) == numberOfBrowsers;
      } else if (condition == "grater") {
        shouldShow = ($(this).find("td." + row).length) >= numberOfBrowsers;
      }
      if (shouldShow) {
        $(this).show();
        var testNumber = $(this).attr('id').split('-')[1];
        testFileName = "test-file-" + testNumber;
        var subTestName = $(this).attr('id');
        $('.table ' + '#' + testFileName).each(function() {
          $(this).show();
        });
        if (showMessages) {
          $('.table tr.messages.' + subTestName).each(function() {
            $(this).show();
          });
        }

      }
    });
  }

  function showAll(showMessages) {
    $('.table tr.test').each(function() {
      $(this).show();
    });

    $('.table tr.subtest').each(function() {
      $(this).show();
    });

    $('.table tr.messages').each(function() {
      $(this).toggle();
    });
  }

  function hideAll() {
    $('.table tr.subtest').each(function() {
      $(this).hide();
    });

    $('.table tr.test').each(function() {
      $(this).hide();
    });

    $('.table tr.messages').each(function() {
      $(this).hide();
    });
  }

}(jQuery));
