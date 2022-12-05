import { URL } from "../models/Url.model";

// Create operation

export const createURL = async (url: string, shortUrl: string) => {
    try {
        console.log(url);
        console.log(shortUrl);

        const newURL = await URL.create({
            url, 
            shortUrl,
        })

        return`${process.env.HOST}/url/${newURL?.shortUrl}`
    } catch (error) {
        console.error(error);
    }
}

export const getURL = async (shortUrl: string) => {
    try {
        const newURL = await URL.findOne({
           where: {
                shortUrl,
           } ,
        })

        return newURL?.url;
    } catch (error) {
        console.error(error);
    }
}