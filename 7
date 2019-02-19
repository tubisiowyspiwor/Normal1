
(() => {
    const addMembersToParty = event => {
        if (event.keyCode === 74 && !g.battle && hero.clan !== undefined && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            sendQuery();
        }
    }

    const getOnlineMembersIds = members => {
        const onlineMembers = new Array();
        for (let z = 0; z < members.length; z += 10) {
            if (members[z + 8] === "online" && members[z + 1] !== hero.nick) {
                onlineMembers.push(members[z]);
            }
        }

        return onlineMembers;
    }

    const sendInvitesToMembers = async members => {
        const sendAgain = new Array();

        for (const id of members) {
            const query = await fetch(`/engine?t=party&a=inv&id=${id}&aid=${g.aid}&browser_token=${g.browser_token}&ev=${g.ev}`, {
                method: 'POST',
                credentials: 'same-origin'
            });
            const result = await query.json();

            if (result.hasOwnProperty("w")) {
                result.w = undefined;
                sendAgain.push(id);
            }

            g.ev += 0.01;
            parseInput(result);
        }

        if (sendAgain.length > 0) sendInvitesToMembers(sendAgain);
    }

    const sendQuery = async () => {
        try {
            const query = await fetch(`/engine?t=clan&a=members&aid=${g.aid}&browser_token=${g.browser_token}&ev=${g.ev}`, {
                method: 'POST',
                credentials: 'same-origin'
            });
            const result = await query.json();

            const onlineMembers = getOnlineMembersIds(result.members2);

            result.members = undefined;
            result.members2 = undefined;

            g.ev += 0.01;
            parseInput(result);

            if (onlineMembers.length > 0) {
                sendInvitesToMembers(onlineMembers);
            }
        } catch (err) {
            message("Błąd podczas wysyłania zaproszeń.");
        }
    }
    document.addEventListener("keyup", addMembersToParty);
})()
