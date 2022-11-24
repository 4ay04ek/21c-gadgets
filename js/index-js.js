let currentYear = 2002;
let currentTranslate = 0;
let currentPos = 2;
let timeline = document.getElementById("timeline");
let pointer = document.getElementById("pointer");
let max_distance;

let poinerPositions = []

const fillPointerPositions = () => {
    poinerPositions = [];
    for (let i = currentYear - 2002; i < currentYear + 5 - 2002; i += 1){
        let node = timeline.querySelectorAll("#timeline div")[i];
        let rect = node.getBoundingClientRect();
        poinerPositions.push({
            top: node.offsetY + 25 + "px",
            left: rect.x + rect.width / 2 - 22 + "px",
        });
    }
}

const setPointerPos = (year) => {
    fillPointerPositions();
    currentPos = 2;
    if (year == 2000) currentPos = 0; 
    if (year == 2001) currentPos = 1;
    if (year == 2021) currentPos = 3;
    if (year == 2022) currentPos = 4;
    pointer.style.top = poinerPositions[currentPos].top;
    pointer.style.left = poinerPositions[currentPos].left;
}

const calcDistance = () => {
    let rect = document.querySelector("#timeline div").getBoundingClientRect();
    max_distance = window.innerWidth / 2 - rect.x;
}

setPointerPos(currentYear);
calcDistance();

window.onresize = () => {
    calcDistance();
    setPointerPos(currentYear);
    fixTopItems();
}

const changeMeasures = () => {
    let lines = document.querySelectorAll("#timeline div .line");
    lines.forEach(el => {
        el.style.height = Math.max(40 * (1 - Math.abs(el.getBoundingClientRect().x - window.innerWidth / 2) / max_distance), 7) + "px"; 
    });
}

changeMeasures();

const getYearSize = () => {
    return document.querySelector("#timeline div").getBoundingClientRect().width;
}

const clearItems = () => {
    document.querySelectorAll(".item-container").forEach(el => {
        el.innerHTML = '';
    })
}

document.querySelectorAll("#timeline div").forEach((el) => {
    el.onclick = () => {
        let year = parseInt(el.innerHTML.substring(0, 4));
        setPointerPos(year);
        clearItems();
        showYearInfo(year);
        if (currentPos != 2) return;
        let dyear = year - parseInt(currentYear);
        currentTranslate -= getYearSize() * dyear;
        currentTranslate = Math.min(currentTranslate, 0);
        currentYear = year;
        anime({
            targets: timeline,
            translateX: currentTranslate,
            duration: 500,
            easing: "easeInOutCirc",
            update: changeMeasures,
        })
    }
});

const fixTopItems = () => {
    document.querySelectorAll(".item-container").forEach(el => {
        el.style.top = -el.getBoundingClientRect().height - 5;
    })
    document.querySelectorAll(".item img").forEach(el => {
        el.style.top = (el.parentElement.getBoundingClientRect().height - el.getBoundingClientRect().height) / 2;
        el.style.left = (el.parentElement.getBoundingClientRect().width - el.getBoundingClientRect().width) / 2;
    })
    document.querySelectorAll(".item").forEach(el => {
        el.lastChild.style.lineHeight = el.lastChild.getBoundingClientRect().height + "px";
    })
}

fixTopItems();

const fixItemEvents = () => {
    document.querySelectorAll(".item").forEach(el => {
    el.onmouseover = () => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font = "20px Jost";
        el.lastChild.style.width = context.measureText(el.lastChild.innerHTML).width + el.getBoundingClientRect().width + "px";
    }
    el.onmouseleave = () => {
        el.lastChild.style.width = "0px";
    }
    })
}

const createEl = (parent, src, name) => {
    let node = document.createElement("div");
    node.classList.add("item");
    let img = document.createElement("img");
    img.src = src;
    let div = document.createElement("div");
    div.innerHTML = name;
    node.appendChild(img);
    node.appendChild(div);
    parent.appendChild(node);
}

const showYearInfo = (year) => {
    let months = document.querySelectorAll(".item-container");
    let i = 0;
    for(let key in items[year]){
        console.log(key);
        items[year][key].forEach(el => {
            console.log(months[i], el);
            createEl(months[i], el.img, el.name);
            fixTopItems();
            fixItemEvents();
        });
        i += 1;
    }
}

const items = {
    "2000": {
        "Январь": [],
        "Февраль": [],
        "Март": [{name: "PlayStation 2", img: "..\\img\\ps2.jpg"}],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2001": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2002": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2003": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2004": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2005": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2006": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2007": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2008": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2009": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2010": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2011": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2012": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2013": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2014": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2015": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2016": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2017": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2018": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2019": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2020": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2021": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
    "2022": {
        "Январь": [],
        "Февраль": [],
        "Март": [],
        "Апрель": [],
        "Май": [],
        "Июнь": [],
        "Июль": [],
        "Август": [],
        "Сентябрь": [],
        "Октябрь": [],
        "Ноябрь": [],
        "Декабрь": [],
    },
}