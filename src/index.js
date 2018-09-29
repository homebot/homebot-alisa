import { Alice } from 'yandex-dialogs-sdk';
const alice = new Alice();

import * as welcome from './command/welcome';
import * as skills from './command/skills';
import * as myDevices from './command/my-devices';
import * as light from './command/light';
import any from './command/any';

alice.command(welcome.matcher, welcome.handler);
alice.command(skills.matcher, skills.handler);
alice.command(myDevices.matcher, myDevices.handler);
alice.command(light.turnOnMatcher, light.turnOnHandler);
alice.command(light.turnOffMatcher, light.turnOffHandler);
alice.command(light.turnOnWhereMatcher, light.turnOnWhereHandler);
alice.command(light.turnOffWhereMatcher, light.turnOffWhereHandler);
alice.any(any);

export default alice;