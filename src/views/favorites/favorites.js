import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { FavoritesList } from '../../components/favorites-list/favorites-list';

export class FavoritesView extends AbstractView {
    state = {
        list: [],
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Избранное');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.render();
        }
    }

    render() {
        const main = document.createElement('div');
        this.app.innerHTML = '';
        main.append(new FavoritesList(this.appState, this.state).render());
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        if (this.app.querySelector('.header_container')) {
            this.header = this.app.querySelector('.header_container');
        } else {
            const headerEl = document.createElement('div');
            headerEl.classList.add('header_container');
            this.app.prepend(headerEl);
            this.header = this.app.querySelector('.header_container');
        }
        const header = new Header(this.appState).render();
        this.header.innerHTML = '';
        this.header.append(header);
    }
}