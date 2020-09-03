class AudioController {
    private dataSource!: string;
    private currentPlayingSound?: string;
    private audioSourceMap: {[soundName: string]: HTMLAudioElement} = {};

    constructor(dataSource: string) {
        this.setDataSource(dataSource.replace(/\/$/, ''));
    }

    setDataSource(dataSource: string) {
        if (!dataSource) {
            throw new Error('dataSource must be present');
        }

        this.dataSource = dataSource;
    }

    load(src: string) {
        this.audioSourceMap[src] = new Audio(`${this.dataSource}/${src}`);
    }

    include(src: string) {
        return !!this.audioSourceMap[src];
    }

    async play(src: string) {
        this.pause();

        this.currentPlayingSound = src;
        await this.audioSourceMap[src].play();
    }

    pause(src?: string) {
        const target =
            (src && this.audioSourceMap[src]) ||
            (this.currentPlayingSound && this.audioSourceMap[this.currentPlayingSound]);

        if (target) {
            target.pause();
            target.currentTime = 0;
        }
    }
}

export default AudioController;
