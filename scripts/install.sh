cd modules
cd framework-commons
pwd
yarn install
yarn link
cd ..
cd framework-injection
pwd
yarn install
yarn link
cd ..
cd framework-decorators
pwd
yarn install
yarn link
cd ..
cd server
pwd
yarn install
yarn link
cd .. 
cd methodus-cli
pwd
yarn install
cd .. 
cd platform-rest
pwd
yarn install
yarn link
cd .. 
cd platform-express
pwd
yarn install
yarn link
cd .. 
cd platform-socketio
pwd
yarn install
yarn link
cd ..  
cd tests-integrations
pwd
yarn install
cd ..  
cd testing
pwd
yarn install
cd .. 
cd methodus-contracts
pwd
yarn install
cd ../.. 
yarn link @methodus/framework-commons
yarn link @methodus/framework-injection
yarn link @methodus/framework-decorators
yarn link @methodus/server
yarn link @methodus/platform-express
yarn link @methodus/platform-rest
yarn link @methodus/platform-socketio