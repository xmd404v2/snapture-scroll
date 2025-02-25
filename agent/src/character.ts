import { Character, Clients, defaultCharacter, ModelProviderName } from '@elizaos/core';

export const character: Character = {
  ...defaultCharacter,
  name: 'Agent',
  // plugins: [],
  // clients: [],
  modelProvider: ModelProviderName.GAIANET,
  settings: {
    secrets: {
      GAIANET_API_KEY: process.env.GAIANET_API_KEY,
    },
    voice: {
      model: 'en_US-hfc_female-medium',
    },
  },
};
