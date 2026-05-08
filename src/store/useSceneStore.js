import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useSceneStore = create((set, get) => ({
  currentBackground: null,
  canvasItems: [],
  usedCharacterIds: new Set(),
  drawerOpen: true,
  activeTab: 'scenes',

  setBackground: (src) => set({ currentBackground: src }),

  addCharacter: (asset) =>
    set((state) => {
      if (state.usedCharacterIds.has(asset.id)) return state;
      return {
        canvasItems: [
          ...state.canvasItems,
          {
            id: uuidv4(),
            assetId: asset.id,
            type: 'character',
            src: asset.src,
            x: 400,
            y: 300,
            scaleX: 0.3,
            scaleY: 0.3,
            rotation: 0,
          },
        ],
        usedCharacterIds: new Set([...state.usedCharacterIds, asset.id]),
      };
    }),

  addProp: (asset) =>
    set((state) => {
      const isBottle = asset.id === 'prop-bottle';
      const initialScale = isBottle ? 0.2 : 0.5;
      return {
        canvasItems: [
          ...state.canvasItems,
          {
            id: uuidv4(),
            assetId: asset.id,
            type: 'prop',
            src: asset.src,
            x: 400,
            y: 300,
            scaleX: initialScale,
            scaleY: initialScale,
            rotation: 0,
          },
        ],
      };
    }),

  addVehicle: (asset) =>
    set((state) => ({
      canvasItems: [
        ...state.canvasItems,
        {
          id: uuidv4(),
          assetId: asset.id,
          type: 'vehicle',
          src: asset.src,
          x: 400,
          y: 300,
          scaleX: 0.35,
          scaleY: 0.35,
          rotation: 0,
          isHorse: asset.id === 'trojan-horse',
          loadedCharacters: [],
        },
      ],
    })),

  removeItem: (itemId) =>
    set((state) => {
      const item = state.canvasItems.find((i) => i.id === itemId);
      const newItems = state.canvasItems.filter((i) => i.id !== itemId);
      const newUsed = new Set(state.usedCharacterIds);

      if (item?.type === 'character') {
        newUsed.delete(item.assetId);
      }

      if (item?.isHorse) {
        item.loadedCharacters?.forEach((c) => newUsed.delete(c.assetId));
      }

      return { canvasItems: newItems, usedCharacterIds: newUsed };
    }),

  loadCharacterIntoHorse: (characterItemId, horseItemId) =>
    set((state) => {
      const char = state.canvasItems.find((i) => i.id === characterItemId);
      if (!char) return state;

      return {
        canvasItems: state.canvasItems
          .filter((i) => i.id !== characterItemId)
          .map((i) =>
            i.id === horseItemId
              ? {
                  ...i,
                  loadedCharacters: [
                    ...(i.loadedCharacters || []),
                    { assetId: char.assetId, src: char.src },
                  ],
                }
              : i
          ),
      };
    }),

  popCharacterFromHorse: (horseItemId) =>
    set((state) => {
      const horse = state.canvasItems.find((i) => i.id === horseItemId);
      if (!horse?.loadedCharacters?.length) return state;

      const remaining = horse.loadedCharacters.slice(0, -1);
      const popped = horse.loadedCharacters[horse.loadedCharacters.length - 1];

      return {
        canvasItems: [
          ...state.canvasItems.map((i) =>
            i.id === horseItemId ? { ...i, loadedCharacters: remaining } : i
          ),
          {
            id: uuidv4(),
            assetId: popped.assetId,
            type: 'character',
            src: popped.src,
            x: horse.x + 150,
            y: horse.y,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
          },
        ],
      };
    }),

  attachPropToCharacter: (propItemId, characterItemId, offsetX, offsetY) =>
    set((state) => {
      const prop = state.canvasItems.find((i) => i.id === propItemId);
      if (!prop) return state;
      return {
        canvasItems: state.canvasItems
          .filter((i) => i.id !== propItemId)
          .map((i) =>
            i.id === characterItemId
              ? {
                  ...i,
                  attachedProps: [
                    ...(i.attachedProps || []),
                    {
                      id: uuidv4(),
                      assetId: prop.assetId,
                      src: prop.src,
                      offsetX,
                      offsetY,
                      scaleX: prop.scaleX,
                      scaleY: prop.scaleY,
                      rotation: prop.rotation,
                    },
                  ],
                }
              : i
          ),
      };
    }),

  detachProp: (characterItemId, attachedPropId) =>
    set((state) => {
      const character = state.canvasItems.find((i) => i.id === characterItemId);
      if (!character) return state;
      const prop = (character.attachedProps || []).find((p) => p.id === attachedPropId);
      if (!prop) return state;
      return {
        canvasItems: [
          ...state.canvasItems.map((i) =>
            i.id === characterItemId
              ? { ...i, attachedProps: i.attachedProps.filter((p) => p.id !== attachedPropId) }
              : i
          ),
          {
            id: uuidv4(),
            assetId: prop.assetId,
            type: 'prop',
            src: prop.src,
            x: character.x + prop.offsetX * character.scaleX,
            y: character.y + prop.offsetY * character.scaleY,
            scaleX: prop.scaleX * character.scaleX,
            scaleY: prop.scaleY * character.scaleY,
            rotation: prop.rotation,
          },
        ],
      };
    }),

  updateAttachedProp: (characterItemId, attachedPropId, patch) =>
    set((state) => ({
      canvasItems: state.canvasItems.map((i) =>
        i.id === characterItemId
          ? {
              ...i,
              attachedProps: (i.attachedProps || []).map((p) =>
                p.id === attachedPropId ? { ...p, ...patch } : p
              ),
            }
          : i
      ),
    })),

  updateItem: (itemId, patch) =>
    set((state) => ({
      canvasItems: state.canvasItems.map((i) =>
        i.id === itemId ? { ...i, ...patch } : i
      ),
    })),

  clearAll: () =>
    set((state) => ({
      canvasItems: [],
      usedCharacterIds: new Set(),
    })),

  toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useSceneStore;
