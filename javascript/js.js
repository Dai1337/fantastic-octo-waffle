// JavaScript Project for Front-End-Web Developer Class
/*`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`*/
//Each subject is a constructor so each student can have it's own grade in each subject the belong
var Calculus = function(){
  Calculus.prototype.subject = "Calculus";
  this.grade = 70; //sets a default value for their grade
}
var English = function(){
  English.prototype.subject = "English";
  this.grade = 70;
}
var German = function(){
  German.prototype.subject = "German";
  this.grade = 70;
}
var SocialStudies = function(){
  SocialStudies.prototype.subject = "SocialStudies";
  this.grade = 70;
}
var PhysEd = function(){
  PhysEd.prototype.subject = "PhysEd";
  this.grade = 70;
}
var Telekenisis = function(){
  Telekenisis.prototype.subject = "Telekenisis";
  this.grade = 70;
}
var subArray = [new Calculus(), new English(), new German(), new SocialStudies(), new PhysEd(), new Telekenisis()]

var Students = function (name, subjects){
  this.name = name,
  this.subjects = subjects
  }
var davidGarcia = new Students("David Garcia", [new Calculus(), new German(), new SocialStudies(), new PhysEd()]);
var stellaAllets = new Students("Stella Allets", [new Calculus(), new English(), new SocialStudies(), new PhysEd()]);
var luisSiul = new Students("Luis Siul", [new Calculus(), new English(), new German(), new PhysEd()]);
var timMit = new Students("Tim Mit", [new Calculus(), new English(), new German(), new SocialStudies()]);
var freedomGarcia = new Students("Freedom Garcia", [new Calculus(), new German(), new SocialStudies(), new PhysEd()]);
var cocoMae = new Students("Coco Mae", [new Calculus(), new English(), new SocialStudies(), new PhysEd()]);
var lylahElizabeth = new Students("Lylah Elizabeth", [new Calculus(), new English(), new German(), new PhysEd()]);
var peppaPig = new Students("Peppa Pig", [new Calculus(), new English(), new German(), new SocialStudies()]);
var studentArray = [davidGarcia,stellaAllets,luisSiul,timMit,freedomGarcia,cocoMae,lylahElizabeth,peppaPig];

const color1 = "#23374d"; //dark blue
const color2 = "#1089ff"; //bright blue
const color3 = "#e5e5e5"; //less bright white
const color4 = "#eeeeee"; //off white
var rowId = 0; //global variable to be able to redraw the table continuously
var message = document.getElementById("java"); //allows each function to communicate with the end user
var studentsInMyClass = new Array(); //global array for whoIsInMyClass function and when the ammended table has to be redrawn
var byClassMode = false; // turns true when the whoIsInMyClass function is called; important so when setGrade button is pressed, it knows which array to call
function makeTable(students){
  for (var i = 0; i < students.length;i++){ 
    for (var x = 0; x < students[i].subjects.length; x++){ // sorts through each subject of each student
      var studentRow = document.createElement("div"); // for each subject of each student it creates a row 
      studentRow.id = "row" + rowId; // with a different ID
      (x % 2 == 0) ? studentRow.style.backgroundColor = color3:
      studentRow.style.backgroundColor = color4;
      studentRow.className = "table";
      document.getElementById("studentTable").appendChild(studentRow); // then adds each row to the table
      for(var y = 0; y < 4; y++){
        var studentData = document.createElement("div");
        var removeStudent = document.createElement("div");
        var close = document.createElement("button");
        (y == 0 && x == 0) ? (studentData.innerText = students[i].name, studentData.id = students[i].name) : // important for spacing in the rows to only print the name if it's the first iteration of the student.
        (y == 1) ? (studentData.innerText = students[i].subjects[x].subject) :
        (y == 2) ? (studentData.innerText = students[i].subjects[x].grade):
        (studentData.style.display = "none");
        studentData.style.textAlign = "center";
        document.getElementById("row" + rowId).appendChild(studentData);
        (y == 2 && x == 0) ? ( // if it's the first row and last element for each  it adds a new table data that includes a remove button
        close.innerText = "⨂",
          close.style.fontSize = "1.5em",
          close.className = ("remove"),
          close.id = (i),
          // close.padding = "9mm",
          removeStudent.appendChild(close),
          removeStudent.style.backgroundColor = color3,
          removeStudent.style.color = color4,
          document.getElementById("row" + rowId).appendChild(removeStudent)
          ) : removeStudent.innerText = "";
      }
      rowId++;
    }
  }
}

function removeStudent(i){
  let confirm = document.getElementById("confirmContainer");
  let question = document.getElementById("removeQ");
  let yes = document.getElementById("yes");
  let no = document.getElementById("no");
  confirm.style.display = "block";
  question.innerText = "Are you sure you want to remove " +((byClassMode)? studentsInMyClass[i].name : studentArray[i].name)+" from School?";
  yes.onclick = function(){
    confirm.style.display = "none";
    message.innerText = "you have removed " + ((byClassMode)? studentsInMyClass[i].name : studentArray[i].name);
    messageStyle(message);
    removeTable(studentArray);
    removeNameDropdown();
    (byClassMode)? studentsInMyClass.splice(i,1) :studentArray.splice(i,1);
    startUp();
  }
  no.onclick = ()=> confirm.style.display = "none";
  confirm.onclick = ()=> confirm.style.display = "none";
}

function removeTable(students) {
  rowId = 0;
  for (i in students){
    for(x in students[i].subjects){
      var row = document.getElementById("row"+ rowId);
      row.remove();
      rowId++;
    }
  }
  rowId = 0;
}

function setNameDropdown(students) { // for each student in the array it appends an option with the student's name.
  for (i=0;i<students.length;i++){
    var option = document.createElement("option");
    option.className = "names";
    option.value = students[i].name;
    option.innerText = students[i].name;
    document.getElementById("name").appendChild(option);
  }
}

function removeNameDropdown(){
  var option = document.getElementsByClassName("names");
  for(var i = option.length - 1; 0 <= i; i--){ // important to inumerate through backwards, otherwise, for some reason it will only do everyother one
    option[i].parentElement.removeChild(option[i]);
    if (i==0) finish = true;
  } 
}

function setSubjectsDropdown(subjects){// similar to the name dropdown, however added functionality for making multiple dropdowns on the webpage.
  for (x=0; x<document.getElementsByClassName("sub").length;x++){
    for (i=0;i<subjects.length;i++){
      var option = document.createElement("option");
      option.value = subjects[i].subject;
      option.innerText = subjects[i].subject;
      document.getElementsByClassName("sub")[x].appendChild(option);
    }
  }
}

function setStudentNav(students) { // for each student in the array it appends an option with the student's name.
var nav = document.getElementById("nav");
  for (i=0;i<students.length;i++){
    var option = document.createElement("option");
    option.value = "#"+students[i].name;
    option.innerText = students[i].name;
    option.className = "names";
    nav.appendChild(option);
  }
}

function sortStudents(array){
  //to be able to sort the object's name by last name when it only takes 1 string with the first name and then the last name together in a string, we have to "split" it into 2 strings which returns an Array with the 2 strings, and then "reverse" the Array so it can be evaluated by the last name later when we sort it.
  for (var i = 0; i < array.length; i++){
    array[i].name = array[i].name.split(" ",2).reverse();
  }
  array.sort((a, b) => (a.name > b.name) ? 1 : -1); //this line compares each object's name using the terniary fucntion returning a 1 if a.name is bigger than b.name and a -1 if it's smaller, then it runs that function into .sort() giving us the list of objects in the array in lexicographical order by last name. Important to note that it only sorts the first element in the array, that's why we had to reverse it in the first place.
  for (var i = 0; i < array.length; i++){
      array[i].name = array[i].name.reverse().reduce((a,b) => (a+=" "+b)); //after sorting the objects it takes each element in the array at name and reverses the order again and then reduces the two values into 1 readable string with the first name and the last name.
    }
    
  }
  
function whoIsInMyClass(){
  var subjectName = document.getElementById("whichSubject").value;
  // var hideSubmit = document.getElementById("whoClass");
  var displayBack = document.getElementById("backClass");
  // hideSubmit.style.display = "none";
  displayBack.style.display = "initial";
  for (var i = 0; i < studentArray.length; i++){
    for (var x = 0; x < studentArray[i].subjects.length; x++){
      if (studentArray[i].subjects[x].subject == subjectName){
        studentsInMyClass.push(studentArray[i]);
      }
      }
    }
  message.innerHTML = "Now veiwing students that are currently in " + subjectName;
  messageStyle(message);
  byClassMode = true;
  removeTable(studentArray);
  removeNameDropdown();
  sortStudents(studentsInMyClass);
  makeTable(studentsInMyClass);
  setStudentNav(studentsInMyClass);
  setNameDropdown(studentsInMyClass);
}

function backFromClass(){
  var hideBack = document.getElementById("backClass");
  hideBack.style.display = "none";
  removeTable(studentsInMyClass);
  removeNameDropdown();
  studentsInMyClass = [];
  startUp();
  byClassMode = false;
}

function nextClass(){
  backFromClass();
  whoIsInMyClass();
}

function messageStyle(message){
  message.style.position = "fixed";
  message.style.gridRow = "1";
  message.style.gridColumn = "1";
  message.style.flexFlow= "row";
  message.style.fontSize = "1.5em";
  message.style.width = "25%";
  message.style.bottom = "0px";
  message.style.borderRadius = "15px";
  message.style.backgroundColor = color2;
  message.style.padding = "10px";
  message.style.textAlign = "center";
  var opacity = 100;
  var id = setInterval(frame,20);
  function frame(){
    opacity--;
      (opacity == 0) ? clearInterval(id) : message.style.opacity = "" + (opacity/100);
  }
}

function setGrade(students){// Instead of passing parameters that the HTML form fills when completed, it grabs the values from the document when the form is filled out. It is important to note that logic statements should stay within the function instead of onclick function. It then compares the values to the index of students , if it finds a match, it adds the grade to the subject string of the student class of the particular student; and also makes a note of the change on the website. 
  var student = document.getElementById("name").value;
  var sub = document.getElementById("sub").value;
  var grade = document.getElementById("grader").value;
  var found = false; //important to keep the code from breaking
  var rowCount = 0;

  for (var i = 0; i < students.length; i++){
    for (var x = 0; x < students[i].subjects.length; x++){
      if (grade > 100) grade %=100; // this is here for user error, typing in a number higher than 100.
      if (students[i].name == student && students[i].subjects[x].subject == sub && grade <= 100){ //loops through the students and checks to see if the student's name matches and the subject matches before changing the grade.
        found = true;
        students[i].subjects[x].grade = grade;
        document.getElementById("row" + rowCount).childNodes[2].innerText = grade;
        message.innerHTML = student + "\'s " + sub + " grade is now " + grade +"!\n"; // lets the user know that the function has run.
        messageStyle(message);
        rowCount = 0; // resets the count for future run
      } else if (i === students.length-1 && x === students[i].subjects.length-1 && grade <= 100 && found === false){ // if the loop has gone through it's entirety and it hasn't found a match...
        found = true;
        message.innerHTML = student + " doesn\'t go to this class";
        messageStyle(message);
        message.style.backgroundColor = "#666";
        rowCount = 0; // resets the count for future run
      }
      rowCount++; // counts each time the loop passes through till it gets to the specified student
    }
  }
}
function addStudent(students){
  if (document.getElementById("newStudent").value){
    var name = document.getElementById("newStudent").value; //stores name to pass through the student constructor
    var newSubs = new Array();
    for (x = 1; x < 5; x++){ // takes the values of subject the user inputs and runs a loop on the subject array to pull the constructor functions of each subject inputed.
      for (y = 0; y < subArray.length; y++){
        if (document.getElementById("sub" + x).value == subArray[y].subject){
          newSubs.push(subArray[y]); // takes each contructor that matches the user input and makes a new array to be refferenced by the Students consdivuctor.
        }
      }
    }
    var newStudent= new Students(name,[newSubs[0],newSubs[1],newSubs[2],newSubs[3]]);
    students.push(newStudent); // adds the new Student to the outside array
    for (i = 0; i < newStudent.subjects.length; i++){ // runs a similar function to makeTable, but the distinction lies within the need to append the table instead of remake it.
      var newRow = document.createElement("div");
      newRow.id = "row" + rowId;
      (i % 2 == 0) ? newRow.style.backgroundColor = color3:
                     newRow.style.backgroundColor = color4;
      document.getElementById("studentTable").appendChild(newRow);
      for (x = 0; x < 3; x++){
        var newData = document.createElement("p");
        (x == 0 && i == 0) ? (newData.innerText = newStudent.name, newData.id = newStudent.name, newData.style.textAlign ="left"): // important for spacing in the rows to only print the name if it's the first iteration of the student.
                  (x == 1) ? (newData.innerText = newStudent.subjects[i].subject, newData.style.textAlign = "center"):
                  (x == 2) ? (newData.innerText = newStudent.subjects[i].grade, newData.style.textAlign = "right"):
                  (newData.innerText = " ", newData.style.textAlign = "right");
        // newData.style.textAlign = "center";
        document.getElementById("row"+rowId).appendChild(newData);
        message.innerHTML = name + " has been added to the table!"; // lets the user know that the function has run.
        messageStyle(message);
        (y == 2 && x == 0) ? (
        close.innerText = "⨂",
        close.style.fontSize = "1.15em",
        close.style.backgroundColor = color3,
        close.style.borderRadius = "50%",
        close.className = ("remove"),
        close.id = (i),
        removeStudent.appendChild(close),
        removeStudent.style.backgroundColor = color1,
        removeStudent.style.border = "hidden",
        removeStudent.style.borderRadius = "15px",
        removeStudent.style.textAlign = "center",
        document.getElementById("row" + rowId).appendChild(removeStudent)
        ) : removeStudent.innerText = "";
      }
      rowId++;
    }
    var nameOption = document.createElement("option");
    var navOption = document.createElement("option");
    nameOption.value = newStudent.name;
    nameOption.innerText = newStudent.name;
    nameOption.className = "names";
    navOption.value = "#" + newStudent.name;
    navOption.innerText = newStudent.name;
    navOption.className = "names";
    document.getElementById("name").appendChild(nameOption);
    document.getElementById("nav").appendChild(navOption);
    removeTable(students);
    removeNameDropdown();
    startUp();
  }
}

function makeButtons(){ // gives the remove buttons the ability to work
  var buttons = document.getElementsByClassName("remove");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (){
      removeStudent(this.id);
    }
  }
}

function startUp(){ // condensing code that is used over and over
  sortStudents(studentArray);
  makeTable(studentArray);
  setNameDropdown(studentArray);
  setStudentNav(studentArray);
  makeButtons();
}
window.onload = function(){
  setSubjectsDropdown(subArray);
  startUp();
}