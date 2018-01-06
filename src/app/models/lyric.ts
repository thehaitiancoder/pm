import { Url } from "url";

export class Lyric {
    author: String = null;
    title: String= null;
    lyrics: String = null;
    singer: String = null;
    featuring: String = null;
    released_date: Date = null;
    album: String = null;
    category?: String = 'Mond';
    soundcloud: Url = null;
    youtube: Url = null;
    url : String = null;
    views: Number = 0;
    verified: Boolean = false;
    verifier: String= null;
    clipart: String = null;
    certified: String = null;
}