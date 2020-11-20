import * as _configFile from './config.json';
import * as _censorList from './censor_list.json';
import * as _defaultPresence from './default_presence.json';


const censorList = _censorList as { [key: string]: { [key: string]: string[] } };
const defaultPresence = _defaultPresence;
const configFile = _configFile;

export {configFile, censorList, defaultPresence};