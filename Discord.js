
(function() {
    'use strict';
    var discordwebhook = getCookie('discordwebhook');
discordwebhook = (discordwebhook ? discordwebhook : "true|true");
discordwebhook = discordwebhook.split("|") ;
discordwebhook = (discordwebhook.length == 2 ? discordwebhook : [true, true]);
for(var i in discordwebhook)
	discordwebhook[i] = eval(discordwebhook[i]);

{
var menutoDW = $('<div/>')
    .append($('<span tip="DiscordWebhook" style="color:#44A9CE">DW</span>'))
    .append($('<input type="checkbox" tip="Powiadamiaj o e2 na Disordzie."/>')
        .attr('checked',discordwebhook[0])
        .change(function()
            {
                discordwebhook[0] = $(this).attr('checked');
                data = new Date(); data.setTime(data.getTime()+3600000*24*31);
                setCookie("discordwebhook", discordwebhook.join("|"), data);
            }))
	.append($('<input type="checkbox" tip="Powiadamiaj o herosach i tytanach na Discordzie."/>')
        .attr('checked', discordwebhook[1])
        .change(function()
            {
                discordwebhook[1] = $(this).attr('checked');
                data = new Date(); data.setTime(data.getTime()+3600000*24*31);
                setCookie("discordwebhook", discordwebhook.join("|"), data);
            }));

}


(function(old) {
    newNpc = function(a) {
        old(a);
        for (var i in a) {
         	/*if (a[i].wt>19 && discordwebhook[0]) {
                $.ajax({
                    url: "https://discordapp.com/api/webhooks/538471618704310283/tRIn33dDGJuRSc8q8QCIhDf4oYONQ64YRerfMraqqKEfKRokwdEOHLV16IdQOmrfoLlB",
                    type: "POST",
                    data: {
                      content: "**"+a[i].nick+"** "+map.name+" INFO `"+hero.nick+"`",
                    },
                });
            }*/
	    if (a[i].wt>19 && a[i].wt<=29 && discordwebhook[0] && a[i].wt<=99) {
                $.ajax({
                    url: "https://discordapp.com/api/webhooks/538479913330671628/m2NzF11WRYEywtfgXBVTCsvt8JFf5mHRkODfBM91t56zrBW36zNlHRTMMIsub4HwduDQ",
                    type: "POST",
                    data: {
                      content: "@here **"+a[i].nick+"** INFO `"+hero.nick+"`",
                    },
                });
            }
            if (a[i].wt>79 && discordwebhook[1] && a[i].wt<=99) {
              $.ajax({
                    url: "https://discordapp.com/api/webhooks/538471618704310283/tRIn33dDGJuRSc8q8QCIhDf4oYONQ64YRerfMraqqKEfKRokwdEOHLV16IdQOmrfoLlB",
                    type: "POST",
                    data: {
                        content: "@here **Heros** `"+a[i].nick+"` na mapie "+map.name+" "+a[i].x+","+a[i].y+" INFO `"+hero.nick+"`",
                    },
                });
              }
         	if (a[i].wt>99 && discordwebhook[1] && a[i].lvl>36) {
                $.ajax({
                    url: "https://discordapp.com/api/webhooks/538471618704310283/tRIn33dDGJuRSc8q8QCIhDf4oYONQ64YRerfMraqqKEfKRokwdEOHLV16IdQOmrfoLlB",
                    type: "POST",
                    data: {
                        content: "@everyone **Tytan** `"+a[i].nick+"` na mapie "+map.name+" INFO `"+hero.nick+"`",
                    },
                });
            };
        };
    };
    })(newNpc);
})();
