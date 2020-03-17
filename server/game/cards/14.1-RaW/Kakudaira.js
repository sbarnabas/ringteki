const ProvinceCard = require('../../provincecard.js');
const AbilityDsl = require('../../abilitydsl');
const { Durations } = require('../../Constants');

class Kakudaira extends ProvinceCard {
    setupCardAbilities() {
        this.persistentEffect({
            effect: AbilityDsl.effects.playerDelayedEffect({
                when: {
                    onPhaseStarted: (event, context) => !context.source.facedown && !context.source.isBroken && context.player.getDynastyCardsInProvince(context.source.location).some(a => a.facedown)
                },
                duration: Durations.Persistent,
                message: '{0} reveals {1} due to the constant effect of {2}',
                messageArgs: effectContext => [
                    effectContext.player,
                    effectContext.player.getDynastyCardsInProvince(effectContext.source.location).filter(a => a.facedown),
                    effectContext.source
                ],
                gameAction: AbilityDsl.actions.flipDynasty(context => ({
                    target: context.player.getDynastyCardsInProvince(context.source.location).filter(a => a.facedown)
                }))
            })
        });
    }
}

Kakudaira.id = 'kakudaira';

module.exports = Kakudaira;
