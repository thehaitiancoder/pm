import { Url } from "url";

export class Lyric {
    author: String = null;
    title: String= null;
    singer: String = null;
    lyrics: String = null;
    featurer1: String = null;
    featurer2: String = null;
    featurer3: String = null;
    featurer4: String = null;
    featurer5: String = null;
    featurer6: String = null;
    released_date: Date = null;
    album: String = '';
    category?: String = '';
    soundcloud: Url = null;
    youtube: Url = null;
}