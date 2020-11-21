import {MyCommand, MyCommandProps} from "../src/bot/commands/MyCommand";
import {blacklist, ownerOnly, whitelist} from "../src/bot/commands/decorators";
import {Client, Guild, Message, Role, TextChannel} from "discord.js";
import {configFile} from '../src/config';

jest.mock('../src/config', () => {
    return {
        configFile: {
            ownerId: 'THIS_IS_THE_OWNER_ID_1234'
        }
    };
});

class TestCommand implements MyCommand {
    about = "";

    handleMessage(props: MyCommandProps): void {
    }
}

let fakeProps: MyCommandProps;
let memberRoles = new Map();

beforeEach(() => {
    // mockConfigFile.mockReset();
    let mockSend = jest.fn(() => new Promise(() => {
    }));

    memberRoles = new Map();
    let message: any = {
        author: {
            id: ''
        },
        member: {
            roles: {
                cache: memberRoles
            }
        },
        channel: {
            send: mockSend
        }
    };

    let client: any = {};
    let args: any = {};

    fakeProps = {message, args, client};
})

describe('Blacklist decorator tests', () => { // the tests container
    test('blacklisted people should be sent a message', () => {
        @blacklist(['1234', '4567'])
        class T extends TestCommand {
        }

        memberRoles.set('4321', true);
        memberRoles.set('1234', true);
        new T().handleMessage(fakeProps);
        expect(fakeProps.message.channel.send).toBeCalledTimes(1);
    });

    test('not blacklisted people should not be sent a message', () => {
        @blacklist(['4321'])
        class T extends TestCommand {
        }

        memberRoles.set('1234', true);
        new T().handleMessage(fakeProps);
        expect(fakeProps.message.channel.send).toBeCalledTimes(0);
    });
});

describe('Whitelist decorator tests', () => { // the tests container

    test('whitelisted people should not be sent a message', () => {
        @whitelist(['1234'], ['4567'])
        class T extends TestCommand {
        }

        memberRoles.set('1234', true);
        new T().handleMessage(fakeProps);
        expect(fakeProps.message.channel.send).toBeCalledTimes(0);
    });

    test('blacklisted people should be sent a message', () => {
        @whitelist(['1234'])
        class T extends TestCommand {
        }

        memberRoles.set('12345', true);
        new T().handleMessage(fakeProps);
        expect(fakeProps.message.channel.send).toBeCalledTimes(1);
    });
});

describe('ownerOnly decorator tests', () => {
    test('ownerOnly should be accessible by the owner', () => {
        let testMe = jest.fn();

        @ownerOnly
        class T extends TestCommand {
            handleMessage(props: MyCommandProps) {
                testMe();
            }
        }

        fakeProps.message.author.id = 'THIS_IS_THE_OWNER_ID_1234';
        new T().handleMessage(fakeProps);
        expect(testMe).toBeCalledTimes(1);
    });

    test('ownerOnly should be inaccessible by not the owner', () => {
        let testMe = jest.fn();

        @ownerOnly
        class T extends TestCommand {
            handleMessage(props: MyCommandProps) {
                testMe();
            }
        }

        fakeProps.message.author.id = 'THIS_IS_THE_OWNER_ID_1234';
        new T().handleMessage(fakeProps);
        expect(testMe).toBeCalledTimes(0);
    });
})