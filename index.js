// SPDX-License-Identifier: BUSL-1.1

import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';

import {LoggingWrapper} from '@services/logging';

AppRegistry.registerComponent(appName, () => LoggingWrapper(App));
