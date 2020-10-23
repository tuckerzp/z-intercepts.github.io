/* Global Variables */
const entry_btn = document.getElementById('entry_img');
const total_label = document.getElementById("total");
const counter_label = document.getElementById("counter");

let phone_entries = 0;
let phone_entries_pt = 0; // Phone entries per tick

let npc_click = false;

/* Store */
const store = [
    {
        "id": "uw",
        "name": "Underpaid Worker",
        "cost": 20,
        "total": 0,
        "tick": 2,
        "costmul": 1.2,
        "img" : "./images/UnderpaidWorker.png"
    },

    {
        "id": "pw",
        "name": "Paid Worker",
        "cost": 5000,
        "total": 0,
        "tick": 50,
        "costmul": 1.2,
        "img" : "./images/PaidWorker.png"
    },

    {
        "id": "ma",
        "name": "Manager",
        "cost": 200000,
        "total": 0,
        "tick": 1000,
        "costmul": 1.2,
        "img" : "./images/PaidWorker.png"
    }
]

/* FUNCTIONS */
function getPerTick(store) {
    let p = 0;
    store.forEach(function(s) {
        p += s.tick * s.total;
        if (s.total > 0)
            npc_click = true;
    });

    return p;
}

function makeStore(store) {
    console.log("Telephone books are the way of the future!")
    const parent = document.getElementById("store");

    store.forEach(function (s) {
        let div = document.createElement("div");
        div.id = s.id;

        let btn = document.createElement("button");
        btn.id = s.id + "_btn";
        btn.innerHTML = `<img src=${s.img} draggable="false"><div style="padding-top: 1.75em;"><strong>${s.name}</strong><br>
            <em>Total: ${s.total} <br> Cost: ${s.cost}</em></div>`;
        btn.disabled = true;
        // Check for whether a button should be active or not
        entry_btn.addEventListener("click", () => {
            if (phone_entries >= s.cost)
                btn.disabled = false;
        });
        btn.addEventListener("click", () => {
            if (phone_entries >= s.cost) {
                phone_entries -= s.cost;
                s.total++;
                s.cost = Math.floor(s.cost * s.costmul);
                btn.innerHTML = `<img src=${s.img} draggable="false"><div style="padding-top: 1.75em;"><strong>${s.name}</strong><br>
                <em>Total: ${s.total} <br> Cost: ${s.cost}</em></div>`;
                updateTotal(0);
            }
            store.forEach(function (s) {
                if (phone_entries < s.cost) {
                    document.getElementById(s.id + "_btn").disabled = true;
                }
            });
        });

        let span = document.createElement("span");
        /* span.innerHTML = "Total: " + s.total + " Cost: " + s.cost;
        span.id = s.id + "_info"; */

        div.appendChild(btn);
        div.appendChild(span);
        parent.appendChild(div);
    });
}

function updateTotal(u) {
    phone_entries += u;
    total_label.innerHTML = "Phone Book Entries: " + phone_entries;
    counter_label.innerHTML = "Entries per Tick: " + phone_entries_pt;
}

/* EVENTS */

// plain clicking
entry_btn.addEventListener("click", () => {
    if (npc_click) {
        npc_click = false;
    } else {
        updateTotal(1);
    }
});

// main setup
makeStore(store);

/* Update loop */
window.setInterval(() => {
    phone_entries_pt = getPerTick(store);
    updateTotal(phone_entries_pt);
    if (npc_click)
        entry_btn.click();
}, 1500);