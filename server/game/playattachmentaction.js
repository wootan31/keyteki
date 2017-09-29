const BaseAbility = require('./baseability.js');
const Costs = require('./costs.js');

class PlayAttachmentAction extends BaseAbility {
    constructor() {
        super({
            cost: [
                Costs.payReduceableFateCost('play'),
                Costs.playLimited()
            ] 
        });
        this.title = 'PlayAttachmentAction';
        this.targets = { 
            target: {
                cardCondition: this.cardCondition
            }
        };
    }
    
    cardCondition(card, context) {
        return context.source.owner.canAttach(context.source, card);
    }

    meetsRequirements(context) {
        return (
            context.game.currentPhase !== 'dynasty' &&
            context.source.getType() === 'attachment' &&
            context.source.location === 'hand' &&
            context.source.canPlay()
        );
    }

    executeHandler(context) {
        let targetPlayer = context.target.controller;
        targetPlayer.attach(context.player, context.source, context.target, 'play');
    }

    isCardAbility() {
        return false;
    }
}

module.exports = PlayAttachmentAction;

