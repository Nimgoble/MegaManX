module MegaManX 
{
	export interface IEnemyConstructor<T>
	{
		new (game: Phaser.Game, x: number, y: number, ...args: any[]): T;

		// Or enforce default constructor
		// new (): T;
	}
	export class BaseEnemySpawner extends Phaser.Sprite
	{
		constructor(game: Phaser.Game, x: number, y: number)
		{
			super(game, x, y, null, null);
			this.anchor.setTo(0.5, 0.5);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.events.onEnterBounds.add(this.OnEnterBounds, this);
			this.checkWorldBounds = true;
			this.body.gravity.y = Bunny.regularGravity;
			this.body.allowGravity = false;
			this.body.setSize(32, 32, 0, 0);
			this.body.bounce.setTo(0, 0);

			this.game.add.existing(this);
		}

		OnEnterBounds(obj1: any)
		{
			console.log(this.name + ' entered the world bounds');
		}
	}
	export class EnemySpawner<T extends BaseEnemy> extends BaseEnemySpawner
	{
		private currentEnemy: T;
		private ctor: IEnemyConstructor<BaseEnemy>;
		private wasOutOfCameraBounds: boolean = false;
		//Debug stuff:
		//private nextSpawnTime: number = 0.0;
		constructor(game: Phaser.Game, x: number, y: number, ctor: IEnemyConstructor<BaseEnemy>)
		{
			super(game, x, y);
			this.ctor = ctor;
			this.currentEnemy = null;
			this.wasOutOfCameraBounds = true; //We want to spawn an enemy on startup whether we were out of bounds or not
		}

		update()
		{
			if (this.currentEnemy === null && this.wasOutOfCameraBounds && this.inCamera)
			{
				this.wasOutOfCameraBounds = false;
				this.SpawnEnemy();
				return;
			}
			else if (!this.wasOutOfCameraBounds && !this.inCamera)
				this.wasOutOfCameraBounds = true;
		}

		OnEnterBounds(obj1: any)
		{
			super.OnEnterBounds(obj1);
			this.SpawnEnemy();
		}

		SpawnEnemy()
		{
			if (this.currentEnemy !== null)
				return;
			this.currentEnemy = new this.ctor(this.game, this.x, this.y) as T;
			this.currentEnemy.events.onDestroy.add(this.OnEnemyDestroyed, this);
			this.game.add.existing(this.currentEnemy);
			//this.nextSpawnTime = this.game.time.totalElapsedSeconds() + 5.0;
		}

		OnEnemyDestroyed(obj1: any)
		{
			this.currentEnemy = null;
		}

		public GetCurrentEnemy() { return (this.currentEnemy) ? this.currentEnemy : null; }
	}

	function activator<T extends BaseEnemy>(type: IEnemyConstructor<T>, game: Phaser.Game, x: number, y: number, ...args: any[]): T
	{
		return new type(game, x, y, args);
	}
}