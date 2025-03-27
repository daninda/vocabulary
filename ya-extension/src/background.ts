import { DictionaryService } from './services/dictionary';
import { DictionaryEntryService } from './services/dictionary-entry';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'addToDictionary',
    title: 'Добавить в словарь',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'addToDictionary') {
    const storage = await chrome.storage.local.get([
      'lastSelection',
      'accessToken',
    ]);

    if (storage.lastSelection && storage.accessToken) {
      const dictionariesResponse = await DictionaryService.findAll(
        storage.accessToken,
      );

      const dictionaryEntriesResponse = await DictionaryEntryService.lookup({
        word: storage.lastSelection.selection,
      });

      await chrome.tabs.sendMessage(tab!.id!, {
        action: 'showPopup',
        data: storage.lastSelection,
        dictionaries: dictionariesResponse.data,
        dictionaryEntries: dictionaryEntriesResponse.data,
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'addWordToDictionary') {
    DictionaryEntryService.addWord(message.data);
  }
});
