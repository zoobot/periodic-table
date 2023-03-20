// const { inspect } = require('util');
const data1 = require('./data1');
const data2 = require('./data2');
const data3 = require('./data3');

function joinData() {
  const data = data1.map((element, index) => {
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

    elementNew.painting = {
      medium: element.medium,
      diameter: `${element.diameter} ft.`,
      done: JSON.stringify(element.done)
    };

    elementNew.groupings = {
      // category: elementNew.category,
      groupBlock: elementNew.groupBlock,
      bondingType: elementNew.bondingType,
      standardState: elementNew.standardState,
      stateOfMatter: elementNew.stateOfMatter,
      atomicMass: elementNew.atomicMass.toString(),
      atomicWeight: elementNew.atomicWeight,
      atomicWeightFull: elementNew.atomicWeightFull,
      density: elementNew.density,
      atomicRadius: elementNew.atomicRadius,
      vanDelWaalsRadius: elementNew.vanDelWaalsRadius,
      ionRadius: elementNew.ionRadius,
      meltingPoint: elementNew.meltingPoint,
      boilingPoint: elementNew.boilingPoint,
    };

    elementNew.arrangements = {
      electronicShellArrangement: data3[index][5],
      electronicConfigurationShort: elementNew.electronicConfiguration,
      electronicConfigurationFull: data3[index][4],
      oxidationStates: elementNew.oxidationStates,
      ionizationEnergy: elementNew.ionizationEnergy,
      electronAffinity: elementNew.electronAffinity,
      electronegativity: elementNew.electronegativity,
      group: elementNew.group,
      period: elementNew.period,
      block: elementNew.block,
    };

    elementNew.short = {
      Mass: elementNew.atomicMass.toString(),
      Melting: elementNew.meltingPoint,
      Boiling: elementNew.boilingPoint,
      Shell: data3[index][5],
      Configuration: elementNew.electronicConfiguration,
      Series: elementNew.groupBlock,
      State: elementNew.standardState,
    };

    return elementNew;
  });
  return data;
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
