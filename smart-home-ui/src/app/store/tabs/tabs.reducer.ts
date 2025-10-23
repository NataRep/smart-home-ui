import { createReducer, on } from '@ngrx/store';
import { Tab } from '../../models/api.model';
import * as TabsActions from './tabs.actions';

export interface TabsState {
  tabs: Tab[];
}

export const initialState: TabsState = {
  tabs: [],
};

export const tabsReducer = createReducer(
  initialState,

  on(TabsActions.addTab, (state, { title }) => ({
    ...state,
    tabs: [
      ...state.tabs,
      { id: crypto.randomUUID(), title, cards: [] }
    ]
  })),

  on(TabsActions.removeTab, (state, { tabId }) => ({
    ...state,
    tabs: state.tabs.filter(tab => tab.id !== tabId)
  })),

  on(TabsActions.reorderTab, (state, { tabId, direction }) => {
    const index = state.tabs.findIndex(t => t.id === tabId);
    if (index === -1) return state;

    const newTabs = [...state.tabs];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newTabs.length) return state;

    const [moved] = newTabs.splice(index, 1);
    newTabs.splice(targetIndex, 0, moved);

    return { ...state, tabs: newTabs };
  })
);