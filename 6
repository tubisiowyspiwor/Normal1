window.g.loadQueue.push({
    fun() {
        let a = window.getCookie("mchar_id"),
            d = !1,
            e = !1;
        const f = window._g;
        window._g = (a, b) => {
            e || f(a, b)
        };
        const g = window.parseInput,
            h = a => new Promise(b => {
                fetch(`/engine?t=init&initlvl=${a}&clientTs=${new Date().getTime()/1e3}&mucka=${Math.random()}&aid=${window.g.aid}${window.g.browser_token?`&browser_token=${window.g.browser_token}`:``}`, {
                    method: "POST",
                    credentials: "same-origin"
                }).then(a => a.json()).then(a => b(a)).catch(() => b())
            }),
            i = a => {
                const b = {};
                return Object.keys(a).forEach(a => {
                    b[a] = {
                        del: !0
                    }
                }), b
            },
            j = (a = !1) => {
                const b = {};
                for (const [c, {
                        loc: d
                    }] of Object.entries(window.g.item))("g" !== d || !0 === a) && (b[c] = {
                    del: !0
                });
                return b
            },
            k = () => {
                const a = {};
                a.npc = i(window.g.npc), a.item = j(), a.other = i(window.g.other), g(a), window.g.chat.lastwrite = "", window.g.chat.tabs = [
                    [],
                    [],
                    [],
                    []
                ], window.g.gw = {}, document.querySelectorAll(".gw, .rip").forEach(a => a.remove()), document.querySelector("#ground").style.background = "gray", document.querySelector("#bground").style.background = "gray", document.querySelector("#chattxt").innerHTML = ""
            },
            l = async () => {
                if (!0 === e) return;
                let b = !1;
                e = !0, window.g.gameLoader = new window.GameLoader, k();
                for (let c = 1; 5 > c; c++) {
                    const d = await h(c);
                    if (d.hasOwnProperty("h") && d.h.hasOwnProperty("id") && (d.h.id === parseInt(a) ? b = !0 : (a = d.h.id, g({
                            item: j(!0)
                        }))), !0 == b && d.hasOwnProperty("item")) {
                        for (const [a, {
                                loc: b
                            }] of Object.entries(d.item)) "g" === b && delete d.item[a];
                        b = !1
                    }
                    g(d), 2 == c && window.map.center(32 * window.hero.x, 32 * window.hero.y - 16)
                }
                e = !1, q = !0
            };
        window.parseInput = (a, e, b) => {
            const {
                logoff_time_left: c,
                t: f
            } = a;
            c !== void 0 && (d = 5 === c), "reload" === f && !1 === d && (delete a.t, delete window.g.browser_token, l()), g(a, e, b)
        };
        const m = () => {
                for (const a of Object.keys(window.g.gw)) {
                    const [b, c] = a.split(".");
                    if (window.hero.x === parseInt(b) && window.hero.y === parseInt(c)) return !0
                }
                return !1
            },
            n = document.createElement("div");
        n.appendChild(document.createTextNode("Przechod\u017A szybciej przez mapki nie tylko na red")), n.style.backgroundPosition = "0px -22px", document.querySelector("#cfg_options").appendChild(n), n.addEventListener("click", () => {
            !0 === JSON.parse(localStorage.getItem("adi-szybkie-przechodzenie")) ? (localStorage.setItem("adi-szybkie-przechodzenie", JSON.stringify(!1)), n.style.backgroundPosition = "0px 0px") : (localStorage.setItem("adi-szybkie-przechodzenie", JSON.stringify(!0)), n.style.backgroundPosition = "0px -22px")
        }), null === localStorage.getItem("adi-szybkie-przechodzenie") ? localStorage.setItem("adi-szybkie-przechodzenie", JSON.stringify(!0)) : !0 === JSON.parse(localStorage.getItem("adi-szybkie-przechodzenie")) ? n.style.backgroundPosition = "0px -22px" : n.style.backgroundPosition = "0px 0px";
        const o = () => {
                const a = window.road.length;
                if (0 < a) return window.road[a - 1]
            },
            p = a => {
                if (a !== void 0) {
                    const {
                        x: b,
                        y: c
                    } = a;
                    if (window.hero.x !== b || window.hero.y !== c) return !1
                }
                return !0
            };
        let q = m();
        window.hero = new Proxy(window.hero, {
            set(a, b) {
                const c = o();
                Reflect.set(...arguments);
                const d = JSON.parse(localStorage.getItem("adi-szybkie-przechodzenie"));
                ["x", "y"].includes(b) && (!0 === d || !1 === d && 2 === window.map.pvp) && (m() ? !1 === q && !1 === e && p(c) && f("walk") : !0 === q && (q = !1))
            }
        })
    }
});
