import { Url } from "url";

export class Lyric {
    author: String = null;
    title: String= null;
    lyrics: String = null;
    singerOnPage = null; // this is to be linked to the singer field of the form
    singer: String = null; // this is to be sent to the db
    released_date: Date = null;
    carnival_year: String= '2000'; // this is to presented to the user if the category is "Kanaval"
    album: String = null;
    category: String = 'Mond';
    soundcloud: Url = null;
    youtube: Url = null;
    url : String = null;
    views: Number = 0;
    verified: Boolean = false;
    verifier: String= null;
    clipart: String = "./assets/clipart/album-cover.png";
    certified: String = null;
    feat = [];
}