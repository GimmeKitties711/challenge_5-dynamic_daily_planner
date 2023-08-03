// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var idArray = ['#hour-9', '#hour-10', '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17'];

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  for (i=0; i<idArray.length; i++) {
    $(idArray[i]).children()[2].addEventListener("click", function () {
      // source for the children() and parent() functions in jQuery: https://www.digitalocean.com/community/tutorials/jquery-parent-and-children-tree-traversal-functions-example

      localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());
      // source for how to use localStorage: https://www.w3schools.com/jsref/prop_win_localstorage.asp
      // source for using '$(this)' instead of 'this' to enable jQuery functionality: https://www.geeksforgeeks.org/difference-between-this-and-this-in-jquery/
      // source for getting the id of an element using jQuery: https://stackoverflow.com/questions/3239598/how-can-i-get-the-id-of-an-element-using-jquery
      // source for finding an element's siblings: https://stackoverflow.com/questions/7463242/how-do-i-select-a-sibling-element-using-jquery
      // source for using val() to get the current value from textarea: https://www.geeksforgeeks.org/how-to-get-the-value-of-a-textarea-in-jquery/
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  for (i=0; i<$('.time-block').length; i++) {
    if (dayjs().hour() > Number($('.time-block')[i].id.split("-")[1])) {
      $(idArray[i]).addClass('past');
    } else if (dayjs().hour() === Number($('.time-block')[i].id.split("-")[1])) {
      $(idArray[i]).addClass('present');
    } else { // same thing but with a < sign
      $(idArray[i]).addClass('future');
    }
  }
  // source for getting current hour: https://day.js.org/docs/en/get-set/hour
  // source for converting a string into a number: https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l
  // source for adding classes to elements using jQuery: https://www.w3schools.com/jquery/jquery_css_classes.asp

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.
  var endings = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
  // [1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th, 17th, 18th, 19th 20th, 21st, 22nd, 23rd, 24th, 25th, 26th, 27th, 28th, 29th, 30th, 31st]
  // source for correct endings for ordinal numbers: https://byjus.com/maths/ordinal-numbers/
  var currentDay = $('#currentDay');
  // source for jQuery selectors: https://www.w3schools.com/jquery/jquery_selectors.asp
  currentDay.text(dayjs().format('dddd, MMMM D') + endings[dayjs().date()-1]);
  // source for date formatting options in dayjs: https://day.js.org/docs/en/display/format
  // source for how to get current day of the month in dayjs: https://day.js.org/docs/en/get-set/date
});
