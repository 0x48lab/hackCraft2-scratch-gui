import {addLocaleData} from 'react-intl';

import {localeData, isRtl} from 'scratch-l10n';
import editorMessages from 'scratch-l10n/locales/editor-msgs';
import sharedLocaleMessages from '../l10n/shared-messages';

addLocaleData(localeData);

const UPDATE_LOCALES = 'scratch-gui/locales/UPDATE_LOCALES';
const SELECT_LOCALE = 'scratch-gui/locales/SELECT_LOCALE';

// 各ロケールのメッセージにsharedLocaleMessagesをマージ
const mergeMessages = (messages, locale) => {
    const sharedMessages = sharedLocaleMessages[locale] || {};
    return {
        ...messages,
        ...sharedMessages
    };
};

const initialState = {
    isRtl: false,
    locale: 'en',
    messagesByLocale: Object.keys(editorMessages).reduce((acc, locale) => ({
        ...acc,
        [locale]: mergeMessages(editorMessages[locale], locale)
    }), {}),
    messages: mergeMessages(editorMessages.en, 'en')
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SELECT_LOCALE:
        return Object.assign({}, state, {
            isRtl: isRtl(action.locale),
            locale: action.locale,
            messagesByLocale: state.messagesByLocale,
            messages: mergeMessages(state.messagesByLocale[action.locale], action.locale)
        });
    case UPDATE_LOCALES:
        const updatedMessagesByLocale = Object.keys(action.messagesByLocale).reduce((acc, locale) => ({
            ...acc,
            [locale]: mergeMessages(action.messagesByLocale[locale], locale)
        }), {});
        return Object.assign({}, state, {
            isRtl: state.isRtl,
            locale: state.locale,
            messagesByLocale: updatedMessagesByLocale,
            messages: mergeMessages(updatedMessagesByLocale[state.locale], state.locale)
        });
    default:
        return state;
    }
};

const selectLocale = function (locale) {
    return {
        type: SELECT_LOCALE,
        locale: locale
    };
};

const setLocales = function (localesMessages) {
    return {
        type: UPDATE_LOCALES,
        messagesByLocale: localesMessages
    };
};
const initLocale = function (currentState, locale) {
    if (Object.prototype.hasOwnProperty.call(currentState.messagesByLocale, locale)) {
        return Object.assign(
            {},
            currentState,
            {
                isRtl: isRtl(locale),
                locale: locale,
                messagesByLocale: currentState.messagesByLocale,
                messages: currentState.messagesByLocale[locale]
            }
        );
    }
    // don't change locale if it's not in the current messages
    return currentState;
};
export {
    reducer as default,
    initialState as localesInitialState,
    initLocale,
    selectLocale,
    setLocales
};
