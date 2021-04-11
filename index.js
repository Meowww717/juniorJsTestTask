let fieldWidth;
let fieldHeight;

let elements = [];

function getFieldSizes() {
    fieldWidth = +prompt("Введите ширину игрового поля:", "0");
    fieldHeight = +prompt("Введите высоту игрового поля:", "0");

    while (fieldWidth < 1 || fieldHeight < 1) {
        alert("Введите значения больше 0");
        fieldWidth = +prompt("Введите ширину игрового поля:", "0");
        fieldHeight = +prompt("Введите высоту игрового поля:", "0");
    }
}

function drawPlayingField() {
    const container = document.createElement("div");
    container.className = "container";

    for (let i = 1; i <= fieldHeight; i++) {
        let rowWithElements = [];

        for (let j = 1; j <= fieldWidth; j++) {
            let cell = document.createElement("div");

            let randomImage = (Math.floor(Math.random() * 4) + 1);
            cell.style.backgroundImage = "url(images/" + randomImage + ".png)";
        
            cell.setAttribute("class", i + "." + j);
            cell.setAttribute("index", randomImage);
          
            cell.onmouseover = cell.onmouseout = hoverHandler;
            
            rowWithElements.push(cell);

            if (j !== fieldWidth) {
                cell.style.borderRight = "none";
            }

            if (i !== fieldHeight) {
                cell.style.borderBottom = "none";
            }
            container.appendChild(cell);
        }

        elements.push(rowWithElements);
    }

    container.style.width = (50 * fieldWidth) + "px";
    container.style.height = (50 * fieldHeight) + "px";

    document.getElementById("main").appendChild(container);
}

function hoverHandler(event) {
    let relatedGroup = findRelatedGroup(event.target, [], []);

    if (event.type == "mouseover" && event.target.style.backgroundImage !== "none") {
        event.target.classList.add("hover");
        addRelatedGroup(relatedGroup);
    }
    if (event.type == "mouseout") {
        event.target.classList.remove("hover");
        cleanRelatedGroup(relatedGroup);
    }

    event.target.onclick = function() {
        for(let cell of relatedGroup) {
            cell.style.backgroundImage = "none";    
        }    
    };
}

function findRelatedGroup(target, relatedGroup, arr) {
    let i = target.classList[0].slice(0, target.classList[0].indexOf(".")) - 1;
    let j = target.classList[0].slice(target.classList[0].indexOf(".") + 1, target.classList[0].length + 1) - 1;

    if(!relatedGroup.includes(target, 0)) arr.push(target);
    if(!relatedGroup.includes(target, 0)) relatedGroup.push(target);

    let row = elements[i];
    let indexLeft = j;
    while (indexLeft !== 0 && (target.getAttribute("index") == row[indexLeft - 1].getAttribute("index"))) {
        if(!relatedGroup.includes(row[indexLeft - 1], 0)) relatedGroup.push(row[indexLeft - 1]); 
        if(!relatedGroup.includes(target, 0)) arr.push(row[indexLeft - 1]);        
        indexLeft--;
    }

    let indexRight = j;
    while (indexRight !== row.length - 1 && target.getAttribute("index") == row[indexRight + 1].getAttribute("index")) {
        if(!relatedGroup.includes(row[indexRight + 1], 0)) relatedGroup.push(row[indexRight + 1]);  
        if(!relatedGroup.includes(target, 0)) arr.push(row[indexRight + 1]); 
        indexRight++;
    }

    let indexTop = i;
    while (indexTop !== 0 && (target.getAttribute("index") == (elements[indexTop - 1])[j].getAttribute("index"))) {
        if(!relatedGroup.includes((elements[indexTop - 1])[j], 0)) relatedGroup.push((elements[indexTop - 1])[j]);  
        if(!relatedGroup.includes(target, 0)) arr.push((elements[indexTop - 1])[j]);  
        indexTop--;
    }

    let indexBottom = i;
    while (indexBottom !== elements.length - 1 && (target.getAttribute("index") == (elements[indexBottom + 1])[j].getAttribute("index"))) {
        if(!relatedGroup.includes((elements[indexBottom + 1])[j], 0)) relatedGroup.push((elements[indexBottom + 1])[j]);  
        if(!relatedGroup.includes(target, 0)) arr.push((elements[indexBottom + 1])[j]);  
        indexBottom++;
    }

    while(arr.length !== 0) {
        for(let cell of relatedGroup) {
            arr.splice(0, 1);
            findRelatedGroup(cell, relatedGroup, arr);
            
        }         
    }
    return relatedGroup;    
}

function addRelatedGroup(relatedGroup) {
    for(let el of relatedGroup) {
        el.classList.add("relatedHover");
    }
}

function cleanRelatedGroup(relatedGroup) {
    for(let el of relatedGroup) {
        el.classList.remove("relatedHover");
    }
}

getFieldSizes();
drawPlayingField();