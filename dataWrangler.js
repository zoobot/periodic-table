// const { inspect } = require('util');
const data1 = require('./data1');
const data2 = require('./data2');

function joinData() {
  const data3 = data1.map((element, index) => {
    const elementNew = { ...element, ...data2[index] };
    elementNew.webAttributes = {
      tablerowcol: elementNew.tablerowcol,
      tablecolumncol: elementNew.tablecolumncol,
      visible: elementNew.visible,
      cpkHexColor: elementNew.cpkHexColor,
      image: `${String(elementNew.atomicNumber).padStart(3, '0')}_${elementNew.name.toLowerCase()}.jpg`,
    };
    delete elementNew.tablerowcol;
    delete elementNew.tablecolumncol;
    delete elementNew.visible;
    delete elementNew.cpkHexColor;

    elementNew.basics = {
      name: elementNew.name,
      atomicNumber: elementNew.atomicNumber,
      symbol: elementNew.symbol,
    };

    elementNew.groupings = {
      groupBlock: elementNew.groupBlock,
      bondingType: elementNew.bondingType,
      standardState: elementNew.standardState,
      stateOfMatter: elementNew.stateOfMatter,
      oxidationStates: elementNew.oxidationStates,
      ionizationEnergy: elementNew.ionizationEnergy,
      electronAffinity: elementNew.electronAffinity,
      electronegativity: elementNew.electronegativity,
      meltingPoint: elementNew.meltingPoint,
      boilingPoint: elementNew.boilingPoint,
    };

    elementNew.arrangements = {
      atomicMass: elementNew.atomicMass,
      atomicWeight: elementNew.atomicWeight,
      atomicWeightFull: elementNew.atomicWeightFull,
      atomicRadius: elementNew.atomicRadius,
      ionRadius: elementNew.ionRadius,
      density: elementNew.density,
      electronicConfiguration: elementNew.electronicConfiguration,
      group: elementNew.group,
      period: elementNew.period,
      block: elementNew.block,
      vanDelWaalsRadius: elementNew.vanDelWaalsRadius,
    };

    return elementNew;
  });
  console.log('const periodicTableData =');
  console.dir(data3, { maxArrayLength: null });
  return data3;
}

joinData();

// {
//   name: 'Oganesson',
//   atomicNumber: 118,
//   symbol: 'Og',
//   category: 'Unknown',
//   atomicWeight: '[294]',
//   atomicWeightFull: '-',
//   occurrence: 'Unknown',
//   stateofmatter: 'Synthetic',
//   group: 18,
//   period: 7,
//   block: 'p',
//   tablerowcol: 7,
//   tablecolumncol: 18,
//   visible: true,
//   atomicMass: [294],
//   cpkHexColor: '',
//   electronicConfiguration: '[Rn] 5f14 6d10 7s2 7p6',
//   electronegativity: '',
//   atomicRadius: '',
//   ionRadius: '',
//   vanDelWaalsRadius: '',
//   ionizationEnergy: '',
//   electronAffinity: '',
//   oxidationStates: '',
//   standardState: '',
//   bondingType: '',
//   meltingPoint: '',
//   boilingPoint: '',
//   density: '',
//   groupBlock: 'noble gas',
//   yearDiscovered: 2002,
//   webAttributes: {}
// },
