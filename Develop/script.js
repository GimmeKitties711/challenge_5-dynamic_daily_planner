// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var idArray = ['#hour-9', '#hour-10', '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17'];
  // array of all ids for 9AM-5PM blocks (9-17 in 24-hour format)

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // 'this' represents the save button that was clicked
  // the id of the save button's parent can be found using the parent() and attr() functions: $(this).parent().attr('id')
  // the id can be used as the key for localStorage.setItem()

  for (i=0; i<idArray.length; i++) {
    var displayTimer;
    $(idArray[i]).children()[2].addEventListener("click", function () { 
      // the children() function yields an array [<div>, <textarea>, <button>] specific to the time block denoted by $(idArray[i]). the event listener is meant to be added to the save button, which is obtained using index 2.

      // source for the children() and parent() functions in jQuery: https://www.digitalocean.com/community/tutorials/jquery-parent-and-children-tree-traversal-functions-example

      localStorage.setItem($(this).parent().attr('id'), $(this).siblings('.description').val());
      // the first parameter is the id attribute of the save button's parent, the second parameter is the text the user has written into the textarea. all <textarea> divs have the class ".description" so this can be used as the filter in the siblings() function.

      // source for how to use localStorage: https://www.w3schools.com/jsref/prop_win_localstorage.asp
      // source for using '$(this)' instead of 'this' to enable jQuery functionality: https://www.geeksforgeeks.org/difference-between-this-and-this-in-jquery/
      // source for getting the id of an element using jQuery: https://stackoverflow.com/questions/3239598/how-can-i-get-the-id-of-an-element-using-jquery
      // source for finding an element's siblings using jQuery: https://stackoverflow.com/questions/7463242/how-do-i-select-a-sibling-element-using-jquery
      // source for using val() to get the current value from textarea: https://www.geeksforgeeks.org/how-to-get-the-value-of-a-textarea-in-jquery/

      var saveText = $('#saveNotification');

      if (saveText.css("display") !== "none") {
        saveText.hide(200); // if the save button has already been clicked and it is clicked again before the save notification has left the screen, hide the save notification for 200 ms (0.2 sec) before showing it again
      }
      saveText.show(400); // the animation of showing saveText takes 400 ms (the default value)
      clearTimeout(displayTimer); // reset the timer every time the save button is clicked
      displayTimer = setTimeout(function () {
        saveText.hide(400); // hide saveText at the default speed (takes 400 ms)
      }, 4000); // the hide animation takes place after 4000 ms (4 sec) have passed

      // this function was inspired by the first answer to this Stack Overflow question: https://stackoverflow.com/questions/18607623/reset-timer-on-click-for-show-and-hide-jquery
      // source for getting an element's css properties using jQuery: https://www.tutorialrepublic.com/jquery-tutorial/jquery-get-and-set-css-properties.php
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // day.js().hour() returns a number from 0-23 depending on the current hour (12am-11pm). the id of each time block is #hour-9...#hour-17, so splitting the id of each time block by "-" yields the array ['hour', '9'] (for example). the number can be obtained using index 1, and it is cast to a number to be compared to dayjs().hour().

  for (i=0; i<$('.time-block').length; i++) { // iterate through each time block
    if (dayjs().hour() > Number($('.time-block')[i].id.split("-")[1])) { // if the current hour is greater than the hour of the time block, the time block is in the past
      $(idArray[i]).addClass('past');
    } else if (dayjs().hour() === Number($('.time-block')[i].id.split("-")[1])) { // if the current hour equals the hour of the time block, the time block is the present
      $(idArray[i]).addClass('present');
    } else { // if the current hour is less than the hour of the time block, the time block is in the future
      $(idArray[i]).addClass('future');
    }
  }
  // source for getting current hour using dayjs: https://day.js.org/docs/en/get-set/hour
  // source for converting a string into a number: https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l
  // source for adding classes to elements using jQuery: https://www.w3schools.com/jquery/jquery_css_classes.asp

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // the id attribute of each time block was used as the localStorage key when the save button was clicked. it is used as the parameter in localStorage.getItem(), which writes the value from localStorage into the corresponding text area.

  for (i=0; i<idArray.length; i++) {
    $(idArray[i]).children()[1].value = localStorage.getItem($(idArray[i]).attr('id')); // the children() function yields an array [<div>, <textarea>, <button>] specific to the time block denoted by $(idArray[i]). the text area can be obtained using index 1.
  }
  // source for textarea value property: https://www.w3schools.com/jsref/prop_textarea_value.asp

  // TODO: Add code to display the current date in the header of the page.
  
  var endings = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];
  // [1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th, 17th, 18th, 19th 20th, 21st, 22nd, 23rd, 24th, 25th, 26th, 27th, 28th, 29th, 30th, 31st]
  // source for correct endings for ordinal numbers: https://byjus.com/maths/ordinal-numbers/

  var currentDay = $('#currentDay'); // this is the place where the current date goes, it corresponds to the second <p> element

  // source for jQuery selectors: https://www.w3schools.com/jquery/jquery_selectors.asp

  currentDay.text(dayjs().format('dddd, MMMM D') + endings[dayjs().date()-1]);
  // dayjs yields the date format as 'Friday, August 4' (for example). the ending ('-th' for this example) is added on using the endings array. the correct ending is obtained using index [dayjs().date()-1] because dayjs().date() yields a number ranging from 1 to 31, which corresponds to indexes 0-30. the endings array still works for months with less than 31 days, the only difference is that not all of the entries are used for those months.

  // source for date formatting options in dayjs: https://day.js.org/docs/en/display/format
  // source for how to get the current day of the month in dayjs: https://day.js.org/docs/en/get-set/date
});
