export default class Slide {
    constructor(links, datasets, page, imgtype) {
        this.links = [...document.querySelectorAll(links)];
        this.dataset = [...document.querySelectorAll(datasets)];
        this.page = page;
        this.imgtype = imgtype || 'png';
    }
    datasetValue() {
        this.datasetValue = this.dataset.map((element) => {
            return {
                element: element,
                dataset: element.dataset.detail
            }
        });
    }
    changeValue(pageContent) {
        this.datasetValue.forEach((datasetObject) => {
            const campo = datasetObject.dataset;
            const images = 'images';
            if (pageContent[campo] && campo === images) {
                const imgContent = pageContent[images]
                datasetObject.element.src = imgContent[this.imgtype];
            } else if (pageContent[campo]) datasetObject.element.innerHTML = pageContent[campo];
        })
    }
    activeClass(target) {
        this.links.forEach((link) => {
            link.classList.remove('ativo');
        })
        target.classList.add('ativo');
    }
    async handleClick(event,index) {
        event.preventDefault();
        const pageContent = await this.fetchInfo(index);
        this.changeValue(pageContent);
        this.activeClass(event.target);
    }
    async fetchInfo(index) {
        const pageResponse = await fetch('./data.json');
        const pageJSON = await pageResponse.json();
        const pageAcive = pageJSON[this.page];
        return (pageAcive[index]);
    }
    addEventClick() {
        this.links.forEach((link,index) => link.addEventListener('click',(event) => this.handleClick(event,index)));
    }
    bindEvents() {
        this.handleClick = this.handleClick.bind(this);
    }
    init() {
        this.bindEvents();
        this.datasetValue();
        this.addEventClick();
        return this;
    }
}




