import { Song } from "../songs/song.model"
import { Verse } from "../verses/verse.model"

export interface Sermon {
    sermonId: number,
    title: string,
    date: Date,
    summary: string,
    songs: Song[],
    verses: Verse[]
}