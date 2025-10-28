import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Device } from '../../models/api.model';
import { ITEM_TYPE } from '../../models/enums';
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

export const selectDeviceStateById = (deviceId: string) =>
  createSelector(selectTabsState, (state: TabsState): Device | undefined => {
    for (const tab of state.tabs) {
      for (const card of tab.cards) {
        for (const item of card.items) {
          if (item.type === ITEM_TYPE.DEVICE && item.id === deviceId) {
            return item as Device;
          }
        }
      }
    }
    return undefined;
  });

export const selectTabsLoading = createSelector(
  selectTabsState,
  (state: TabsState) => state.isLoading
);

export const selectAllTabs = createSelector(
  selectTabsState,
  (state: TabsState) => state.tabs
);