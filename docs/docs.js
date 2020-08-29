const replace = require('replace-in-file');
const path = require('path');
const fs = require('fs');
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
    // const options = {
    //     files: path.join(process.cwd(), `../../docs/${libPath}/**/*.md`),
    //     from: '[Globals](../globals.md)',
    //     to: (match) => {
    //         return match.replace('[Globals](../globals.md)', `[Globals](${libPath}/globals.md)`);
    //     }
    // };
    // try {
    //     replace.sync(options);
    // }
    // catch (error) {
    //     console.error('Error occurred:', error);
    // }

    const destinationPath = path.join(process.cwd(), `../../../docs/${libPath}/`);
    try {
        console.log(`looking for ${path.join(process.cwd(), 'readme.md')}`);
        fs.copyFileSync(path.join(process.cwd(), 'readme.md'), path.join(destinationPath, 'readme.md'));
    } catch (error) {
        console.error(`${destinationPath} is not built, run yarn build first.`);
        console.error(error);
    }

}
