import { Builder } from '../build.functions';
import * as path from 'path';
import { BuildOptions } from '../builder-models/interfaces';


const all = ['grpc'];
all.forEach(async (contract) => {

    const options = new BuildOptions(false, false);
    options.isProtobuf = true;
    process.argv[2] = `/build_vars/${contract}/build.json`;
 
    process.chdir(path.join(__dirname, '..', '..'));// reset the cwd, since it changes when generating cotracts
    // path.join(process.cwd(), `/build_vars/${contract}/build.json`)

    const result = await Builder(options);

});
