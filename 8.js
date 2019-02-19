(() => {
  const chatWith = nick =>
    () =>
      window.chatTo(nick)

  const addToGroup = id =>
    () =>
      window._g(`party&a=inv&id=${id}`)

  const STORAGE_KEY = 'klanowicze_online'

  const config = {
    areMembersHidden: false,
    top: '200px',
    left: '10px'
  }

  const updateStorage = modifiedStorage =>
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(modifiedStorage)
    )

  const updateStorageAndConfig = changes =>
    updateStorage(
      Object.assign(config, changes)
    )

  const storage = localStorage.getItem(STORAGE_KEY)

  try {
    if(storage !== null)
      Object.assign(config, JSON.parse(storage))
  } catch(error) {
    console.error('Klanowicze online:', error)
  }

  const appendCorners = element => {
    const cor1 = document.createElement('div')
    Object.assign(cor1.style, { background: 'url(img/tip-cor.png) no-repeat 0px 0px', position: 'absolute', top: '-6px', left: '-6px', width: '35px', height: '23px' })
    const cor2 = document.createElement('div')
    Object.assign(cor2.style, { background: 'url(img/tip-cor.png) no-repeat -35px 0px', position: 'absolute', bottom: '-6px', right: '-6px', width: '35px', height: '23px' })
    element.appendChild(cor1)
    element.appendChild(cor2)
  }

  const container = document.createElement('div')
  container.id = 'klanowicze-online'
  Object.assign(container.style, {
    boxSizing: 'border-box',
    position: 'absolute',
    left: config.left,
    top: config.top,
    border: '3px #6495ED double',
    color: '#eeeeee',
    width: '210px',
    backgroundColor: 'black',
    fontSize: '16px',
    zIndex: 500
  })

  const title = document.createElement('div')
  title.textContent = 'Klanowicze online'
  Object.assign(title.style, {
    fontSize: '1.1em',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #6495ED'
  })
  container.appendChild(title)

  const membersTable = document.createElement('table')
  Object.assign(membersTable.style, {
    fontSize: '0.7em',
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed'
  })

  const membersTableWrapper = document.createElement('div')
  membersTableWrapper.hidden = config.areMembersHidden
  membersTableWrapper.style.padding = '1px'

  membersTableWrapper.appendChild(membersTable)
  container.appendChild(membersTableWrapper)

  const hideMembersButton = document.createElement('div')
  hideMembersButton.textContent = config.areMembersHidden
    ? 'Rozwiń'
    : 'Zwiń'
  Object.assign(hideMembersButton.style, {
    fontSize: '0.8rem',
    textAlign: 'center',
    cursor: 'pointer',
    borderTop: '1px solid #6495ED'
  })
  container.appendChild(hideMembersButton)

  appendCorners(container)

  const retrieveEv = () => {
    const { ev } = g
    if(!ev)
      return
    g.ev += 0.01
    return ev
  }

  const parseInputWithMembers = input => {
    if(typeof input !== 'object')
      return input

    const pureInput = Object.assign({}, input, {
      members: undefined,
      members2: undefined
    })
    if(Object.keys(pureInput).length)
      window.parseInput(pureInput)

    return input
  }

  const fetchMembers = () =>
    new Promise(resolve => {
      if(g.battle){
        resolve(null)
        return
      }

      const ev = retrieveEv()
      const path = `/engine?t=clan&a=members&aid=${g.aid}&browser_token=${g.browser_token}${
        ev ? `&ev=${ev}` : ''
      }`

      fetch(path, {
        method: 'POST',
        credentials: 'same-origin'
      })
      .then(data => data.json())
      .then(parseInputWithMembers)
      .then(json => json.members2 || null)
      .then(resolve)
      .catch(() => resolve(null))
    })

  // [ id, nick, lvl, prof, map, x, y, ?, onlineStatus, icon ]
  const MEMBER_TUPLE_LENGTH = 10
  const renderOnlineMembers = members => {
    if(members === null)
      return

    const membersTableBody = document.createElement('tbody')

    let onlineMembersCount = 0
    let wasHeroCounted = false
    for(let i = 0; i <= members.length; i += MEMBER_TUPLE_LENGTH){
      const onlineStatus = members[i+8]
      if(onlineStatus !== 'online')
        continue

      onlineMembersCount++

      const nick = members[i+1]
      if(nick === hero.nick){
        wasHeroCounted = true
        continue
      }

      const id = members[i]
      const lvl = members[i+2]
      const prof = members[i+3]
      const map = members[i+4]
      const x = members[i+5]
      const y = members[i+6]

      const row = membersTableBody.insertRow()
      row.classList.add('ko-row')

      const addToGroupCell = row.insertCell()
      addToGroupCell.textContent = '+'
      addToGroupCell.tip = 'Dodaj do grupy'
      addToGroupCell.classList.add('ko-add-to-group-cell')
      addToGroupCell.addEventListener('click', addToGroup(id))

      const nickCell = row.insertCell()
      nickCell.textContent = `${nick} (${lvl}${prof})`
      nickCell.classList.add('ko-nick-cell')
      nickCell.addEventListener('click', chatWith(nick))

      const mapCell = row.insertCell()
      mapCell.textContent = map
      mapCell.tip = `${map} (${x},${y})`
      mapCell.classList.add('ko-map-cell')
    }

    if(!wasHeroCounted)
      onlineMembersCount++

    title.tip = onlineMembersCount === 1
      ? 'Jesteś tylko ty'
      : `${onlineMembersCount} klanowiczów (Łącznie z Tobą)`

    if(membersTable.tBodies.length === 0){
      membersTable.appendChild(membersTableBody)
      return
    }

    membersTable.replaceChild(membersTableBody, membersTable.tBodies[0])
  }

  //style table rows and cells
  const tableStyle = document.createElement('style')
  tableStyle.textContent = `
    .ko-row {
      border: solid;
      border-width: 1px 0;
      border-color: #D3D3D3;
      height: 1.6em;
    }
    .ko-row:hover {
      background: #0b275b;
    }
    .ko-row:first-child {
      border-top: none;
    }
    .ko-row:last-child {
      border-bottom: none;
    }

    .ko-add-to-group-cell, .ko-nick-cell {
      cursor: pointer;
      user-select: none;
    }
    .ko-add-to-group-cell:hover, .ko-nick-cell:hover {
      color: #00ffff;
    }

    .ko-add-to-group-cell {
      text-align: center;
      width: 12px;
    }

    .ko-map-cell {
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
  document.body.appendChild(tableStyle)

  const fetchAndRenderOnlineMembers = () =>
    fetchMembers().then(renderOnlineMembers)

  let fetchMembersInterval = null
  const startMembersFetching = () => {
    fetchAndRenderOnlineMembers()
    fetchMembersInterval = setInterval(fetchAndRenderOnlineMembers, 10000)
  }

  const stopMembersFetching = () => {
    clearInterval(fetchMembersInterval)
  }

  const handleHideMembersButtonClick = () => {
    const modifiedAreMembersHidden = !config.areMembersHidden
    membersTableWrapper.hidden = modifiedAreMembersHidden
    updateStorageAndConfig({
      areMembersHidden: modifiedAreMembersHidden
    })

    if(modifiedAreMembersHidden){
      stopMembersFetching()
      hideMembersButton.textContent = 'Rozwiń'
      return
    }

    startMembersFetching()
    hideMembersButton.textContent = 'Zwiń'
  }

  hideMembersButton.addEventListener('click', handleHideMembersButtonClick)

  const getDoggoImage = () => {
    const doggo = new Image
    doggo.src = 'https://i.imgur.com/jti8ksH.png'
    doggo.style.width = '100%'
    return doggo
  }

  g.loadQueue.push({ fun: () => {
    if(!hero.clan)
      return

    if(config.areMembersHidden || startMembersFetching(),
       hero.clan.id === 2225 && g.worldname === 'nomada')
      container.replaceChild(getDoggoImage(), title)

    document.body.appendChild(container)
  }})

  $(container).draggable({
    cancel: 'table', //can't drag membersTable
    start: function(){
      g.lock.add('ko')
    },
    stop: function(){
      g.lock.remove('ko')
      const { top, left } = container.style
      updateStorageAndConfig({ top, left })
    }
  })

  const msg = document.createElement('div')
  msg.textContent = 'Klanowicze online / Reskiezis'
  msg.style.color = 'chartreuse'
  document.getElementById('contxt').appendChild(msg)
})();
