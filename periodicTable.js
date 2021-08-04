// eslint-disable-next-line no-undef
const periodicTableData = periodicTable;

/* eslint-disable no-param-reassign */
const periodicTablePoem = `<h1>Periodic Table</h1>
<p>The Table is the best and worst<br>
The Table is the universe<br>
Eat from the Table.<br>
Run from the Table.<br>
You'll end up<br>
Right back at the Table. </p>`;

const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

function createWikiUrl(element) {
  return `https://en.wikipedia.org/wiki/${element}`;
}

function createA(elementType, className, idName, parent, elementName) {
  const domElement = document.createElement(elementType);
  if (className) domElement.className = className;
  if (idName) domElement.id = idName;
  if (elementType === 'a') domElement.href = createWikiUrl(elementName);
  if (elementType === 'a') domElement.onclick = () => console.log('aref click', domElement);
  if (parent) parent.append(domElement);
  return domElement;
}

function closeElementExpanded(event) {
  const elementExpanded = document.getElementById('periodic-element__expanded');
  console.log(event,'closeElementExpanded', elementExpanded);
  elementExpanded.textContent = '';
  elementExpanded.style.display = 'grid';
  const periodicTable = document.getElementById('periodic-table');
  periodicTable.style.position = 'relative';
  periodicTable.style.top = '0px';
}

function createDOMImage(elementType, className, idName, parent, elementName, image, width) {
  console.log(elementType, className, idName, parent,elementName, image)
  const domElement = document.createElement(elementType);
  domElement.className = className;
  domElement.id = idName;
  domElement.src = image;
  domElement.alt = elementName;
  domElement.width = width;
  parent.appendChild(domElement);
  return domElement;
}

function createDOMElement(elementType, className, idName, parent,
  elementItem, eventListener, elementName) {
  const domElement = (elementType) ? document.createElement(elementType) : elementName;
  if (className) domElement.className = className;
  if (idName) domElement.id = idName;
  if (eventListener) domElement.addEventListener('click', eventListener.bind(this), {passive: true});
  if (elementItem) domElement.innerHTML += elementItem;
  if (elementType === 'ul') domElement.type = 'none';
  if (parent) parent.appendChild(domElement);
  return domElement;
}

function createInfoDivs(elementObj, elementParent, atomicNumber, objName) {
  const elementDescriptionName = createDOMElement('div', `periodic-element__expanded-description${objName}`,
    `periodic-element__expanded-description${objName}`, elementParent);

  // eslint-disable-next-line array-callback-return
  Object.entries(elementObj).map(([key, value]) => {
    if (value && objName === '-basics') {
      return createDOMElement('div', `periodic-element__expanded-${key}`,
        `periodic-element__expanded-${key}`, elementDescriptionName, value);
    }
    if (value) {
      return createDOMElement('div', `periodic-element__expanded-${key}`,
        `periodic-element__expanded-${key}`,
        elementDescriptionName, `${key}: ${value}`);
    }
  });
}

function addImageClickHandler(imageElement, periodicElement) {
  const clickHandler = () => {
    const elementExpanded = document.getElementsByClassName('periodic-element__expanded')[0];
    createElementExpanded(periodicElement, elementExpanded);
  }

  elementGridCell.addEventListener('click', clickHandler, false);
  if ('ontouchstart' in window) {
    elementGridCell.addEventListener("touchstart", function() {
        const touchHndl = function() {
            //call the clickHandler actually
            clickHandler();
            //remove the touchend handler after perform
            this.removeEventListener(touchHndl)
        }
        //attach a handler for touch end when you are in touchstart event
        this.addEventListener(touchHndl);
    },  {passive: true});
  }
}

function createElementExpanded(periodicElement, elementExpanded) {
  const { atomicNumber, name } = periodicElement;
  elementExpanded.textContent = '';
  elementExpanded.style.display = 'grid';
  const periodicTable = document.getElementById('periodic-table');
  periodicTable.style.position = 'relative';
  periodicTable.style.top = '325px';
  const header = document.getElementById('header');
  header.style.display = 'none';
  
  const aElement = createA('a', 'periodic-element__expanded-url', 'periodic-element__expanded-url', elementExpanded, name);
  const image = createDOMImage('img', 'periodic-element__expanded-image', 'periodic-element__expanded-image',
  aElement, atomicNumber, `assets/images/${periodicElement.webAttributes.image}`, 250);
   
  const elementDescription = createDOMElement('div', 'periodic-element__expanded-description',
    'periodic-element__expanded-description', elementExpanded);

  if (width > 600) {
    createInfoDivs(periodicElement.basics, elementDescription, atomicNumber, '-basics');
    createInfoDivs(periodicElement.groupings, elementDescription, atomicNumber, '-groupings');
    createInfoDivs(periodicElement.arrangements, elementDescription, atomicNumber, '-arrangements');
    createInfoDivs(periodicElement.painting, elementDescription, atomicNumber, 
      '-painting');
    createDOMElement('div', 'periodic-element__expanded-blank', 'periodic-element__expanded-blank', 
      elementDescription);
    createDOMElement('div', 'periodic-element__expanded-close', 'periodic-element__expanded-close', 
      elementDescription,'<h2>X</h2>', closeElementExpanded, name);
  } else {
    createInfoDivs(periodicElement.basics, elementDescription, atomicNumber, '-basics');
    createInfoDivs(periodicElement.short, elementDescription, atomicNumber, '-short');
    createInfoDivs(periodicElement.painting, elementDescription, atomicNumber, '-painting');
  }


}

function touchHandler() {
    const touchHndl = function() {
        //call the clickHandler actually
        clickHandler();
        //remove the touchend haldler after perform
        this.removeEventListener(touchHndl)
    }
    //attach a handler for touch end when you are in touchstart event
    this.addEventListener('touchstart', touchHndl, {passive: true});
    return;
}

function addTableClickHandler(elementGridCell, elementBody, periodicElement) {
  const clickHandler = () => {
    const elementExpanded = document.getElementsByClassName('periodic-element__expanded')[0];
    createElementExpanded(periodicElement, elementExpanded);
  }
  elementGridCell.addEventListener('click', clickHandler, false);
  if ('ontouchstart' in window) elementGridCell.addEventListener("touchstart", touchHandler, {passive: true});
  return;
  return;
}

function backgroundColorFilter(groupBlock) {
  const groupBlockLower = groupBlock.toLowerCase();
  const series = {
    'alkali metal': '#ce9882',
    'alkaline earth metal': '#cea9a7',
    'lanthanoid': '#72102a',
    'actinoid': '#70515e',
    'transition metal': '#4b3832',
    'post-transition metal': '#898989',
    'metalloid': '#1b85b8',
    'nonmetal': '#1a472a',
    'noble gas': '#1a2c4d',
  }[groupBlockLower];
  return series || '';
}
// #ffdc73
// #e1cfb7

function createElements(elementContainer, elementBody) {
  periodicTableData.map((element) => {
    const elementGridCell = document.getElementById(`c${element.webAttributes.tablecolumncol}-r${element.webAttributes.tablerowcol}`);
    elementGridCell.style.backgroundColor = backgroundColorFilter(element.groupBlock);
    elementGridCell.className = 'periodic-element';
    addTableClickHandler(elementGridCell, elementBody, element);

    createDOMElement('div', 'atomicnumber', `atomicnumber__${element.atomicNumber}`, elementGridCell, element.atomicNumber);
    createDOMElement('div', 'symbol', `symbol__${element.symbol}`, elementGridCell, element.symbol);
    // (elementType, className, idName, parent, elementName, image, width)
    createDOMImage('img', 'image', `image__${element.symbol}`, elementGridCell,
      `${element.atomicnumber}_${element.name}`, `assets/images/thumbs/${element.webAttributes.image}`, 140);

    return elementGridCell;
  });
}

function leftHandler(elementExpanded, elementAtomicNumber, atomicNumber) {
  if (!atomicNumber) return createElementExpanded(periodicTableData[0], elementExpanded);
  if (atomicNumber === '1') return createElementExpanded(periodicTableData[117], elementExpanded);
  const index = parseInt(atomicNumber, 10) - 2;
  return createElementExpanded(periodicTableData[index], elementExpanded);
}

function rightHandler(elementExpanded, elementAtomicNumber, atomicNumber) {
  if (atomicNumber === '118' || !atomicNumber) return createElementExpanded(periodicTableData[0], elementExpanded);
  return createElementExpanded(periodicTableData[atomicNumber], elementExpanded);
}

function scrollList() {
  document.onkeydown = (event) => { // listen to keyboard events
    const elementExpanded = document.getElementById('periodic-element__expanded');
    const elementAtomicNumber = document.getElementById('periodic-element__expanded-atomicNumber');
    const atomicNumber = (elementAtomicNumber) ? elementAtomicNumber.innerHTML : null;

    const callback = {
      ArrowLeft: leftHandler,
      ArrowRight: rightHandler,
      left: leftHandler,
      right: rightHandler,
    }[event.key];
    callback?.(elementExpanded, elementAtomicNumber, atomicNumber);
  };
}

function makeRows(elementContainer, cols, rows) {
  for (let row = 1; row <= rows; row += 1) {
    for (let col = 1; col <= cols; col += 1) {
      createDOMElement('li', 'grid', `c${col}-r${row}`, elementContainer);
    }
  }
}

function createGrid() {
  const elementBody = document.getElementsByTagName('body')[0];

  const elementContainer = createDOMElement('container', 'container', 'container', elementBody);

  createDOMElement('div', 'periodic-element__expanded', 'periodic-element__expanded', elementContainer, periodicTablePoem);

  const elementPeriodicTable = createDOMElement('ul', 'periodic-table', 'periodic-table', elementContainer);

  makeRows(elementPeriodicTable, 18, 9);
  
  const headerTxt = `<h2>ROSE'S PERIODIC TABLE PAINTINGS</h2>`;
  const elementHeader = createDOMElement('header','header','header',elementPeriodicTable,headerTxt);
  
  const elementElements = createElements(elementPeriodicTable, elementBody);
  scrollList();
  return elementElements;
}

createGrid();