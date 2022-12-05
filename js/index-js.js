let currentYear = 2002;
let currentTranslate = 0;
let currentPos = 2;
let timeline = document.getElementById("timeline");
let pointer = document.getElementById("pointer");
let max_distance;

let poinerPositions = [];
let max_width = 1920;
let max_sizes = [1920, 500];
let offset = "110px";

if (document.documentElement.clientWidth > 1400) offset = "220px";

screen.orientation.lock("portrait-primary");

const clearItems = () => {
  document.querySelectorAll(".item-container").forEach((el) => {
    el.innerHTML = "";
  });
};

const createEl = (parent, src, name, href) => {
  let node = document.createElement("div");
  node.classList.add("item");
  let img = document.createElement("img");
  img.src = src;
  node.appendChild(img);
  node.onclick = () => {
    window.location.href = href;
  };
  parent.appendChild(node);
};

if (document.documentElement.clientWidth < 600) {
  document.querySelectorAll("#timeline div").forEach((e) => {
    e.onclick = () => {
      clearItems();
      let year = parseInt(e.textContent);
      let months = document.querySelectorAll(".item-container");
      let i = 0;
      for (let key in items[year]) {
        items[year][key].forEach((el) => {
          createEl(months[i], el.img, el.name, el.href);
        });
        i += 1;
      }
    };
  });
} else {
  const fillPointerPositions = () => {
    poinerPositions = [];
    for (let i = currentYear - 2002; i < currentYear + 5 - 2002; i += 1) {
      let node = document.querySelectorAll("#timeline div")[i];
      let rect = node.getBoundingClientRect();
      poinerPositions.push({
        left: rect.x + rect.width / 2 - 25 + "px",
      });
    }
  };

  const setPointerPos = (year) => {
    fillPointerPositions();
    currentPos = 2;
    if (year == 2000) currentPos = 0;
    if (year == 2001) currentPos = 1;
    if (year == 2021) currentPos = 3;
    if (year == 2022) currentPos = 4;
    pointer.style.left = poinerPositions[currentPos].left;
  };

  const calcDistance = () => {
    let rect = document.querySelector("#timeline div").getBoundingClientRect();
    max_distance = document.documentElement.clientWidth / 2 - rect.x;
  };

  window.onload = () => {
    calcDistance();
    setPointerPos(currentYear);
    fixTopItems();
    fixTitle();
    fixFont();
    showYearInfo();
    changeMeasures();
  };

  window.onresize = () => {
    calcDistance();
    setPointerPos(currentYear);
    fixTopItems();
    fixTitle();
    fixFont();
  };

  const changeMeasures = () => {
    let lines = document.querySelectorAll("#timeline div .line");
    lines.forEach((el) => {
      el.style.height =
        Math.max(
          40 *
            (1 -
              Math.abs(
                el.getBoundingClientRect().x -
                  document.documentElement.clientWidth / 2
              ) /
                max_distance),
          7
        ) + "px";
    });
  };

  changeMeasures();

  const getYearSize = () => {
    return document.querySelector("#timeline div").getBoundingClientRect()
      .width;
  };

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
        targets: "#timeline div",
        translateX: currentTranslate,
        duration: 500,
        easing: "easeInOutCirc",
        update: changeMeasures,
      });
    };
  });

  const fixTopItems = () => {
    document.querySelectorAll(".item-container").forEach((el) => {
      el.style.top = -el.getBoundingClientRect().height - 5;
    });
  };

  const fixTitle = () => {
    document.getElementById("title").style.height =
      document.getElementById("title").getBoundingClientRect().width / 2.5;
    document.getElementById("timeline-container").style.height =
      (500 * document.documentElement.clientWidth) / max_width + "px";
  };

  const fixFont = () => {
    document.getElementById("title").style.fontSize =
      (100 * document.getElementById("title").getBoundingClientRect().width) /
        1400 +
      "px";
    document.querySelectorAll("#month-timeline > div").forEach((e) => {
      e.style.fontSize =
        (21 * document.documentElement.clientWidth) / max_width + "px";
      e.style.lineHeight =
        (32 * document.documentElement.clientWidth) / max_width + 6 + "px";
    });
    document.querySelectorAll("#timeline div").forEach((e) => {
      e.style.fontSize =
        (32 * document.documentElement.clientWidth) / max_width + "px";
    });
  };

  const showYearInfo = (year) => {
    let months = document.querySelectorAll(".item-container");
    let i = 0;
    for (let key in items[year]) {
      items[year][key].forEach((el) => {
        createEl(months[i], el.img, el.name, el.href);
        fixTopItems();
      });
      i += 1;
    }
  };
}

const items = {
  2000: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [
      {
        name: "Nokia 3310",
        img: ".\\img\\nokia3310.jpg",
        href: "pages\\nokia-3310",
      },
      {
        name: "DiskOnKey",
        img: ".\\img\\diskonkey.jpg",
        href: "pages\\diskonkey",
      },
    ],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2001: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [
      {
        name: "MP3 iRiver",
        img: ".\\img\\iriver.jpg",
        href: "pages\\iriver",
      },
    ],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [
      {
        name: "iPod Classic",
        img: ".\\img\\ipod.png",
        href: "pages\\ipod",
      },
    ],
    Декабрь: [],
  },
  2002: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2003: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2004: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2005: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2006: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2007: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [
      {
        name: "iPhone",
        img: ".\\img\\iphone.png",
        href: "pages\\iphone",
      },
    ],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2008: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [
      {
        name: "Amazon Kindle",
        img: ".\\img\\kindle.jpg",
        href: "pages\\kindle",
      },
    ],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2009: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2010: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2011: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [
      {
        name: "Xiaomi Mi 1",
        img: ".\\img\\xiaomi.jpg",
        href: "pages\\xiaomi",
      },
    ],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2012: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2013: {
    Январь: [],
    Февраль: [],
    Март: [
      {
        name: "Oculus Rift DK1",
        img: ".\\img\\oculus.png",
        href: "pages\\oculus",
      },
    ],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2014: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [
      {
        name: "Google Glass",
        img: ".\\img\\glass.webp",
        href: "pages\\google-glass",
      },
    ],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2015: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2016: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2017: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2018: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2019: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2020: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2021: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
  2022: {
    Январь: [],
    Февраль: [],
    Март: [],
    Апрель: [],
    Май: [],
    Июнь: [],
    Июль: [],
    Август: [],
    Сентябрь: [],
    Октябрь: [],
    Ноябрь: [],
    Декабрь: [],
  },
};

const fillItems = () => {
  axios.get("https://ultrabizzare.site/api/getPreview").then((res) => {
    res.data.forEach((item) => {
      items[item.year][item.month].push({
        name: item.name,
        img: "https://ultrabizzare.site/api/" + item.preview,
        href: "pages\\blank?name=" + item.name,
      });
    });
  });
};

fillItems();
