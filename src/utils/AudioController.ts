class AudioController {
    private dataSource!: string;
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
        await this.audioSourceMap[src].play();
    }
}

export default AudioController;
