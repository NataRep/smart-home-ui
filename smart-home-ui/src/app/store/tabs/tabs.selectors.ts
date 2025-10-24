import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TabsState } from './tabs.reducer';

export const selectTabsState = createFeatureSelector<TabsState>('tabs');

export const selectTabsList = createSelector(
  selectTabsState,
  state => state.tabs
);

export const selectLoadingTabs = createSelector(
  selectTabsState,
  state => state.isLoading
);

export const selectTabsError = createSelector(
  selectTabsState,
  state => state.error
);
