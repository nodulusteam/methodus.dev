import * as posts from './posts.json';
// import * as photos from './photos.json';



export class DB {
    public static getPosts(filter: any = {}, pageNumber: number = 1, pageSize: number = 25) {
        const filterkey = Object.keys(filter)[0];
        let list = Object.values(posts);
        if (filter && filterkey) {
            list = list.filter((item) => { return item[filterkey] === filter[filterkey]; });
        }
        list = list.slice((pageNumber * pageSize) - pageSize, pageSize);
        return list;
    }

    // public static getPhotos(filter: any, pageNumber: number, pageSize: number) {

    //     const filterkey = Object.keys(filter)[0];


    //     let list = photos;
    //     if (filter && filterkey) {
    //         list = list.filter((item) => { return item[filterkey] === filter[filterkey]; });
    //     }

    //     list = list.slice((pageNumber * pageSize) - pageSize, pageSize);
    //     return list;
    // }
}