import {ownerOnly, IMessageProps} from "./index";

function main({client}: IMessageProps) {
    client.destroy();
}

export default ownerOnly(main);