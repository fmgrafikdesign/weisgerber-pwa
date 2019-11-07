/* Suggests a POI based on location data */
import m from "mithril";
import State from "../state";
import SuggestionCard from "./SuggestionCard";
import Appsettings from "../settings/appsettings";
import * as Mithril from "mithril";

/* Difference between hiding and dismissing:
Dismissing requires active user-interaction by clicking on either the card or the x of the card.
It means this suggestion will not come up anymore before the user has visited at least one other POI.
Hiding just means the user walks out of reach for the suggestion to be relevant.
 */

const Suggestion = {
        show: false,
        suggest: (id: number) => {
            // If it's the same id as currently and it's already being show, abort
            if (Suggestion.id === id && Suggestion.show) return;

            // If it's the same id as before and it has been dismissed, abort
            if (Suggestion.id === id && Suggestion.dismissed) return;

            Suggestion.showSuggestion(id);
        },
        showSuggestion: (id: any) => {
            if (id) Suggestion.id = id;
            Suggestion.show = true;
            console.log(Suggestion.id, Suggestion.show);
            m.redraw();
        },
        hideSuggestion: () => {
            Suggestion.show = false;
        },
        dismissSuggestion: (e?: Event) => {
            // Hide the suggestion card and dismiss this suggestion.
            Suggestion.dismissed = true;
            Suggestion.hideSuggestion();

            // Stop the click from bubbling.
            if(e) { e.stopPropagation(); }
        },
        id: -1,
        dismissed: false,
        view: (vnode: Mithril.Vnode) => {
            const poi = State.points_of_interest.find((poi:any) => {
                return parseInt(poi.id) === Suggestion.id;
            });

            if (!poi) { return; }

            return m('.suggestion', {class: Suggestion.show ? 'show-suggestion' : 'hide-suggestion'},
                m(SuggestionCard, {
                        dismiss: Suggestion.dismissSuggestion,
                        onclick: () => {
                            m.route.set(Appsettings.poi_route + '/' + Suggestion.id);
                            Suggestion.dismissSuggestion();
                        },
                        poi: poi
                    }
                )
            )
        }
    }
;

export default Suggestion;