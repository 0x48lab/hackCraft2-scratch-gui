import {defineMessages} from 'react-intl';

const messages = defineMessages({
    downloadToComputer: {
        defaultMessage: 'Save to your computer',
        description: 'Menu bar item for downloading a project to your computer',
        id: 'gui.menuBar.downloadToComputer'
    }
});

// ロケール固有のメッセージを別のオブジェクトとして定義
const localeMessages = {
    ja: {
        'gui.menuBar.downloadToComputer': 'コンピュータに保存'
    },
    'ja-hiragana': {
        'gui.menuBar.downloadToComputer': 'こんぴゅーたにほぞん'
    }
};

export {messages, localeMessages}; 