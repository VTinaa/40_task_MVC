

class MarksModel{
    constructor(){
        this.marks = [
            {course:"HTML", mark: "B+"},
            {course:"CSS", mark: "A-"},
            {course:"JS", mark: "A"},
        ]
        this.out = document.querySelector('.marks-model pre');
        this.updateBlock();
    }
    getMarks(){
        return this.marks;
    }
    addMark(data){
        this.marks.push(data);
        this.updateBlock();
    }
    updateBlock(){
        this.out.innerHTML = JSON.stringify(this.marks,null,2);
    }
}
class TimetableModel{
    constructor(){
        this.timetable = [
            {course:"HTML", data: "Feb 01"},
            {course:"CSS", data: "Aug 14"},
            {course:"JS", data: "Nov 21"},
        ]
        this.out = document.querySelector('.timetable-model pre');
        this.updateBlock();
    }
    getTimeTable(){
        return this.timetable;
    }
    addTimeTable(data){
        this.timetable.push(data);
        this.updateBlock();
    }
    updateBlock(){
        this.out.innerHTML = JSON.stringify(this.timetable,null,2);
    }
}
class View{
    constructor(){
        this.out = document.querySelector('.view-content');
        this.marksTemplate = `
            <h3>Marks</h3>
            <label><input class="marks-radio" type="radio" onclick= "window.controller.showMarksList()" name = "tabs">List</label>
            <label><input class="tile-radio" type="radio" name = "tabs" onclick= "window.controller.showTile()">Title</label> <br>
            {{body}}
        `
        this.timetableTemplate = `
            <h3>Timetable</h3>
            {{body}}`;
        this.mixedTemplate = `
            <h3>Mixed View</h3>
            {{body}} 
            <input type= "text" placeholder = "Course"> <br>
            <input type = "date"> <br>
            <input type = "text" placeholder = "mark"> <br>
            <input type = "button" onclick= "window.controller.addItem() value = "Add mark">`;
    }
    showMarks(data){
        let body = "<ul>"
        for (const item of data) {
            body+= `<li>${item.course} - ${item.mark} </li>`
        }
        body+="</ul>"
        this.out.innerHTML = this.marksTemplate.replace('{{body}}',body);
    }
    showMarksTile(data){
        let body = ""
        for (const item of data) {
            body+= `<div class = "tile">${item.course} <br> ${item.mark} </div>`
        }
        this.out.innerHTML = this.marksTemplate.replace('{{body}}',body);
    }
    showTimetable(data){
        let body = "<table><tr><th>Corse</th><th>Date</th></tr>"
        for (const item of data) {
            body+= `<tr><td>${item.course} </td><td> ${item.data} </td></tr>`
        }
        body+="</table>"
        this.out.innerHTML = this.timetableTemplate.replace('{{body}}',body);
    }
    showMix(data){
        let body = "<table><tr><th>Corse</th><th>Date</th><th>Mark</th></tr>"
        for (const item of data) {
            body+= `<tr><td>${item.course} </td><td> ${item.data} </td><td>${item.mark}</td></tr>`
        }
        body+="</table>"
        this.out.innerHTML = this.mixedTemplate.replace('{{body}}',body);
    }
}
class Controller{
    constructor(){
        this.out = document.querySelector('.controller p')

    }
    defaultAction(){
        this.showMarksList()
    }
    showMarksList(){
        window.view.showMarks(window.marksModel.getMarks());
        // document.querySelectorAll('input[type=radio]')[0].cheked = true;
        document.querySelector('.marks-radio').checked = true;
    }
    showTimetable(){
        window.view.showTimetable(window.timetableModel.getTimeTable())
    }
    showTile(){
        window.view.showMarksTile(window.marksModel.getMarks());
        // document.querySelectorAll('input[type=radio]')[1].cheked =true;
        document.querySelector('.tile-radio').checked = true;
    }
    mixed(){
        let data = window.timetableModel.getTimeTable();
        let mark = window.marksModel.getMarks();
        let new_data = []
        for (let i = 0; i < data.length; i++) {
            new_data.push({
                course:data[i].course,
                data:data[i].data,
                mark:mark[i].mark
            })
        }
        window.view.showMix(new_data);
    }
    addItem(){

    }
}

document.addEventListener('DOMContentLoaded',function(){
    window.marksModel = new MarksModel()
    window.timetableModel = new TimetableModel()
    window.view = new View()
    window.controller = new Controller();
    window.controller.showMarksList();
    // window.controller.defaultAction();
    let tabs = document.querySelectorAll('.nav li');
    tabs[0].addEventListener('click',window.controller.showMarksList);
    tabs[1].addEventListener('click',window.controller.showTimetable);
    tabs[2].addEventListener('click',window.controller.mixed);
})

// let marks = new MarksModel();
// let timetable = new Timetable();