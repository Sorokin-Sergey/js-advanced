import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';
import { Search } from '../../components/search/search';
import { CardList } from '../../components/card-list/card-list';

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
        numFound: 0
    };

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.render();
        }
    }

    async stateHook(path) {
        if (path == 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
        }
        if (path == 'loading' || path == 'list') {
            this.render();
        }
    }

    render() {
        const main = document.createElement('div');
        this.app.innerHTML = '';
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
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

    async loadList(q, offset) {
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
        return res.json();
    }
}