G.AddData({
	//TODO: make the food related items in the food mod
	name: 'weather mod',
	author: 'Hydos',
	desc: 'Parts of game controlled by weather and weather itself',
	engineVersion: 2,
	manifest: 0,
	func: function () {
		/*=====================================================================================
		RESOURCES
		=======================================================================================*/
		G.resCategories["demog"].side.push("farm");

		/*=====================================================================================
		GAME OBJECTS
		=======================================================================================*/
		new G.Res({
			name: 'farm',
			desc: 'Each [farm] can make around 1 to 4 [food] per day depending on the weather. //work in progress blaze dont complain',
			icon: [10, 3],
			displayUsed: true,
		});


		/*=====================================================================================
		UNITS AND EFFECTS
		=======================================================================================*/

		new G.Unit({
			name: 'farmer',
			startWith: 1,
			desc: '@farms for basic [food], the ammount of [food] recieved depends on the weather and other factors',
			icon: [10, 3],
			cost: {},
			use: { 'worker': 2, 'land': 1 }, //TODO: use farm land. farm land will be properly implemented when i add a land management tab which lets you build structures
			effects: [
				{ type: 'gather', context: 'farmer', what: { 'herb': 2.5, 'fruit': 4.5 }, amount: 1, max: 5 },
			],
			req: { 'tribalism': true },
			category: 'production',
			priority: 10,
		});

		new G.Unit({
			name: 'baker',
			startWith: 0,
			desc: '@bakes[bread] from wheat and y e a s t',
			icon: [11, 3],
			cost: {},
			use: {'worker': 1},
			effects: [
				{ type: 'gather', context: 'baker', what: {'bread': 6 }, amount: 1, max: 3 },
			],
			req: { 'tribalism': true },
			category: 'production',
			priority: 10,
		});

	}

});