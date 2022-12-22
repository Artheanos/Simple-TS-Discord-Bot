import { BaseCommand } from 'commands/BaseCommand'
import { DeleteCommand } from 'commands/DeleteCommand'
import { DisconnectCommand } from 'commands/DisconnectCommand'
import { EvalCommand } from 'commands/EvalCommand'
import { JoinCommand } from 'commands/JoinCommand'
import { LolCommand } from 'commands/LolCommand'
import { PauseCommand } from 'commands/PauseCommand'
import { PlayCommand } from 'commands/PlayCommand'
import { QueueCommand } from 'commands/QueueCommand'
import { Rule34Command } from 'commands/Rule34Command'
import { SearchCommand } from 'commands/SearchCommand'
import { ShutdownCommand } from 'commands/ShutdownCommand'
import { SkipCommand } from 'commands/SkipCommand'
import { UnpauseCommand } from 'commands/UnpauseCommand'

export const routes: Record<string, Type<BaseCommand>> = {
    'delete':     DeleteCommand,
    'disconnect': DisconnectCommand,
    'leave':      DisconnectCommand,
    'eval':       EvalCommand,
    'join':       JoinCommand,
    'lol':        LolCommand,
    'lolek':      LolCommand,
    'pause':      PauseCommand,
    'play':       PlayCommand,
    'p':          PlayCommand,
    'rule34':     Rule34Command,
    'queue':      QueueCommand,
    'shutdown':   ShutdownCommand,
    'search':     SearchCommand,
    'skip':       SkipCommand,
    'next':       SkipCommand,
    'unpause':    UnpauseCommand,
    'resume':     UnpauseCommand,
    'routes':     Rule34Command,
}
