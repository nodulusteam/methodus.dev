const replace = require('replace-in-file');
const path = require('path');
const libPath = 'modules/framework/common';

const replaceRegex = new RegExp(/\]\([A-z].+/g);
const options = {
  files: path.join(process.cwd(), `../../../docs/${libPath}/**/*.md`),
  from: replaceRegex,
  to: (match) => {
    if (match.indexOf('#') > -1) {
      const split = match.split('#');    
      return `](#${split[1]}`;
    } else {
      return match.replace('](', `](${libPath}/`);
    }
  }
};
try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}