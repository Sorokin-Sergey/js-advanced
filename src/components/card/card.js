import { DivComponent } from '../../common/div-component';
import './card.css';

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            b => b.key != this.cardState.key
        );
    }

    render() {
        this.el.classList.add('card');
        const existsInFavorites = this.appState.favorites.find(b => b.key == this.cardState.key);
        this.el.innerHTML = `
            <div class="card__image">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка" />
            </div>
            <div class="card__info">
                <div class="card__tag">
                    ${this.cardState.subject ? this.cardState.subject[0] : 'Не задано'}
                </div>
                <div class="card__name">
                    ${this.cardState.title}
                </div>
                <div class="card__author">
                    ${this.cardState.author_name ? this.cardState.author_name[0] : 'Не задано'}
                </div>
                <div class="card__footer">
                    <button class="button__add ${existsInFavorites ? 'button__active' : ''}">
                        ${existsInFavorites 
                            ? '<img src="/static/img/favorites.svg" alt="Убрать из избранного" />' 
                            : '<img src="/static/img/favorite-white.svg" alt="Добавить в избранное" />'}
                    </button>
                </div>
            </div>
        `;
        const button = this.el.querySelector('.button__add');
        button.addEventListener('click', () => {
            const existsInFavorites = this.appState.favorites.find(b => b.key == this.cardState.key);
            if (!existsInFavorites) {
                this.#addToFavorites();
            } else {
                this.#deleteFromFavorites();
            }
        });
        return this.el;
    }
}