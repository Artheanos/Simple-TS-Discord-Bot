import { Message } from 'discord.js';
import config from "config";
import { MyCommandProps } from 'interfaces/MyCommand';


export function ownerOnly(constructor: Function) {
  let tmp = constructor.prototype.handleMessage;
  constructor.prototype.handleMessage = (props: MyCommandProps) => {
    if (props.message.author.id === config.ownerId)
      tmp(props);
  }
}

export function blacklist(roles?: string[], ids?: string[]) {
  let scope = new MyScope(roles, ids);
  return function (constructor: Function) {
    let tmp = constructor.prototype.handleMessage;
    constructor.prototype.handleMessage = function (props: MyCommandProps) {
      if (!scope.includes(props.message)) {
        tmp(props);
      } else {
        props.message.channel.send('You were blacklisted').then((msg) => {
          setTimeout(msg.delete, 4000)
        });
      }
    }
  }
}

export function whitelist(roles?: string[], ids?: string[]) {
  let scope = new MyScope(roles, ids);
  return function (constructor: Function) {
    let tmp = constructor.prototype.handleMessage;
    constructor.prototype.handleMessage = function (props: MyCommandProps) {
      if (scope.includes(props.message)) {
        tmp(props);
      } else {
        props.message.channel.send('You are not in the whitelist').then((msg) => {
          setTimeout(msg.delete, 4000)
        });
      }
    }
  }
}


class MyScope {
  scopeRoles?: string[];
  ids?: string[];

  constructor(roles?: string[], ids?: string[]) {
    this.scopeRoles = roles;
    this.ids = ids;
  }

  includes(message: Message): boolean {
    if (this.ids?.includes(message.author.id)) {
      return true;
    }
    if (this.scopeRoles) for (let role of this.scopeRoles) if (message.member!.roles.cache.has(role))
      return true;
    return false;
  }
}
