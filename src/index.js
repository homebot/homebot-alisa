const yandexDialogSDK = require('yandex-dialogs-sdk');
const alice = new yandexDialogSDK.Alice();

const welcome = require('./command/welcome');
const skills = require('./command/skills');
const myDevices = require('./command/my-devices');
const light = require('./command/light');
const any = require('./command/any');

alice.command(welcome.matcher, welcome.handler);
alice.command(skills.matcher, skills.handler);
alice.command(myDevices.matcher, myDevices.handler);
alice.command(light.turnOnMatcher, light.turnOnHandler);
alice.command(light.turnOffMatcher, light.turnOffHandler);
alice.command(light.turnOnWhereMatcher, light.turnOnWhereHandler);
alice.command(light.turnOffWhereMatcher, light.turnOffWhereHandler);
alice.any(any);

module.exports = alice;