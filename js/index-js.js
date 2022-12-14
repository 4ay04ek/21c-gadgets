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
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [
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
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2001: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [
      {
        name: "MP3 iRiver",
        img: ".\\img\\iriver.jpg",
        href: "pages\\iriver",
      },
    ],
    ????????????????: [],
    ??????????????: [],
    ????????????: [
      {
        name: "iPod Classic",
        img: ".\\img\\ipod.png",
        href: "pages\\ipod",
      },
    ],
    ??????????????: [],
  },
  2002: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2003: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2004: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2005: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2006: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2007: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [
      {
        name: "iPhone",
        img: ".\\img\\iphone.png",
        href: "pages\\iphone",
      },
    ],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2008: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [
      {
        name: "Amazon Kindle",
        img: ".\\img\\kindle.jpg",
        href: "pages\\kindle",
      },
    ],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2009: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2010: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2011: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [
      {
        name: "Xiaomi Mi 1",
        img: ".\\img\\xiaomi.jpg",
        href: "pages\\xiaomi",
      },
    ],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2012: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2013: {
    ????????????: [],
    ??????????????: [],
    ????????: [
      {
        name: "Oculus Rift DK1",
        img: ".\\img\\oculus.png",
        href: "pages\\oculus",
      },
    ],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2014: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [
      {
        name: "Google Glass",
        img: ".\\img\\glass.webp",
        href: "pages\\google-glass",
      },
    ],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2015: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2016: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2017: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2018: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2019: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2020: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2021: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
  },
  2022: {
    ????????????: [],
    ??????????????: [],
    ????????: [],
    ????????????: [],
    ??????: [],
    ????????: [],
    ????????: [],
    ????????????: [],
    ????????????????: [],
    ??????????????: [],
    ????????????: [],
    ??????????????: [],
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
