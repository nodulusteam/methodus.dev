
import { Simple } from '@client-contracts/simple';
import { Models } from '@client/models';
// import { Inherit } from '@client/inherit';

(async () => {
    setTimeout(async () => {
        const result = await Simple.get('1111');
        console.log(result);
    }, 1000 * 10);

    setTimeout(async () => {
        const result1 = await Models.get('1111');
        console.log(result1);
    }, 5000);


})();
