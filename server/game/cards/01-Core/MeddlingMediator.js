const DrawCard = require('../../drawcard.js');

class MeddlingMediator extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Take 1 fate or 1 honor',
            phase: 'conflict',
            condition: context => this.game.completedConflicts.filter(conflict => conflict.attackingPlayer === context.player.opponent).length > 1,
            target: {
                mode: 'select',
                choices: {
                    'Take 1 fate': ability.actions.takeFate(),
                    'Take 1 honor': ability.actions.takeHonor()
                }
            }
        });
    }
}

MeddlingMediator.id = 'meddling-mediator';

module.exports = MeddlingMediator;
