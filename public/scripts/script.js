const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
const days = [ "SUN", "MON", "TUE", "WED", 'THU', "FRI", "SAT" ];

var date = new Date(); //default to current date
var today = new Date();  //set to current date
var clickedDate; //var to put user-clicked date into context
var calTable = '';
var allDayCheck = "false";
var eventList = document.getElementsByClassName("event"); //user's event list

function initCalendar() {
  if(document.getElementById("calendarTable")!=null){
    document.getElementById("calendarTable").innerHTML = "";
    calTable = document.createElement("table");
    calTable.classList.add('table', 'table-borderless');
    year = date.getUTCFullYear();
    currentMonth = date.getUTCMonth();
    priorMonth = currentMonth==0 ? 11:date.getUTCMonth()-1;
    nextMonth = currentMonth==11 ? 0:date.getUTCMonth()+1;
    currentMonthName = months[currentMonth];
    priorMonthName = months[priorMonth];
    nextMonthName = months[nextMonth];
    let updatedTitle = "<span class='notCurrent col-3' onclick='loadPrevious()'>"+priorMonthName+"</span>"
    + "<span class='current col-4'>"+currentMonthName+"</span>"
    + "<span class='notCurrent col-3' onclick='loadNext()'>"+nextMonthName+"</span>"
    + "<span class='current col-2'>"+year+"</span>"
    document.getElementById("calendarTitle").innerHTML = updatedTitle;
    let startDay = new Date(year, currentMonth, 1).getDay(); //0 is Sunday
    let numDays = new Date(year, currentMonth+1, 0).getDate();
    let priorNumDays = new Date(year, currentMonth, 0).getDate();
    generateCal(year, currentMonth, startDay, numDays, priorNumDays);
    document.getElementById("calendarTable").appendChild(calTable);
    initEventSection(date);
  }
}

function initEventSection(dateInContext) {
  let leadingMonthZero="";
  let leadingDayZero="";
  document.getElementById("eventDay").textContent = days[dateInContext.getDay()];
  document.getElementById("eventMonthDate").textContent = months[dateInContext.getMonth()] + " " + dateInContext.getDate();
  if(dateInContext.getUTCMonth()<10) {
    leadingMonthZero = "0"
  }
  if(dateInContext.getUTCDate()<10) {
    leadingDayZero = "0"
  }
  let clickedDateValue = dateInContext.getFullYear()+"-"+leadingMonthZero+(dateInContext.getMonth())+"-"+leadingDayZero+dateInContext.getDate();
  let displayDate = dateInContext.getFullYear()+"-"+leadingMonthZero+(dateInContext.getMonth()+1)+"-"+leadingDayZero+dateInContext.getDate();
  document.getElementById("dateInContext").value = clickedDateValue;
  document.getElementById("startDate").value = displayDate;
  document.getElementById("endDate").value = displayDate;

  if (dateInContext.getUTCMonth() > 10 || dateInContext.getUTCMonth() < 2) { //11, 0, 1
    document.getElementById("eventSection").classList.add("winter");
    document.getElementById("eventSection").classList.remove("spring");
    document.getElementById("eventSection").classList.remove("summer");
    document.getElementById("eventSection").classList.remove("autumn");
  } else if (dateInContext.getUTCMonth() > 1 && dateInContext.getUTCMonth() < 5) { //2, 3, 4
    document.getElementById("eventSection").classList.remove("winter");
    document.getElementById("eventSection").classList.add("spring");
    document.getElementById("eventSection").classList.remove("summer");
    document.getElementById("eventSection").classList.remove("autumn");
  }
  else if (dateInContext.getUTCMonth() > 4 && dateInContext.getUTCMonth() < 8) { //5, 6, 7
    document.getElementById("eventSection").classList.remove("winter");
    document.getElementById("eventSection").classList.remove("spring");
    document.getElementById("eventSection").classList.add("summer");
    document.getElementById("eventSection").classList.remove("autumn");
  }
  else { // 8, 9, 10
    document.getElementById("eventSection").classList.remove("winter");
    document.getElementById("eventSection").classList.remove("spring");
    document.getElementById("eventSection").classList.remove("summer");
    document.getElementById("eventSection").classList.add("autumn");
  }

  let eventCount=0;
  for (k=0; k<eventList.length; k++) {
    let thisEventStart = new Date((eventList[k].getElementsByClassName("startdate")[0].innerHTML));
    let thisEventEnd = new Date((eventList[k].getElementsByClassName("enddate")[0].innerHTML));
    let thisEventStartValue = thisEventStart.getUTCFullYear()+"-"+leadingMonthZero+(thisEventStart.getUTCMonth())+"-"+leadingDayZero+(thisEventStart.getUTCDate());
    let thisEventEndValue = thisEventEnd.getUTCFullYear()+"-"+leadingMonthZero+(thisEventEnd.getUTCMonth())+"-"+leadingDayZero+(thisEventEnd.getUTCDate());
    if(thisEventStartValue == clickedDateValue) {
      document.getElementById("eventCount").classList.add("hidden");
      eventList[k].classList.remove("hidden");
      eventCount++;
    } else if (thisEventStartValue < clickedDateValue && clickedDateValue <= thisEventEndValue){
      document.getElementById("eventCount").classList.add("hidden");
      eventList[k].classList.remove("hidden");
      eventCount++;
    }else {
      eventList[k].classList.add("hidden");
    }
    if(eventCount==0) {
      document.getElementById("eventCount").classList.remove("hidden");
    }
  }

}

function generateCal(year, currentMonth, startDay, numDays, priorNumDays) {
  let tableHeader = document.createElement("thead");
  let headerRow = document.createElement("tr");
  for (d = 0; d < 7; d++) {
    cell = document.createElement("th");
    cellText = document.createTextNode(days[d]);
    cell.appendChild(cellText);
    headerRow.appendChild(cell);
    tableHeader.appendChild(headerRow);
    calTable.appendChild(tableHeader);
  }

  let label = 1;
  let priorLabel = priorNumDays-(startDay-1);
  let nextLabel = 1;

  let tableBody = document.createElement("tbody");
  for (i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (j = 0; j < 7; j++) {
      if (i == 0 && j < startDay) {
        cell = document.createElement("td");
        cell.classList.add("notCurrent");
        cellText = document.createTextNode(priorLabel);
        cell.appendChild(cellText);
        row.appendChild(cell);
        priorLabel++;
      } else if (label > numDays) {
        cell = document.createElement("td");
        cell.classList.add("notCurrent");
        cellText = document.createTextNode(nextLabel);
        cell.appendChild(cellText);
        row.appendChild(cell);
        nextLabel++;
      } else {
        cell = document.createElement("td");
        cell.classList.add("current");
                        for (k=0; k<eventList.length; k++) {
                          let thisEventStart = new Date(eventList[k].getElementsByClassName("startdate")[0].innerHTML);
                          let thisEventEnd = new Date(eventList[k].getElementsByClassName("enddate")[0].innerHTML);
                          if(thisEventStart.getUTCFullYear()==year && thisEventStart.getUTCMonth()==currentMonth && (thisEventStart.getUTCDate()<=label && label<=thisEventEnd.getUTCDate())) {
                            cell.classList.add("dot");
                          }
                        }
        cell.onclick = putDayInContext;
        let todayDate = today.getFullYear()+""+today.getMonth()+""+today.getDate();
        let labelDate = year+""+currentMonth+""+label;
        if (todayDate == labelDate) {
          cell.classList.add("today");
        } else {
          cell.classList.remove("today");
        }
        cellText = document.createTextNode(label);
        cell.appendChild(cellText);
        row.appendChild(cell);
        label++;
      }


    }
    tableBody.appendChild(row);
  }
  calTable.appendChild(tableBody);
}

function putDayInContext() {
  var tdList = document.getElementsByTagName("td");
  for (var i = 0; i < tdList.length; i++) {
    tdList[i].style.backgroundColor = '';
    tdList[i].style.color = '';
  }
  const putDayInContext = Math.floor(Math.random()*16777215).toString(16);
  this.style.backgroundColor = "#" + putDayInContext;
  var hexcolor = putDayInContext;
  var r = parseInt(hexcolor.substr(0,2),16);
  var g = parseInt(hexcolor.substr(2,2),16);
  var b = parseInt(hexcolor.substr(4,2),16);
  var yiq = ((r*299)+(g*587)+(b*114))/1000;
  var fontColor = (yiq >= 128) ? 'black' : 'white';
  this.style.color = fontColor;

  clickedDate = new Date(date.getUTCFullYear(),date.getUTCMonth(), this.textContent);
  initEventSection(clickedDate);

}

function loadPrevious() {
  let updMonth = date.getUTCMonth()==0 ? 11:date.getUTCMonth()-1;
  let updYear = date.getUTCMonth()==0 ? date.getUTCFullYear()-1:date.getUTCFullYear();
  date = new Date(updYear,updMonth,1);
  initCalendar();
}

function loadNext() {
  let updMonth = date.getUTCMonth()==11 ? 0:date.getUTCMonth()+1;
  let updYear = date.getUTCMonth()==11 ? date.getUTCFullYear()+1:date.getUTCFullYear();
  date = new Date(updYear, updMonth,1);
  initCalendar();

}

function check(field) {
  if (allDayCheck == "false") {
    for (i = 0; i < field.length; i++) {
      field[i].checked = true;
    }
    allDayCheck = "true";
    return "Uncheck All";
  } else {
    for (i = 0; i < field.length; i++) {
      field[i].checked = false;
    }
    allDayCheck = "false";
    return "Check All";
  }
}

function showHideDiv(allDayInd) {
  document.getElementById("startTime").style.display = allDayInd.checked ? "none" : "block";
  document.getElementById("endTime").style.display = allDayInd.checked ? "none" : "block";
  document.getElementById("startTime").value = allDayInd.checked ? '00:00' : '';
  document.getElementById("endTime").value = allDayInd.checked ? '23:59' : '';
}

function checkEnd() {
  var start = new Date(document.getElementById("startDate").value + "T" + document.getElementById("startTime").value);
  var end = new Date(document.getElementById("endDate").value  + "T" +  document.getElementById("endTime").value);
  if (end<start) {
    document.getElementById("eventEndErr").style.display = "block";
    document.getElementById("submitEvent").disabled = true;
    document.getElementById("submitEvent").classList.add("disabled");
  } else {
    document.getElementById("eventEndErr").style.display = "none";
    document.getElementById("submitEvent").disabled= false;
    document.getElementById("submitEvent").classList.remove("disabled");
  }
}

function expandEvent(clickedNode) {
  clickedNode.parentNode.getElementsByTagName('ul')[0].classList.toggle("hidden");
}


function newModal() {
  document.getElementById("eventModalLabel").innerHTML = "New Event";
  document.getElementById("eventForm").action = "/events";
  $('#eventModal').modal('show');
}

function editModal(clickedNode) {
  document.getElementById("eventModalLabel").innerHTML = "Edit Event";
  var event = clickedNode.parentNode.getElementsByTagName('input')[0].value;
  var eventString = JSON.parse(event);
  document.getElementById("eventForm").action = "/events/"+eventString._id+"?_method=PATCH";
  document.getElementById("eventName").value = eventString.title;
  document.getElementById("allDayInd").checked = eventString.allDayInd=='on' ? true : false;
  document.getElementById("startDate").value = eventString.startDate.substring(0,10);
  document.getElementById("startTime").value = eventString.startTime;
  document.getElementById("endDate").value = eventString.endDate.substring(0,10);
  document.getElementById("endTime").value = eventString.endTime;
  document.getElementById("eventDesc").value = eventString.description;
  document.getElementById("location").value = eventString.location;
  $('#eventModal').modal('show');
  showHideDiv(document.getElementById("allDayInd"));

}
