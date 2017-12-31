import { Url } from "url";

export class Lyric {
    author: String = null;
    title: String= null;
    singer: String = null;
    lyrics: String = null;
    featurer= {one: null, two: null, three: null, four: null, Five: null, six: null, seven: null, eight: null, nine: null, ten: null};
    released_date: Date = null;
    album: String = null;
    category?: String = 'Mond';
    soundcloud: Url = null;
    youtube: Url = null;
    url : String = null;
    views: Number = 0;
}