//Poprawiony TitanHelper dla Frozen
var titanHelperPlus = new (function() {
	var that = this;
	this.specialMobs = ["Mamlambo", "Iluignegil", "Famaimg", "Mufteroin", "Rigelibn", "Nephsalaceruus", "Umibozu", "Amaimon Soploręki", "Regulus Mętnooki"]; //lista instancjowych tytanĂłw ze wzglÄdu na ich dziwaczne dziaĹanie
	this.fight = fight;
	fight = function(data) {
		if (data.init) that.onFightInit(data);
		if (typeof(data.move) != "undefined" && data.move < 0) that.onFightEnd(); 
		var ret = that.fight(data);
		that.onFight(data);
		return ret;
	};
	this.onFightInit = function(data) {
		//taka maĹa notka odnoĹnie kodu - this.titan nie ma oznaczaÄ tytana, tylko Ĺźe walka toczy siÄ z tylko jednym przeciwnikiem, wiÄc moĹźna uruchamiaÄ wiÄcej rzeczy (pokazywanie klÄtwy, wytro, wyzywa itp). Sama zmienna jest albo false albo ma ID przeciwnika
		this.dead = [];
		this.titan = false;
		this.titanCursed = false;
		this.titanPrepares = false;
		this.titanName = false;
		this.titanShouted = false;
		this.titanShoutedBy = false;
		this.titanDistracted = false;
		this.updatePrepares();
		this.updateCurse();
		this.updateDistract();
		this.updateTitanShouted();
		if (data.w[hero.id]) {
			this.team = data.w[hero.id].team;
		};
		this.otherTurns = {};
		this.otherEnemyTurns = {};
		this.lowStat = {};
		this.antiAuto = false;
		var enemies = 0;
		var party = 0;
		var id = 0;
		var pvp = false;
		for (var i in data.w) {
			if (data.w[i].team != this.team) {
				enemies++;
				id = i;
				if (id > 0) {
					pvp = true;
				};
			};
			if (data.w[i].team == this.team) {
				party++;
				this.otherTurns[i] = {
					speedAura: [],
					ignoreNext: false //moĹźliwoĹÄ ignorowania "faĹszywych" tur (podwĂłjny strzaĹ, kontra)
				};
			} else {
				this.otherEnemyTurns[i] = {
					allSlow: [],
					ignoreNext: false
				};
			};
			this.lowStat[i] = {
				ac: 0,
				resf: 0,
				resc: 0,
				resl: 0
			};
		};
		if (enemies == 1) {
			this.titan = id;
			this.titanName = data.w[id].name;
		};
		this.party = party - 1; // -1 bo gracza nie liczymy
		this.partyTurns = 0;
		this.updatePartyTurns();
		this.updateSpeedAura();
		this.updateAllSlow();
		this.$mainWrapper.show();
		if (this.titan && g.npc[this.titan*(-1)] && g.npc[this.titan*(-1)].wt >= 100) { //standardowy tytan
			this.antiAuto = true;
		} else if (this.titan && this.specialMobs.indexOf(this.titanName) > -1) { //instancjowy tytan
			this.antiAuto = true;
		} else if (pvp && enemies > 1 && party > 1) { //jakieĹ grupowe pvp
			this.antiAuto = true;
		};
	};
	this.onFightEnd = function() {
		this.$mainWrapper.fadeOut();
		this.antiAuto = false;
	};
	this.onFight = function(data) {
		if (data.w) {
			for (var i in data.w) {
				if (data.w[i].hpp == 0 && g.battle.f && g.battle.f[i] && g.battle.f[i].team == this.team && this.dead.indexOf(i) == -1) {
					if (i == hero.id) {
						this.party = 0;
					} else {
						this.party -= 1;
					};
					this.updatePartyTurns();
					this.dead.push(i);
				} else if (data.w[i].hpp > 0) {
					var extratip = "";
					if (this.lowStat[i].ac) {
						extratip += "ObniĹź. panc.: "+this.lowStat[i].ac;
					};
					if (this.lowStat[i].resf || this.lowStat[i].resl || this.lowStat[i].resc) {
						var reshtml = "ObniĹź. odp.: <span style='color: #f00'>"+this.lowStat[i].resf+"</span>/"+"<span style='color: #ff0'>"+this.lowStat[i].resl+"</span>/"+"<span style='color: #9bf'>"+this.lowStat[i].resc+"</span>";
						extratip += extratip == "" ? reshtml : "<br>"+reshtml;
					};
					if (extratip != "") {
						var $troop = $("#troop"+i);
						var tip = $troop.attr("tip");
						tip = tip + "<br>" + extratip;
						$troop.attr("tip", tip);
					};
				};
			};
		};
	};
	this.battleMsg = battleMsg;
	battleMsg = function(query, arg2) {
		that.parseBattleMsg(query);
		return that.battleMsg(query, arg2);
	};
	this.parseBattleMsg = function(query) {
		var data = this.parseQuery(query);
		//console.log(data);
		if (data.attacker == hero.id && data.isTurn) { //ruch gracza
			this.partyTurns = 0;
			this.updatePartyTurns();
		};
		if (data.msgs["aura-sa_per"] && data.team == this.team) { //aura SA
			for (var i in this.otherTurns) {
				this.otherTurns[i].speedAura.push(0);
				if (this.otherTurns[i].speedAura.length > 2) this.otherTurns[i].speedAura.splice(0,1);
			};
			this.updateSpeedAura();
		};
		if (data.msgs["+legbon_curse"] && this.titan) { //weszĹa klÄtwa
			this.titanCursed = true;
			this.updateCurse();
		};
		if (data.msgs["+distract"] && this.titan) { //wytrÄcenie z rĂłwnowagi
			this.titanDistracted = true;
			this.updateDistract();
		};
		if (this.titan && data.msgs["txt"] == this.titanName + " - klÄtwa, utrata tury") { //tytan straciĹ turÄ (klÄtwa)
			this.titanCursed = false;
			this.updateCurse();
			this.onEnemyTurn(this.titan, true);
		};
		if (this.titan && data.msgs["txt"] == this.titanName + " - wytrÄcenie z rĂłwnowagi") { //tytan straciĹ turÄ (wytro)
			this.titanDistracted = false;
			this.updateDistract();
			if (this.titanPrepares) {
				this.titanPrepares = false;
				this.updatePrepares();
			};
			this.onEnemyTurn(this.titan, true);
		};
		if (data.msgs["prepare"]) { //Ĺadowanie speca
			this.titanPrepares = data.msgs["prepare"];
			this.updatePrepares();
		};
		if (data.msgs["allslow_per"] && data.team == this.team) { //szadĹş itp
			for (var i in this.otherEnemyTurns) {
				this.otherEnemyTurns[i].allSlow.push(0);
				if (this.otherEnemyTurns[i].allSlow.length > 2) this.otherEnemyTurns[i].allSlow.splice(0,1);
			};
			this.updateAllSlow();
		};
		if (data.team && data.team != this.team && data.isTurn) { //ruch jakiegoĹ przeciwnika
			this.onEnemyTurn(data.attacker);
		};
		if (this.team == data.team && data.isTurn) { //ruch kogoĹ z grp
			this.onPartyTurn(data.attacker);
		};
		if (data.msgs["+dispel"] || (data.msgs["tspell"] && data.attacker == this.titan)) { //spec przerwany/spec wykonany
			this.titanPrepares = false;
			this.updatePrepares();
		};
		if (data.msgs["tspell"] == "PodwĂłjny strzaĹ" || data.msgs["tspell"] == "PodwĂłjne trafienie") { //podwĂłjny strzaĹ, podwĂłjne trafienie
			if (data.team == this.team) {
				this.otherTurns[data.attacker].ignoreNext = true;
			} else {
				this.otherEnemyTurns[data.attacker].ignoreNext = true;
			};
		};
		if (data.msgs["-contra"]) { //kontra
			if (data.team == this.team) {
				this.otherEnemyTurns[data.target].ignoreNext = true;
			} else {
				this.otherTurns[data.target].ignoreNext = true;
			};
		};
		if (this.titan && data.msgs["shout"]) { //wyzyw
			this.titanShouted = 2;
			this.titanShoutedBy = g.battle.f[data.attacker].name;
			this.updateTitanShouted();
		};
		if (data.msgs["+acdmg"]) { //niszczenie panca
			this.lowStat[data.target].ac += parseInt(data.msgs["+acdmg"]);
		};
		if (data.msgs["+resdmg"]) { //obniĹźanie odp magicznych
			this.lowStat[data.target].resf += parseInt(data.msgs["+resdmg"]);
			this.lowStat[data.target].resc += parseInt(data.msgs["+resdmg"]);
			this.lowStat[data.target].resl += parseInt(data.msgs["+resdmg"]);
		};
		if (data.msgs["+resdmgf"]) { //obniĹźanie odp od ognia
			this.lowStat[data.target].resf += parseInt(data.msgs["+resdmgf"]);
		};
		if (data.msgs["+resdmgc"]) { //obniĹźanie odp od zimna
			this.lowStat[data.target].resc += parseInt(data.msgs["+resdmgc"]);
		};
		if (data.msgs["+resdmgl"]) { //obniĹźanie odp od bĹyskĂłw
			this.lowStat[data.target].resl += parseInt(data.msgs["+resdmgl"]);
		};
	};
	this.onEnemyTurn = function(id, lostTurn) {
		if (!this.otherEnemyTurns[id].ignoreNext) {
			for (var i=0; i<this.otherEnemyTurns[id].allSlow.length; i++) {
				this.otherEnemyTurns[id].allSlow[i]++;
			};
		} else {
			this.otherEnemyTurns[id].ignoreNext = false;
		};
		this.updateAllSlow();
		if (this.titanShouted && !lostTurn) {
			this.titanShouted--;
			this.updateTitanShouted();
		};
	};
	this.onPartyTurn = function(id) {
		if (!this.otherTurns[id].ignoreNext) {
			for (var i=0; i<this.otherTurns[id].speedAura.length; i++) {
				this.otherTurns[id].speedAura[i]++;
			};
		} else {
			this.otherTurns[id].ignoreNext = false;
		};
		this.updateSpeedAura();
		if (id != hero.id) {
			this.partyTurns++;
			this.updatePartyTurns();
		};
	};
	this.updateSpeedAura = function() {
		var highest = {
			id: false,
			total: -1
		};
		for (var i in this.otherTurns) {
			var aura = this.otherTurns[i].speedAura;
			var total = (isset(aura[0]) || isset(aura[1])) ? ((aura[0] ? aura[0] : 0) + (aura[1] ? aura[1] : 0)) : -1;
			if (total > highest.total) {
				highest = {
					id: i,
					total: total
				};
			};
		};
		var speedAura = highest.id ? this.otherTurns[highest.id].speedAura : [];
		if (speedAura.length) {
			var html = "Aura SA: ";
			for (var i=0; i<speedAura.length; i++) {
				if (i > 0) html += " | ";
				var turn = speedAura[i];
				turn = Math.max(turn-1, 0); //pokazywaÄ musi wartoĹÄ o 1 mniejszÄ, poniewaĹź musi liczyÄ koniec danej tury a nie poczÄtek, ale pokazywanie -1 byĹo by gĹupie wiÄc pokazuje 0 zamiast tego
				html += turn >= 6 ? ("<span style='color: orange'>"+turn+"</span>") : turn;
			};
			this.$speedAura.html(html).show();
		} else {
			this.$speedAura.hide();
		};
	};
	this.updateCurse = function() {
		if (this.titanCursed) {
			this.$curse.show();
			if (this.titanPrepares) {
				this.titanPrepares = false;
				this.updatePrepares();
			};
		} else {
			this.$curse.hide();
		};
	};
	this.updateDistract = function() {
		if (this.titanDistracted) {
			this.$distract.show();
		} else {
			this.$distract.hide();
		};
	};
	this.updatePrepares = function() {
		if (this.titanPrepares) {
			this.$prepares.html(this.titanPrepares).show();
		} else {
			this.$prepares.hide();
		};
	};
	this.updateAllSlow = function() {
		var highest = {
			id: false,
			total: -1
		};
		for (var i in this.otherEnemyTurns) {
			var slow = this.otherEnemyTurns[i].allSlow;
			var total = (isset(slow[0]) || isset(slow[1])) ? ((slow[0] ? slow[0] : 0) + (slow[1] ? slow[1] : 0)) : -1;
			if (total > highest.total) {
				highest = {
					id: i,
					total: total
				};
			};
		};
		var allSlow = highest.id ? this.otherEnemyTurns[highest.id].allSlow : [];
		if (allSlow.length) {
			var html = "SzadĹş: ";
			for (var i=0; i<allSlow.length; i++) {
				if (i > 0) html += " | ";
				var turn = allSlow[i];
				turn = Math.max(turn-1, 0)
				html += turn >= 6 ? ("<span style='color: orange'>"+turn+"</span>") : turn;
			};
			this.$allSlow.html(html).show();
		} else {
			this.$allSlow.hide();
		};
	};
	this.updatePartyTurns = function() {
		if (this.party > 0) {
			if (this.partyTurns > this.party) this.partyTurns = this.party;
			this.$partyTurns.html("Wykonane ruchy: "+this.partyTurns+"/"+this.party).show();
		} else {
			this.$partyTurns.hide();
		};
	};
	this.updateTitanShouted = function() {
		if (this.titanShouted) {
			this.$titanShouted.html("Wyzyw: "+this.titanShouted).attr("tip", "Tyle tur zostaĹo do koĹca efektu umki wyzywajÄcy/prowokujÄcy okrzyk, uĹźytej przez gracza "+this.titanShoutedBy).show();
		} else {
			this.$titanShouted.hide();
		};
	};
	this.parseQuery = function(query) {
		var msgs = query.split(";");
		var msgs2 = {};
		var len = 0;
		var attacker = false;
		var team = false;
		var target = false;
		for (var i=0; i<msgs.length; i++) {
			var msg = msgs[i].split("=");
			if (!isNaN(parseInt(msg[0])) && msg[0] != 0) {
				//msg[0] to indentyfikator gracza
				if (!attacker) {
					attacker = msg[0];
					team = g.battle.f[msg[0]].team;
				} else {
					target = msg[0];
				};
			};
			msgs2[msg[0]] = typeof(msg[1]) == "undefined" ? true : msg[1];
			if (isNaN(parseInt(msg[0]))) {
				len++; //nie liczy identyfikatorĂłw graczy/potworĂłw
			};
		};
		if ((!msgs2.heal && !msgs2.poison && !msgs2.wound && !msgs2.fire && !msgs2.critwound && !msgs2.tspell) || (msgs2.tspell && len > 1) || msgs2.step || msgs2.prepare) { //faktyczna tura jest jeĹli w wiadomoĹci nie wystÄpujÄ rzeczy typu "xx obraĹźeĹ z trucizny", LUB wystÄpuje tspell i nie jest to jedyna rzecz, LUB zrobiony jest krok do przodu, LUB Ĺadowany jest spec
			var isTurn = true;
		} else {
			var isTurn = false;
		};
		return {msgs: msgs2, length: len, attacker: attacker, target: target, team: team, isTurn: isTurn};
	};
	this._g = _g;
	_g = function(query, arg2) {
		if (g.battle && query == "fight&a=f" && that.antiAuto) {
			mAlert("Czy na pewno chcesz daÄ F?", 2, [function() {
				that.antiAuto = false;
				_g("fight&a=f");
			}, function() {
				g.battle.nobut = false;
				that.$auto.stop().fadeIn();
			}]);
			return;
		};
		return that._g(query, arg2);
	};
	this.initHTML = function() {
		var $mainWrapper = $("<div>");
		$mainWrapper.css({
			"z-index": 300,
			position: "absolute",
			left: 0,
			top: 32,
			opacity: 0.8,
			background: "#000000",
			"font-size": "75%",
			display: "none"
		});
		
		var $speedAura = $("<div>");
		$speedAura.css({
			padding: 2,
			display: "none"
		});
		$speedAura.attr("tip", "Tyle tur temu byĹy uĹźywane aury SA.");
		this.$speedAura = $speedAura;
		
		var $curse = $("<div>");
		$curse.css({
			background: "#118000",
			padding: 2,
			display: "none"
		});
		$curse.attr("tip", "WrĂłg utraci nastÄpnÄ turÄ przez klÄtwÄ.");
		$curse.html("KlÄtwa aktywna");
		this.$curse = $curse;
		
		var $distract = $("<div>");
		$distract.css({
			background: "#118000",
			padding: 2,
			display: "none"
		});
		$distract.attr("tip", "WrĂłg jest wytrÄcony z rĂłwnowagi.");
		$distract.html("WytrÄcenie z rĂłwnowagi");
		this.$distract = $distract;
		
		var $prepares = $("<div>");
		$prepares.css({
			background: "#AA1100",
			padding: 2,
			display: "none"
		});
		$prepares.attr("tip", "Cios specjalny, ktĂłry tytan aktualnie Ĺaduje.");
		this.$prepares = $prepares;
		
		var $allSlow = $("<div>");
		$allSlow.css({
			padding: 2,
			display: "none"
		});
		$allSlow.attr("tip", "Tyle tur minÄĹo w przeciwnej druĹźynie od czasu uĹźywania szadzi/przeraĹźajacego okrzyku.");
		this.$allSlow = $allSlow;
		
		var $partyTurns = $("<div>");
		$partyTurns.css({
			padding: 2,
			display: "none"
		});
		$partyTurns.attr("tip", "Tyle osĂłb zrobiĹo turÄ, od kiedy Ty jÄ ostatnio miaĹeĹ/aĹ.");
		this.$partyTurns = $partyTurns;
		
		var $titanShouted = $("<div>");
		$titanShouted.css({
			padding: 2,
			display: "none"
		});
		this.$titanShouted = $titanShouted;
		
		$mainWrapper.append($prepares).append($curse).append($distract).append($partyTurns).append($speedAura).append($allSlow).append($titanShouted).appendTo("#centerbox");
		this.$mainWrapper = $mainWrapper;
		
		this.$auto = $("[tip='KoĹczy walkÄ automatycznie (skrĂłt - F)']"); //niestety div od tego guzika nie ma class ani nawet id ;-;
	};
	this.initHTML();
})();
