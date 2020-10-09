/* Variables */
const entry_btn = document.getElementById("entry_btn");
const total_label = document.getElementById("total");
const counter_label = document.getElementById("counter");

let phone_entries = 0;
let phone_entries_pt = 0; // Phone entries per tick

/* Store */
const store = [
    {
        "id": "uw",
        "name": "Underpaid Worker",
        "cost": 20,
        "total": 0,
        "tick": 2,
        "costmul": 1.2
    },

    {
        "id": "pw",
        "name": "Paid Worker",
        "cost": 5000,
        "total": 0,
        "tick": 50,
        "costmul": 1.2
    },

    {
        "id": "ma",
        "name": "Manager",
        "cost": 200000,
        "total": 0,
        "tick": 1000,
        "costmul": 1.2
    }
]

/* FUNCTIONS */
function getPerTick(store) {
    let p = 0;
    store.forEach(function(s) {
        p += s.tick * s.total;
    });

    return p;
}

function makeStore(store) {
    const parent = document.getElementById("store");

    store.forEach(function (s) {
        let div = document.createElement("div");
        div.id = s.id;

        let btn = document.createElement("button");
        btn.id = s.id + "_btn";
        btn.innerHTML = s.name;
        btn.addEventListener("click", () => {
            if (phone_entries >= s.cost) {
                phone_entries -= s.cost;
                s.total++;
                s.cost = Math.floor(s.cost * s.costmul);
                document.getElementById(s.id + "_info").innerHTML = "Total: " + s.total + " Cost: " + s.cost;
                updateTotal(0); 
            }
        });

        let span = document.createElement("span");
        span.innerHTML = "Total: " + s.total + " Cost: " + s.cost;
        span.id = s.id + "_info";

        div.appendChild(btn);
        div.appendChild(span);
        parent.appendChild(div);
    });
}

function updateTotal(u) {
    phone_entries += u;
    total_label.innerHTML = "Phone book entires: " + phone_entries;
    counter_label.innerHTML = "Phone Entries per tick: " + phone_entries_pt;
}

/* EVENTS */

// main setup
makeStore(store);

// plain clicking
entry_btn.addEventListener("click", () => {
    updateTotal(1);
});

/* Update loop */
window.setInterval(() => {
    phone_entries_pt = getPerTick(store);
    updateTotal(phone_entries_pt);
}, 1500);