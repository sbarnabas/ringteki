describe('Crippling Taxes', function() {
    integration(function() {
        beforeEach(function() {
            this.setupTest({
                phase: 'dynasty',
                player1: {
                    dynastyDiscard: ['aranat', 'daidoji-uji', 'imperial-storehouse', 'heavy-ballista', 'crippling-taxes']
                },
                player2: {
                    dynastyDiscard: ['aranat', 'daidoji-uji', 'imperial-storehouse', 'heavy-ballista']
                }
            });
            this.taxes = this.player1.findCardByName('crippling-taxes');
            this.aranat = this.player1.findCardByName('aranat');
            this.uji = this.player1.findCardByName('daidoji-uji');
            this.storehouse = this.player1.findCardByName('imperial-storehouse');
            this.ballista = this.player1.findCardByName('heavy-ballista');

            this.aranat2 = this.player2.findCardByName('aranat');
            this.uji2 = this.player2.findCardByName('daidoji-uji');
            this.storehouse2 = this.player2.findCardByName('imperial-storehouse');
            this.ballista2 = this.player2.findCardByName('heavy-ballista');

            this.shamefulDisplayP1 = this.player1.findCardByName('shameful-display', 'province 1');
            this.shamefulDisplayP2 = this.player2.findCardByName('shameful-display', 'province 1');

            this.player1.reduceDeckToNumber('dynasty deck', 0);
            this.player1.moveCard(this.aranat, 'province 1');
            this.player1.moveCard(this.uji, 'province 1');
            this.player1.moveCard(this.storehouse, 'province 1');
            this.player1.moveCard(this.ballista, 'dynasty deck');
            this.player1.moveCard(this.taxes, 'province 2');

            this.player2.reduceDeckToNumber('dynasty deck', 0);
            this.player2.moveCard(this.aranat2, 'province 1');
            this.player2.moveCard(this.ballista2, 'province 1');
            this.player2.moveCard(this.storehouse2, 'province 1');
            this.player2.moveCard(this.uji2, 'dynasty deck');
        });

        it('should be usable on your own provinces', function () {
            this.player1.clickCard(this.taxes);
            expect(this.player1).toBeAbleToSelect(this.shamefulDisplayP1);
            expect(this.player1).toBeAbleToSelect(this.shamefulDisplayP2);
            expect(this.aranat.location).toBe('province 1');
            expect(this.uji.location).toBe('province 1');
            expect(this.storehouse.location).toBe('province 1');
            expect(this.ballista.location).toBe('dynasty deck');

            this.player1.clickCard(this.shamefulDisplayP1);

            expect(this.aranat.location).toBe('dynasty discard pile');
            expect(this.uji.location).toBe('dynasty discard pile');
            expect(this.storehouse.location).toBe('dynasty discard pile');
            expect(this.ballista.location).toBe('province 1');
            expect(this.ballista.facedown).toBe(true);

            expect(this.getChatLogs(5)).toContain('player1 plays Crippling Taxes to discard Adept of the Waves, Aranat, Daidoji Uji and Imperial Storehouse');
        });

        it('should be usable on your opponent provinces', function () {
            this.player1.clickCard(this.taxes);
            expect(this.player1).toBeAbleToSelect(this.shamefulDisplayP1);
            expect(this.player1).toBeAbleToSelect(this.shamefulDisplayP2);
            expect(this.aranat2.location).toBe('province 1');
            expect(this.ballista2.location).toBe('province 1');
            expect(this.storehouse2.location).toBe('province 1');
            expect(this.uji2.location).toBe('dynasty deck');

            this.player1.clickCard(this.shamefulDisplayP2);

            expect(this.aranat2.location).toBe('dynasty discard pile');
            expect(this.ballista2.location).toBe('dynasty discard pile');
            expect(this.storehouse2.location).toBe('dynasty discard pile');
            expect(this.uji2.location).toBe('province 1');
            expect(this.uji2.facedown).toBe(true);

            expect(this.getChatLogs(5)).toContain('player1 plays Crippling Taxes to discard Adept of the Waves, Aranat, Heavy Ballista and Imperial Storehouse');
        });
    });
});
