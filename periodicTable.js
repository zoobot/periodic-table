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

// const width = window.innerWidth
//   || document.documentElement.clientWidth
//   || document.body.clientWidth;
// const height = window.innerHeight
//   || document.documentElement.clientHeight
//   || document.body.clientHeight;

// function createWikiUrl(element) {
//   return `https://en.wikipedia.org/wiki/${periodictabledata[element]}`;
// }

function createDOMElement(elementType, className, idName, parent,
  elementItem, eventListener, elementName, image) {
  const domElement = (elementType) ? document.createElement(elementType) : elementName;
  if (className) domElement.className = className;
  if (idName) domElement.id = idName;
  if (eventListener) domElement.addEventListener('click', eventListener.bind(this));
  if (elementItem) domElement.innerHTML += elementItem;
  if (image) domElement.src = image;
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

function createElementExpanded(periodicElement, elementExpanded) {
  const { atomicNumber } = periodicElement;
  elementExpanded.textContent = '';
  elementExpanded.style.display = 'grid';
  const periodicTable = document.getElementById('periodic-table');
  periodicTable.style.position = 'relative';
  periodicTable.style.top = '255px';
  createDOMElement('img', 'periodic-element__expanded-image', 'periodic-element__expanded-image',
    elementExpanded, null, null, atomicNumber, `assets/images/${periodicElement.webAttributes.image}`);

  const elementDescription = createDOMElement('div', 'periodic-element__expanded-description',
    'periodic-element__expanded-description', elementExpanded);

  createInfoDivs(periodicElement.basics, elementDescription, atomicNumber, '-basics');
  createInfoDivs(periodicElement.groupings, elementDescription, atomicNumber, '-groupings');
  createInfoDivs(periodicElement.arrangements, elementDescription, atomicNumber, '-arrangements');
}

function addClickHandler(elementGridCell, elementBody, periodicElement) {
  elementGridCell.addEventListener('click', () => {
    const elementExpanded = document.getElementsByClassName('periodic-element__expanded')[0];
    createElementExpanded(periodicElement, elementExpanded);
  }, false);
}

function createElements(elementContainer, elementBody) {
  periodicTableData.map((element) => {
    const elementGridCell = document.getElementById(`c${element.webAttributes.tablecolumncol}-r${element.webAttributes.tablerowcol}`);
    elementGridCell.style.backgroundColor = element.webAttributes.cpkHexColor;
    elementGridCell.className = 'periodic-element';
    addClickHandler(elementGridCell, elementBody, element);

    createDOMElement('div', 'atomicnumber', `atomicnumber__${element.atomicNumber}`, elementGridCell, element.atomicNumber);
    createDOMElement('div', 'symbol', `symbol__${element.symbol}`, elementGridCell, element.symbol);
    createDOMElement('img', 'image', `image__${element.symbol}`, elementGridCell,
      null, null, element.name, `assets/images/${element.webAttributes.image}`);

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
  const elementElements = createElements(elementPeriodicTable, elementBody);
  scrollList();
  return elementElements;
}

createGrid();
