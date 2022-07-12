import { Component, BaseComponent, Global } from '@jovotech/framework';
import { GameComponent } from './GameComponent';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    return this.$send('Welcome. To start a game say: start game');
  }

  StartGameIntent() {
    return this.$delegate(GameComponent, {
      resolve: {
        won: this.gameWon,
        lost: this.gameLost,
        cancel: this.gameCancelled,
      },
    });
  }

  gameWon() {
    return this.$send('Congratulations! You won the game. What do you want to do now?');
  }

  gameLost() {
    return this.$send('Sorry. You lost the game. What do you want to do now?');
  }

  gameCancelled() {
    return this.$send('You cancelled the game. What do you want to do now?');
  }

  SubscribeIntent() {
    this.$badges.setValue('hasSubscription', true);
    return this.$send('Subscribed. What next?');
  }

  ListBadgesIntent() {
    const earned = this.$badges.getEarnedBadges();
    return this.$send(`You have earned ${earned.length} badges. What next?`);
  }

  ScoreIntent() {
    const score = this.$user.data.score;
    return this.$send(`Your score is: ${score}. What next?`);
  }
}
