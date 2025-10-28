import { createReducer, on } from '@ngrx/store';
import { Device, Tab } from '../../models/api.model';
import { ITEM_TYPE } from '../../models/enums';
import * as TabsActions from './tabs.actions';

export interface TabsState {
  tabs: Tab[];
  isLoading: boolean;
  error?: unknown;
}

export const initialState: TabsState = {
  tabs: [],
  isLoading: false,
  error: undefined,
};

export const tabsReducer = createReducer(
  initialState,

  on(TabsActions.loadTabs, state => ({
    ...state,
    isLoading: true
  })),

  on(TabsActions.loadTabsSuccess, (state, { tabs }) => ({
    ...state,
    tabs: [...tabs],
    isLoading: false
  })),

  on(TabsActions.loadTabsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(TabsActions.toggleDeviceState, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TabsActions.toggleDeviceStateSuccess, (state, { device }) => {
    const updatedTabs = state.tabs.map(tab =>
      updateDeviceStateInTab(device, tab)
    );

    return {
      ...state,
      tabs: updatedTabs,
      loading: false,
      error: null,
    };
  }),

  on(TabsActions.toggleDeviceStateFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

);

function updateDeviceStateInTab(device: Device, tab: Tab): Tab {
  return {
    ...tab,
    cards: tab.cards.map(card => ({
      ...card,
      items: card.items.map(item =>
        item.type === ITEM_TYPE.DEVICE && item.id === device.id
          ? { ...device }
          : item
      )
    }))
  };
}

/*

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
})*/