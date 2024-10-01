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
        if (this.page === 'technology') this.resizeImg();
    }
    async fetchInfo(index) {
        const pageResponse = await fetch('./data.json');
        const pageJSON = await pageResponse.json();
        const pageAcive = pageJSON[this.page];
        return (pageAcive[index]);
    }
    resizeImg(event) {
        const img = document.querySelector('#img-dinamica');
        let imgSrc = img.src;
        let imgLandscape = imgSrc.replace(/portrait/g,'landscape');
        let imgPortait = imgSrc.replace(/landscape/g,'portrait');
        if (window.innerWidth <= 800) img.src = imgLandscape
        else img.src = imgPortait
    }
    addEventClick() {
        this.links.forEach((link,index) => link.addEventListener('click',(event) => this.handleClick(event,index)));
    }
    addResizeEvent() {
        window.addEventListener('resize', this.resizeImg);
    }
    bindEvents() {
        this.handleClick = this.handleClick.bind(this);
        this.resizeImg = this.resizeImg.bind(this);
    }
    init() {
        this.bindEvents();
        this.datasetValue();
        this.addEventClick();
        return this;
    }
}




