[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-throng&metric=alert_status)](https://sonarcloud.io/dashboard?id=nodulusteam_-methodus-throng)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-throng&metric=coverage)](https://sonarcloud.io/dashboard?id=nodulusteam_-methodus-throng)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=nodulusteam_-methodus-throng&metric=bugs)](https://sonarcloud.io/dashboard?id=nodulusteam_-methodus-throng)


[![Total alerts](https://img.shields.io/lgtm/alerts/g/nodulusteam/-methodus-throng.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/nodulusteam/-methodus-throng/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/nodulusteam/-methodus-throng.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/nodulusteam/-methodus-throng/context:javascript)

## Throng

**Throng** decorators enable *caching & throttling* of class methods in your app.

> *meaning:* a large, densely packed crowd of people or animals.
> "he pushed his way through the throng"


An unintrusive approach for cache and throttle, that can be applied any where in a typescript application.



### Install
`npm i @methodus/throng`


### Usage
```javascript
import {Cache, Throttle} from '@methodus/throng';

export class TestClass{

    @Cache(120, 2) // 120 is the cache TTL, 2 is the number of concurrent executions for the expire rerun
    public async cacheMethod(key1:string, key2:string: ){
        /// function code
        return;
    }

    @Throttle(3) // 3 in the number of concurrent operations
    public async throttledMethod(){
        /// function code
        return;
    }

    @Cache(120) // 120 is the cache TTL
    @Throttle(3) // 3 in the number of concurrent operations
    public async combinedMethod(){
        /// function code
        return;
    }

}
```


 ```javascript
@Cache( ttlTime: number, 
        reloadThrottleLimit: number,
        keyLength?: number | Function, 
        setCacheFunction?: Function,
        filterCacheFunction?: Function )
```
#### ttlTime
Time in seconds until records expire.

#### reloadThrottleLimit
A number value or a function returning it for the amount of concurrent executions when refreshing the cache record.

#### keyLength
A number value or a function returning a string key to be used as the cache item key. If a number is returned it will be used as the amount of arguments to take from the function args for the creation of the key hash.


#### setCacheFunction
the return value of the function will be stored in the cache, if `false` is returned nothing will be stored in cache.

```javascript
@Cache(120, 2, ,2 , (data)=>{ return somenewData }) 
    public async cacheMethod(key1:string, key2:string: ){
        /// function code
        return;
    }

```

#### filterCacheFunction
This function will be called before the cache item check, if it return false, the entire cache operation will be skipped (no-cache)

```javascript
@Cache(120, 2, 2 ,null,  (args)=>{ return args[2] // arg2 is the 3 argument of the decorated function }) 
    public async cacheMethod(key1:string, key2:string, useCache: boolean ){
        /// function code
        return;
    }

```


### **@Throttle**( **limit**: *number*)

#### limit
Time limit for concurrent execution of the method.


### Global throttle limit
By default Throttle uses a global limit object, if you wish to have seperated queues disable the default by passing:
`THROTTLE_GLOBALLY` with the value `false`


### Debug
set "DEBUG" env variable to:
```bash
methodus:throng:*
methodus:throng:cache
methodus:throng:throttle
```


### Env Options
`CACHE_CHECK_PERIOD`:number - the interval for cache expiry check.

`CACHE_DELETE_ON_EXPIRE`=true: boolean-string  - whether to delete the objects as they expire. 

`CACHE_RELOAD_ON_EXPIRE`=false:  boolean-string - whether to execute the original function at the end of TTL.

`CACHE_USE_CLONES`=true: boolean-string - whether to use the original objects in the cache collection or make copies.

`THROTTLE_GLOBALLY`=true: boolean-string - use a global limit for all decorated methods (throttle);


> *boolean-string* means 'true' | 'false'

### Disable
pass `THRONG_OFF` to completly disable