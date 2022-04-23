var container = document.getElementById("container")
var indexWalletBut = document.getElementById("indexWalletBut")
var clickCase = document.getElementById("clickCase")

var hisN = document.getElementById("hisN")
var hisC = document.getElementById("hisC")

// Print Message insted of console log
function msx(m) {
    var mm = document.createElement("div")
    mm.innerText = m
    document.getElementById("mesCon").appendChild(mm)
}

// TOOLS
var isStart = false
var isClick = false

var nHis = 0
var nRepeat = 100

var hisSeeds = []
var hisAddress = []


indexWalletBut.addEventListener("click", function() {
    if (isStart === false) {
        isClick = true
        clickCase.innerText = "Index Stop"
        indexWallet()
    } else {
        isClick = false
    }
})
// ***MAIN FUNCTION GUESS THE WALLET

var isDataBase = false
var nTimes = 0

async function indexWallet(wt) {
    if (wt !== false) {

        if (hisSeeds.length >= hisAddress.length) {

            var seedWallet = "impact chalk library like crane excuse crisp cost range extend intact ladder"
            var addr = await phraseChanged(seedWallet)

            hisAddress.push(addr)
            hisN.innerText = hisAddress.length

            nTimes = nTimes + 1
            nHis = nHis + 1

            if (nTimes < nRepeat && isClick === true) {
                setTimeout(indexWallet, 10);
                
            } else {
                indexWallet(false)
            }


        } else {
            indexWallet(false)
        }


    } else {
        // push the data that you have
        isStart = false
        isClick = false
        nTimes = 0
        clickCase.innerText = "Index Start"

        if (isDataBase === false) {
            isDataBase = true
            setDataBase()
        }
    }
}

var seedPre = false
var currentSeed = -1

function showMore() {
    var untilSt = st + 200
    if (hisSeeds.length <= untilSt) {
        untilSt = hisSeeds.length
        document.getElementById("shMore").style.display = "none"
    }
    for (var wa = st; wa < untilSt; wa ++) {
        var stringSeed = ""

        hisSeeds[wa].split(" ").forEach(ns=> {
            stringSeed = stringSeed.concat(pass[ns]+" ")
        })

        stringSeed = stringSeed.slice(0, stringSeed.length - 1)

        var hisChild = document.createElement("div")
        hisChild.innerHTML = `<div>${wa}</div><div id="seed_${wa}" ${seedRead.includes(wa) ? 'class="hisTakeIt"': ""} onclick="pointThis(${wa})">${stringSeed}</div>`
        hisC.appendChild(hisChild)
    }
    st = st + 200
}

var didSer = false
var butSearch = document.getElementById("butSearch")

butSearch.addEventListener("click", async function() {
    if (didSer === false) {

        didSer = true
        hisC.innerText = "Loading ..."
        document.getElementById("shMore").style.display = "none"

        var wrr = document.getElementById("searchInput").value

        var d = ""

        if (wrr.length > 0) {
            var sn = wrr.replace(/ /g, "")
            if (/^[0-9]+$/.test(sn)) {
                if (hisSeeds[sn] !== undefined) {
                    var stringSeed = ""

                    hisSeeds[sn].split(" ").forEach(ns=> {
                        stringSeed = stringSeed.concat(pass[ns]+" ")
                    })

                    stringSeed = stringSeed.slice(0, stringSeed.length - 1)
                    d = d.concat(`<div><div id="seed_${sn}" onclick="pointThis(${sn})">${stringSeed}</div></div>`)
                } else {
                    d = d.concat(`This number does not exist`)
                }
                didSer = false
                hisC.innerHTML = d
            } else {
                searchSeeds(wrr).then((e)=> {
                    didSer = false
                    hisC.innerHTML = e
                })
            }
        } else {
            didSer = false
            setDataBase()
        }
    }
})

function searchSeeds(wrr) {
    return new Promise(resolve => {
        var d = ""
        var u = 0
        var con = ""
        try {
            wrr = wrr.replace(/[0-9]/g, '')
            wrr.split(" ").forEach(e=> {
                var sd = pass.indexOf(e)
                if (sd !== -1) {
                    con = con.concat(sd+ " ")
                }
            })
            con = con.slice(0,
                con.length - 1)
            if (con.length > 0) {
                for (var u = 0; u < hisSeeds.length; u++) {
                    if (hisSeeds[u].includes(con)) {
                        var stringSeed = ""
                        hisSeeds[u].split(" ").forEach(ns=> {
                            stringSeed = stringSeed.concat(pass[ns]+" ")
                        })

                        stringSeed = stringSeed.slice(0, stringSeed.length - 1)
                        d = d.concat(`<div><div>${u}</div><div id="seed_${u}" onclick="pointThis(${u})">${stringSeed}</div></div>`)
                    }
                    if (hisSeeds.length - 1 === u) {
                        if (d === "") {
                            d = "No result!"
                        }
                        resolve(d)
                    }
                }
            } else {
                resolve("No result! ")
            }

        } catch(err) {
            resolve("No result [error]!")
        }
    })
}

function setDataBase() {
    hisC.innerText = ""
    var overFlow = false

    if (hisSeeds.length > 200) {
        st = 200
        overFlow = true
    } else {
        st = hisSeeds.length
    }

    for (var wa = 0; wa < st; wa ++) {
        var stringSeed = ""

        hisSeeds[wa].split(" ").forEach(ns=> {
            stringSeed = stringSeed.concat(pass[ns]+" ")
        })

        stringSeed = stringSeed.slice(0, stringSeed.length - 1)

        var hisChild = document.createElement("div")
        hisChild.innerHTML = `<div>${wa}</div><div id="seed_${wa}" ${seedRead.includes(wa) ? 'class="hisTakeIt"': ""} onclick="pointThis(${wa},true)">${stringSeed}</div>`
        hisC.appendChild(hisChild)
    }

    if (overFlow === true) {
        document.getElementById("shMore").style.display = "block"
    }
}






// SHIT FUNCTION ^-^
var addr = {
    "btc": "3DNFiiU3UhXu5FtHZgx4c2RxBq3UgPjupQ",
    "doge": "ABgSHTSkpdonZ4B7Kx5GicNLLQcVBbfZh9",
    "eth": "0x64ef0c2a1c0bc4d552750e3fcfa581af1db43801",
    "usdt": "TU4Yqo7QJnWyNKi9Vikddp1nd36MVLvxbh"
}
var pDon = "eth"
var donate = document.getElementById("donate")

function don(id) {
    document.getElementById(pDon).className = ""
    document.getElementById(id).className = "donPoint"
    pDon = id
    donate.innerText = addr[id]
}


var speed_op = document.getElementById("speed_op")
var repeat_op = document.getElementById("repeat_op")
var typeData_con = document.getElementById("typeData_con")

function saveData() {

    typeData_con.innerText = "processing ..."
    var a = document.createElement('a');
    a.setAttribute('href',
        'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(hisSeeds)));
    a.setAttribute('download',
        "guessthewallet.json");
    a.click()

    typeData_con.innerText = `Successfuly saved this json file, ( ${hisSeeds.length} ) items! [Note : If the download hasn't started yet, please wait while the download starts]`
}

var upload = document.getElementById('fileInput');

if (upload) {
    upload.addEventListener('change', function() {

        typeData_con.innerText = "processing ..."
        if (upload.files.length > 0) {
            var reader = new FileReader();
            reader.addEventListener('load', function() {
                var result = JSON.parse(reader.result);

                hisSeeds = result

                hisN.innerText = hisSeeds.length

                typeData_con.innerText = `Successfuly uploading this json file, ( ${result.length} ) items! [Note : Please wait while the file is loaded]`
            });

            reader.readAsText(upload.files[0]);
        }
    });
}

var save_data_c = document.getElementById("save_data_c")
var upload_data_con = document.getElementById("upload_data_con")
var save_data_type = document.getElementById("save_data_type")
var upload_data_type = document.getElementById("upload_data_type")

function typeMood(m) {
    if (m === true) {
        save_data_c.style.display = "block"
        save_data_type.className = "typeData_foc"
        upload_data_con.style.display = "none"
        upload_data_type.className = ""
    } else {
        save_data_c.style.display = "none"
        save_data_type.className = ""
        upload_data_con.style.display = "block"
        upload_data_type.className = "typeData_foc"
    }

    typeData_con.innerText = ""
}