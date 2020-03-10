import { WebRequest } from "../web-request";
import { Verbs } from "../verbs";
const TESTBASE = "https://www.mocky.io/v2/5185415ba171ea3a00704eed";
(async () => {
  const request = new WebRequest();

  //send get
  const resultGet = await request.sendRequest(
    Verbs.Get,
    `${TESTBASE}/posts/:postid`,
    [1],
    [{ index: 0, name: "postid", from: "params" }]
  );

  console.log(resultGet);

  // send Post
  const resultPost = await request.sendRequest(
    Verbs.Post,
    `${TESTBASE}/posts/`,
    [{ id: 1, userid: 1 }],
    [{ index: 0, from: "body" }]
  );
  console.log(resultPost);
  // // send Post
  // const result = await request.sendRequest(
  //     Verbs.Post,
  //     `${TESTBASE}/posts/:postid`,
  //     [
  //       1,
  //       {
  //         id: 1,
  //         userid: 1
  //       }
  //     ],
  //     [
  //       { index: 0, name: 'postid', from: 'params' },
  //       { index: 1, from: 'body' }
  //     ]
  //   );
})();
