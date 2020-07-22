const replace = require('replace-in-file');
const path = require('path');
const libPath = process.argv[2];
{
    console.log(path.join(process.cwd(), `../../../docs/${libPath}/**/*.md`));
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
        replace.sync(options);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }
}
{
    const options = {
        files: path.join(process.cwd(), `../../docs/${libPath}/**/*.md`),
        from: '[Globals](../globals.md)',
        to: (match) => {
            return match.replace('[Globals](../globals.md)', `[Globals](${libPath}/globals.md)`);
        }
    };
    try {
        replace.sync(options);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }

}
