export default class MenuMobile {
    constructor(menuBtn, menuList, closeBtn) {
        this.menuBtn = document.querySelector(menuBtn);
        this.menuList = document.querySelector(menuList);
        this.closeBtn = document.querySelector(closeBtn);
        this.active = 'ativo';
    }
    openMenu() {
        this.menuList.classList.add(this.active);
        this.menuList.firstElementChild.classList.add(this.active);
        setTimeout(() => this.addEventOutsideClick()); 
    }
    closeMenu() {
        this.menuList.classList.remove(this.active);
        this.menuList.firstElementChild.classList.remove(this.active)
    }
    addEventClick() {
        this.menuBtn.addEventListener('click', this.openMenu);
        this.closeBtn.addEventListener('click', this.closeMenu);
    }
    outsideClick(event) {
        if (!this.menuList.contains(event.target)) {
             this.closeMenu();
             this.removeEventOutsideClick();
        }
    }
    addEventOutsideClick() {
        window.addEventListener('click', this.outsideClick);
    }
    removeEventOutsideClick() {
        window.removeEventListener('click', this.outsideClick);
    }
    bindEvents() {
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.outsideClick = this.outsideClick.bind(this);
    }
    init() {
        this.bindEvents();
        this.addEventClick();
        return this;
    }
}