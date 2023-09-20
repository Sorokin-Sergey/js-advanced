import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './favorites-list.css';

export class FavoritesList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        // this.el.classList.add('card_list');
        this.el.innerHTML = `
            <h1>В избранном - ${this.appState.favorites.length}</h1>
        `;
        const cardGrid = document.createElement('div');
        cardGrid.classList.add('card_grid');
        for (const card of this.appState.favorites) {
            cardGrid.append(new Card(this.appState, card).render());
        }
        this.el.append(cardGrid);
        return this.el;
    }
}