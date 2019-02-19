
window.bot = new function() {
    function b(K, L) {
        return Math.abs(K.x - L.x) + Math.abs(K.y - L.y)

    }
    function d(K, L) {
        return new s(map.col, map.x, map.y, {
            x: hero.x,
            y: hero.y
        }, {
            x: K,
            y: L
        }, g.npccol).anotherFindPath()
    }

    function e(K, L) {
        let M = d(K, L);
        Array.isArray(M) && (window.road = M)
    }

    function f(K) {
        let L = g.npc[K];
        if (L.grp)
            for (let M in g.npc) g.npc[M].grp != L.grp || I.includes(g.npc[M].id) || I.push(g.npc[M].id);
        else I.includes(K) || I.push(K)
    }

    function k() {
        for (let K in g.npc) {
            let L = g.npc[K];
            if ((2 == L.type || 3 == L.type) && L.wt > 70 && o(L.id) && hero.lvl + 30 >= L.lvl && 2 > Math.abs(hero.x - L.x) && 2 > Math.abs(hero.y - L.y) && q()) return _g(`fight&a=attack&ff=1&id=-${L.id}`)
        }
    }

    function l(K) {
        let L = 'https://discordapp.com/api/webhooks/539162728703590460/ZYXzDHs7p2WdKVu3z4oQ_3PUDBwRm1sX84ky-akl3SqNDwXnfh_MTf9p0D8qIZfKTFQj';
        $.ajax({
            url: L,
            type: "POST",
            data: JSON.stringify({
                content: K,
                username: hero.nick,
                avatar_url: `http://margonem.pl/obrazki/itemy/upg/upg01.gif`
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: !1
        })
    }

    function m() {
        let K = new Date,
            L = K.getHours(),
            M = K.getSeconds(),
            N = K.getMinutes();
        return 10 > L && (L = `0${L}`), 10 > N && (N = `0${N}`), 10 > M && (M = `0${M}`), `${L}:${N}:${M}`
    }

    function o(K) {
        return g.npc[K].grp && (!p(g.npc[K].grp) || r[localStorage.getItem(`bot_expowiska`)].ignore_grp && r[localStorage.getItem(`bot_expowiska`)].ignore_grp.includes(g.npc[K].grp)) ? !1 : !0
    }

    function p(K) {
        for (let L in g.npc)
            if (g.npc[L].grp == K && g.npc[L].wt < 19) return !1;
        return !0
    }

    function q() {
        return !!(70 < 100 * (hero.hp / hero.maxhp))
    }
    mAlert = function() {}, "undefined" == typeof g && -1 < document.location.href.indexOf("margonem.pl") && document.location.reload();
    let r = {
        "eve50 orki": {
            map: "Nawiedzony Jar, Zburzona Twierdza, Opuszczony Bastion, Zburzona Twierdza"
        },
        "eve50 gora nithal": {
            map: "Podgrodzie Nithal, Nizina Wieśniaków, Gościniec Bardów, Nizina Wieśniaków"
        },
        "eve50 lewo eder": {
            map: "Spokojne Przejście, Zasłonięte Jezioro, Racicowy Matecznik, Zasłonięte Jezioro"
        },
         "eve50 prawo kwiatki": {
            map: "Lazurowe Wzgórze, Słoneczna Wyżyna, Zasłonięte Jezioro, Słoneczna Wyżyna"
        },
        "eve50 ghule-mokradła": {
            map: "Wioska Ghuli, Dolina Rozbójników, Mokradła, Dolina Rozbójników"
        },
          "eve50 eder prawo": {
            map: "Stukot Widmowych Kół, Stary Kupiecki Trakt, Fort Eder, Stary Kupiecki Trakt "
        },
        "eve50 góra eder": {
        map: "Ciemnica Szubrawców p.1 - sala 1, Ciemnica Szubrawców p.1 - sala 2, Ciemnica Szubrawców p.1 - sala 3, Ciemnica Szubrawców p.1 - sala 2",
        mobs_id: [63996]
        },
          "250eve drzewa": {
        map: "Atlepetl Mahoptekan, Źródło Zakorzenionego Ludu,  Regiel Zabłąkanych,  Wąwóz Zakorzenionych Dusz, Urwisko Zdrewniałych,  Wąwóz Zakorzenionych Dusz,  Regiel Zabłąkanych,  Źródło Zakorzenionego Ludu",
        mobs_id: [63996]
        },
    };
    class s {
        constructor(K, L, M, N, O, P) {
            this.width = L, this.height = M, this.collisions = this.parseCollisions(K, L, M), this.additionalCollisions = P || {}, this.start = this.collisions[N.x][N.y], this.end = this.collisions[O.x][O.y], this.start.beginning = !0, this.start.g = 0, this.start.f = b(this.start, this.end), this.end.target = !0, this.end.g = 0, this.addNeighbours(), this.openSet = [], this.closedSet = [], this.openSet.push(this.start)
        }
        parseCollisions(K, L, M) {
            const N = Array(L);
            for (let O = 0; O < L; O++) {
                N[O] = Array(M);
                for (let P = 0; P < M; P++) N[O][P] = new t(O, P, "1" === K.charAt(O + P * L))
            }
            return N
        }
        addNeighbours() {
            for (let K = 0; K < this.width; K++)
                for (let L = 0; L < this.height; L++) this.addPointNeighbours(this.collisions[K][L])
        }
        addPointNeighbours(K) {
            const L = K.x,
                  M = K.y,
                  N = [];
            0 < L && N.push(this.collisions[L - 1][M]), 0 < M && N.push(this.collisions[L][M - 1]), L < this.width - 1 && N.push(this.collisions[L + 1][M]), M < this.height - 1 && N.push(this.collisions[L][M + 1]), K.neighbours = N
        }
        anotherFindPath() {
            for (; 0 < this.openSet.length;) {
                let K = this.getLowestF(),
                    L = this.openSet[K];
                if (L === this.end) return this.reconstructPath();
                this.openSet.splice(K, 1), this.closedSet.push(L);
                for (const M of L.neighbours)
                    if (this.closedSet.includes(M)) continue;
                    else {
                        const N = L.g + 1;
                        let O = !1;
                        this.end != this.collisions[M.x][M.y] && (this.openSet.includes(M) || M.collision || this.additionalCollisions[M.x + 256 * M.y]) ? N < M.g && !M.collision && (O = !0) : (this.openSet.push(M), M.h = b(M, this.end), O = !0), O && (M.previous = L, M.g = N, M.f = M.g + M.h)
                    }
            }
        }
        getLowestF() {
            let K = 0;
            for (let L = 0; L < this.openSet.length; L++) this.openSet[L].f < this.openSet[K].f && (K = L);
            return K
        }
        reconstructPath() {
            const K = [];
            for (let L = this.end; L !== this.start;) K.push(L), L = L.previous;
            return K
        }
    }
    class t {
        constructor(K, L, M) {
            this.x = K, this.y = L, this.collision = M, this.g = 1e7, this.f = 1e7, this.neighbours = [], this.beginning = !1, this.target = !1, this.previous = void 0
        }
    }
    localStorage.getItem(`bot_lastmaps`) || localStorage.setItem(`bot_lastmaps`, JSON.stringify([]));
    let v = this,
        z = !1,
        A = !1,
        B, C, D, E = 0,
        F = !1,
        G = !1;
    g.loadQueue.push({
        fun: () => {
            G = !0
        }
    });
    let H = !0,
        I = [];
    setInterval(function() {
        B && (B = void 0)
    }, 1000);
    let J;
    this.PI = parseInput, parseInput = function(K) {
        let L = v.PI.apply(this, arguments);
        if (!g.battle && !g.dead && G) {

            if (!B && !F) {
                if (B = v.findBestMob(), !B && localStorage.getItem(`bot_expowiska`)) {
                    let M, N = 9999;
                    if (r[localStorage.getItem(`bot_expowiska`)].mobs_id) {
                        let O = r[localStorage.getItem(`bot_expowiska`)].mobs_id;
                        for (let P in O) g.npc[O[P]] && (M = d(g.npc[O[P]].x, g.npc[O[P]].y).length, M < N && (N = M, B = O[P]))
                    }
                }
                A = !1, z = !1
            }
            if (B) {
                let M = g.npc[B];
                if (!M) return B = void 0, L;
                2 > Math.abs(hero.x - M.x) && 2 > Math.abs(hero.y - M.y) && !z ? (z = true, setTimeout(function(){ _g(`fight&a=attack&ff=0&id=-${M.id}`, function(N) {
                    N.alert && `Przeciwnik walczy już z kimś innym` == N.alert && (f(M.id), B = void 0)

                })}, 500), setTimeout(function() {
                    B = void 0
                }, Math.floor(Math.random() * 500) + 2000)) : !A && !z && (e(M.x, M.y), A = !0)
            } else 0 < document.querySelector(`#bot_maps`).value.length && (J = v.findBestGw(), J && !F && (hero.x == J.x && hero.y == J.y ? _g(`walk`) : (e(J.x, J.y), F = !0, setTimeout(function() {
                F = !1
            }, 500))));
            D == hero.y && C == C ? (E++, 4 < E && (k(), E = 0, B = void 0, J = void 0, F = !1)) : (D = hero.y, C = hero.x, E = 0)
        }
        if (g.dead && H && (H = !1, l(`Padłem na ${hero.lvl}${hero.prof} - ${m()}`), document.location.href = `http://margonem.pl`), K.hasOwnProperty("f") && 1 == K.f.init && 0 < hero.clan && !Object.keys(K.f.w).some(M => 0 > M)) {
            const M = [],
                  N = [];
            for (let O of Object.values(K.f.w)) 1 == O.team && M.push(`${O.name} ${O.lvl}${O.prof}`) || N.push(`${O.name} ${O.lvl}${O.prof} `);
            if (2 == K.f.myteam && -1 < document.querySelector(`#bot_maps`).value.indexOf(map.name)) {
                const O = `Zostałem zaatakowany na mapie ${map.name} o godzinie ${m()}.\n${M.join(", ")} vs ${N.join(", ")}`;
                l(O)
            }
        }
        return L
    }, this.findBestMob = function() {
        let K, M, L = 9999;
        for (let N in g.npc) {
            let P, Q, R, O = g.npc[N];

            if (-1 < document.querySelector(`#bot_mobs`).value.indexOf(`-`) && (P = document.querySelector(`#bot_mobs`).value.split(`-`), Q = parseInt(P[0]), R = parseInt(P[1])), (2 == O.type || 3 == O.type) && P && O.lvl <= R && O.lvl >= Q && o(O.id) && !I.includes(O.id) && 20 < O.wt) {
                if (K = d(O.x, O.y), void 0 == K) continue;
                K.length < L && (L = K.length, M = O.id)
            }
        }
        return M
    }, localStorage.getItem(`alksjd`) || localStorage.setItem(`alksjd`, 0), this.findBestGw = function() {
        let K, L = document.querySelector(`#bot_maps`).value.split(`, `),
            M = parseInt(localStorage.getItem(`alksjd`));
        for (let N in g.townname)
            if (L[M] == g.townname[N]) {
                let O = g.gwIds[N].split(`.`);
                return K = {
                    x: O[0],
                    y: O[1]
                }, K
            } M++, M > L.length && (M = 0), localStorage.setItem(`alksjd`, parseInt(M))
    }, this.initHTML = function() {
        if (!localStorage.getItem(`bot_position`)) {
            localStorage.setItem(`bot_position`, JSON.stringify({
                x: 0,
                y: 0
            }))
        }
        let K = JSON.parse(localStorage.getItem(`bot_position`)),
            L = document.createElement(`div`);
        L.id = `bot_box`, L.setAttribute(`tip`, `Złap i przenieś :)`);
        let M = document.createElement(`input`);
        M.type = `text`, M.id = `bot_mobs`, M.classList.add(`bot_inputs`), M.setAttribute(`tip`, `Jakie lvle bić? wprowadź np. 49-51`), L.appendChild(M);
        let N = document.createElement(`input`);
        N.type = `text`, N.id = `bot_maps`, N.classList.add(`bot_inputs`), N.setAttribute(`tip`, `To możesz sam wpisać`), L.appendChild(N);
        let O = document.createElement(`select`);
        O.id = `bot_list`, O.classList.add(`bot_inputs`), O.setAttribute(`tip`, `Gdzie zapierdalać, kierowniku?`);
        for (let S, R = 0; R < Object.keys(r).length; R++) S = document.createElement(`option`), S.setAttribute(`value`, Object.keys(r)[R]), S.text = Object.keys(r)[R], O.appendChild(S);
        L.appendChild(O), document.body.appendChild(L);
        let P = document.createElement(`style`);
        P.type = `text/css`;
        let Q = `
#bot_box {
position: absolute;
border: 2px solid #6495ED;
padding: 5px;
text-align: center;
background: black;
cursor: grab;
left: ${K.x}px;
top: ${K.y}px;
width: auto;
height: auto;
z-index: 390;
}
.bot_inputs {
-webkit-box-sizing: content-box;
-moz-box-sizing: content-box;
box-sizing: content-box;
margin: 0 auto;
margin-bottom: 3px;
padding: 2px;
cursor: pointer;
border: 2px solid #6495ED;
-webkit-border-radius: 5px;
border-radius: 5px;
font: normal 16px/normal "Times New Roman", Times, serif;
color: rgba(0,142,198,1);
-o-text-overflow: clip;
text-overflow: clip;
background: rgba(234,227,227,1);
-webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
text-shadow: 1px 1px 0 rgba(255,255,255,0.66) ;
display: block;
}
input[id=bot_mobs] {
text-align: center;
}
#bot_blessingbox {
border: 1px solid red;
background: gray;
height: 32px;
width: 32px;
margin: 0 auto;
}
`;
        P.appendChild(document.createTextNode(Q)), document.head.appendChild(P), localStorage.getItem(`bot_mobs`) && (M.value = localStorage.getItem(`bot_mobs`)), localStorage.getItem(`bot_maps`) && (N.value = localStorage.getItem(`bot_maps`)), localStorage.getItem(`bot_expowiska`) && r[localStorage.getItem(`bot_expowiska`)] && (O.value = localStorage.getItem(`bot_expowiska`)), M.addEventListener(`keyup`, () => {
            localStorage.setItem(`bot_mobs`, M.value)
        }), N.addEventListener(`keyup`, () => {
            localStorage.setItem(`bot_maps`, N.value)
        }), O.addEventListener(`change`, () => {
            localStorage.setItem(`bot_expowiska`, O.value), N.value = r[O.value].map, localStorage.setItem(`bot_maps`, N.value), localStorage.setItem(`alksjd`, 0), message(`Zapisano expowisko "${O.value}"`)
        }), $(`#bot_box`).draggable({
            stop: () => {
                let R = {
                    x: parseInt(document.querySelector(`#bot_box`).style.left),
                    y: parseInt(document.querySelector(`#bot_box`).style.top)
                };
                localStorage.setItem(`bot_position`, JSON.stringify(R)), message(`Zapisano pozycję`)
            }
        })
    }, this.initHTML()
};
