let shdks = new Array(); 

async function fetchData() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTmuybrFhvKypGiMaQBcIXBTisBu2TFOtUP3g5cVmjdGQOV_p9pp7sBD_GwM5zCNTYA2Dt6Zgr3PRFO/pubhtml');
    const text = await response.text();
    return text;
}

function extractTableData(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');
    return table;
}

async function getAllSHDK() {
    let html = await fetchData();
    const table = extractTableData(html);

    const rows = table.querySelectorAll('tbody tr');
    const shdkNumbers = rows[1].querySelectorAll('td');
    const times = rows[2].querySelectorAll('td');
    const subjects = rows[3].querySelectorAll('td');
    const tods = rows[6].querySelectorAll('td');
    const speaker1 = rows[7].querySelectorAll('td');
    const eva1 = rows[8].querySelectorAll('td');
    const speaker2 = rows[9].querySelectorAll('td');
    const eva2 = rows[10].querySelectorAll('td');
    const speaker3 = rows[11].querySelectorAll('td');
    const eva3 = rows[12].querySelectorAll('td');
    const speaker4 = rows[13].querySelectorAll('td');
    const eva4 = rows[14].querySelectorAll('td');
    const speaker5 = rows[15].querySelectorAll('td');
    const eva5 = rows[16].querySelectorAll('td');
    const speaker6 = rows[17].querySelectorAll('td');
    const eva6 = rows[18].querySelectorAll('td');
    const ges = rows[19].querySelectorAll('td');
    const timers = rows[20].querySelectorAll('td');
    const ahcounters = rows[21].querySelectorAll('td');
    const grammarians = rows[22].querySelectorAll('td');
    const topicmasters = rows[23].querySelectorAll('td');
    const evatopicmasters = rows[25].querySelectorAll('td');
    const gamers = rows[26].querySelectorAll('td');
    


    shdkNumbers.forEach((shdk, index) => { 
        shdks.push({
            shdk: shdk.textContent, 
            time: times[index].textContent,
            subject: subjects[index].textContent,
            tod: tods[index].textContent,
            speaker1: speaker1[index].textContent,
            eva1: eva1[index].textContent,
            speaker2: speaker2[index].textContent,
            eva2: eva2[index].textContent,
            speaker3: speaker3[index].textContent,
            eva3: eva3[index].textContent,
            speaker4: speaker4[index].textContent,
            eva4: eva4[index].textContent,
            speaker5: speaker5[index].textContent,
            eva5: eva5[index].textContent,
            speaker6: speaker6[index].textContent,
            eva6: eva6[index].textContent,
            ge: ges[index].textContent,
            timer: timers[index].textContent,
            ahcounter: ahcounters[index].textContent,
            grammarian: grammarians[index].textContent,
            topicmaster: topicmasters[index].textContent,
            evatopicmaster: evatopicmasters[index].textContent,
            gamer: gamers[index].textContent,
        }) 
    });

    shdks = shdks.slice(1);
}
