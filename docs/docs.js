const replace = require('replace-in-file');
const path = require('path');
const libPath = process.argv[2];
const fs = require('fs');
{
    const replaceRegex = new RegExp(/\]\([A-z].+/g);
    const options = {
        files: path.join(process.cwd(), `../../../docs/${libPath}/**/*.md`),
        from: replaceRegex,
        to: (match) => {
            if (match.indexOf('#') > -1) {
                const split = match.split('#');
                return `](#${split[1]}`;
            } else {
                return match.replace('](', `](/${libPath}/`);
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
// {
//     const options = {
//         files: path.join(process.cwd(), `../../../docs/${libPath}/**/*.md`),
//         from: '[Globals](../globals.md)',
//         to: (match) => {
//             return match.replace('[Globals](../globals.md)', `[Globals](/${libPath}/globals.md)`);
//         }
//     };
//     try {
//         replace.sync(options);
//     }
//     catch (error) {
//         console.error('Error occurred:', error);
//     }
// }
{

    // load package.json for the package
    const pkg = require(path.join(process.cwd(), 'package.json'));

    if (pkg.docs && pkg.docs.content) {
        const destinationPath = path.join(process.cwd(), `../../../docs/${libPath}/`);
        pkg.docs.content.forEach((file) => {
            const filename = file.substr(file.lastIndexOf('/') + 1);

            tryToCopy(path.join(process.cwd(), file), path.join(destinationPath, filename));
        });
    }

}

function tryToCopy(from, to) {
    try {
        fs.copyFileSync(from, to);
        console.log('docs copy files', from, to);
    } catch (error) {
        console.error(error)
        // throw error;
    }
}
