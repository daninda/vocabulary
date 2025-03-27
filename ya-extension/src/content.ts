import { AuthService } from './services/auth';
import { IDictionary, IDictionaryEntry, ISelection } from './utils/types';

async function init() {
  const storage = await chrome.storage.local.get('accessToken');

  if (storage.accessToken) {
    AuthService.refresh()
      .then(async (res) => {
        await chrome.storage.local.set({ accessToken: res.data.accessToken });
      })
      .catch(async () => {
        await chrome.storage.local.remove('accessToken');
      });
  }

  document.addEventListener('mouseup', async () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const lastSelection = {
      selection: selection.toString().trim(),
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY + rect.height,
    };

    await chrome.storage.local.set({ lastSelection: lastSelection });
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'showPopup') {
      const selectionData = message.data as ISelection;
      const dictionariesData = message.dictionaries as IDictionary[];
      const dictionaryEntriesData =
        message.dictionaryEntries as IDictionaryEntry[];

      const popup = document.createElement('div');
      popup.style.left = `${selectionData.x}px`;
      popup.style.top = `${selectionData.y}px`;
      popup.style.position = 'absolute';
      popup.style.zIndex = '10000';

      Object.assign(popup.style, {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#333',
        minWidth: '320px',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      } as CSSStyleDeclaration);

      const text = document.createElement('p');
      text.textContent = `Выберите словарь: `;
      text.style.margin = '0';
      text.style.padding = '0';

      const buttonsContainer = document.createElement('div');
      Object.assign(buttonsContainer.style, {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
      } as CSSStyleDeclaration);

      let selectedDictionaryId: string | null = null;

      dictionariesData.forEach((dictionary) => {
        const button = document.createElement('button');
        button.textContent = dictionary.name;
        button.dataset.id = dictionary.id;

        Object.assign(button.style, {
          padding: '6px 12px',
          borderRadius: '16px',
          border: 'none',
          backgroundColor: '#f0f0f0',
          color: '#333',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s',
          flexShrink: '0',
        } as CSSStyleDeclaration);

        button.addEventListener('mouseenter', () => {
          if (button.dataset.id !== selectedDictionaryId) {
            button.style.backgroundColor = '#e0e0e0';
          }
        });

        button.addEventListener('mouseleave', () => {
          if (button.dataset.id !== selectedDictionaryId) {
            button.style.backgroundColor = '#f0f0f0';
          }
        });

        button.addEventListener('click', (e) => {
          e.stopPropagation();

          buttonsContainer.querySelectorAll('button').forEach((btn) => {
            btn.style.backgroundColor = '#f0f0f0';
            btn.style.color = '#333';
          });

          button.style.backgroundColor = '#4285f4';
          button.style.color = 'white';

          selectedDictionaryId = dictionary.id;
          console.log(
            `Выбран словарь: ${dictionary.name} (ID: ${dictionary.id})`,
          );
        });

        buttonsContainer.appendChild(button);
      });

      const wordsContainer = document.createElement('div');
      Object.assign(wordsContainer.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '4px',
      } as CSSStyleDeclaration);
      const createWordCard = (entry: IDictionaryEntry) => {
        const card = document.createElement('div');
        Object.assign(card.style, {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '3px solid #4285f4',
        } as CSSStyleDeclaration);
        const wordHeader = document.createElement('div');
        wordHeader.style.display = 'flex';
        wordHeader.style.justifyContent = 'space-between';
        wordHeader.style.marginBottom = '8px';
        const wordInfo = document.createElement('div');
        wordInfo.innerHTML = `
            <strong style="font-size: 16px;">${entry.word}</strong>
            <span style="color: #666; margin-left: 8px;">${entry.pos}</span>
            <div style="color: #4285f4; margin-top: 4px;">${entry.translated.word}</div>
        `;
        const addButton = document.createElement('button');
        Object.assign(addButton.style, {
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #4285f4',
          backgroundColor: 'transparent',
          color: '#4285f4',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          fontSize: '12px',
        } as CSSStyleDeclaration);
        addButton.textContent = 'Добавить';
        addButton.addEventListener(
          'click',
          async (e) => {
            if (selectedDictionaryId) {
              e.stopPropagation();
              addButton.textContent = '✓ Добавлено';
              addButton.style.backgroundColor = '#e6f2ff';
              addButton.style.cursor = 'default';

              chrome.runtime.sendMessage({
                action: 'addWordToDictionary',
                data: {
                  dictionaryId: selectedDictionaryId,
                  word: entry.word,
                  partOfSpeech: entry.pos,
                },
              });
            }
          },
          { once: true },
        );
        wordHeader.appendChild(wordInfo);
        wordHeader.appendChild(addButton);
        card.appendChild(wordHeader);
        if (entry.translated.example || entry.translated.synonims) {
          const extraInfo = document.createElement('div');
          extraInfo.style.marginTop = '8px';
          extraInfo.style.fontSize = '13px';
          extraInfo.style.color = '#555';
          if (entry.translated.example) {
            extraInfo.innerHTML += `
        <div style="margin-bottom: 4px;">
          <i>Пример:</i> ${entry.translated.example.text}<br>
          <i>Перевод:</i> ${entry.translated.example.translated}
        </div>
      `;
          }
          if (entry.translated.synonims?.length) {
            extraInfo.innerHTML += `
        <div>
          <i>Синонимы:</i> ${entry.translated.synonims.join(', ')}
        </div>
      `;
          }
          card.appendChild(extraInfo);
        }
        return card;
      };
      dictionaryEntriesData.forEach((entry) => {
        wordsContainer.appendChild(createWordCard(entry));
      });

      if (dictionaryEntriesData.length === 0) {
        wordsContainer.innerHTML = `
          <div style="text-align: center; margin-top: 12px; color: #666;">
            Ничего не нашлось. Попробуйте другоие слово.
          </div>
        `;
      } else {
        popup.appendChild(text);
        popup.appendChild(buttonsContainer);
      }
      popup.appendChild(wordsContainer);

      document.body.appendChild(popup);

      document.addEventListener('click', () => popup.remove(), { once: true });

      popup.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}

init();
