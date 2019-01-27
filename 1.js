(function(i){
	lootItem = function(e){
		~e.stat.indexOf("legendary") && message('<span style="color: #7ba1e5;"> Zdobyłeś przedmiot <span style="color: #BB0088;">LEGENDARNY</span>!</span>');
		~e.stat.indexOf("heroic") && message('<span style="color: #7ba1e5;"> Zdobyłeś przedmiot <span style="color: #2469D6;">HEROICZNY</span>!</span>');
		return i(e);
	}
 
})(lootItem);
