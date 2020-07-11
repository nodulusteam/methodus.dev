const replace = require('replace-in-file');
const path = require('path');
const libPath = 'modules/framework/decorators';

const replaceRegex = new RegExp(/\]\([A-z].+/g);
const options = {
  files: path.join(process.cwd(), `../../../docs/${libPath}/**/*.md`),
  from: replaceRegex,
  to: (match) => { 
    return match.replace('](', `](${libPath}/`);
  }

};
try {
  const results = replace.sync(options);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}