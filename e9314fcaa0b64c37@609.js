import define1 from "./b1e623ab04742ae6@805.js";

function _1(md){return(
md`# resources`
)}

function _getRenderer($0){return(
(getValue) => {
  // given a database, produce a string renderer, a la tracery

  function Prop(id, raw) {
    let is = raw.split(".");
    let u = id[is[0]];
    $0.value = is;

    if (is.length == 2) return getValue(is[1], u);
    else if (is.length == 1) return getValue("called", u);
    // tostring the id
    else return "[nested property]";
    /* {
      var prop = is.shift();
      //Forge a path of nested objects if there is a value to set
      if (value !== undefined && obj[prop] == undefined) obj[prop] = {};
      return Prop(obj[prop], is);
    } */
  }
  return (str, ids) =>
    str.replace(/\#(.+?)\#/g, (match, pl) => {
      return Prop(ids, pl);
    });
}
)}

function _debug(){return(
""
)}

function _storylets(yaml){return(
yaml.load(`
- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { }
  effects:
    - template: "#v#: #w# is a murderer!  \n\n #w#: #v# lies!"
      then: { wIs: [status, dormant],
              vwIs: [role, traitor],
              wvIs: [role, betrayed] }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, cultists] }
  effects:
    - template: "#w#: #v# drove my faithful mad! They must be punished."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, adventurers] }
  effects:
    - template: "#w#: #v# turned my apprentice against me, can't you see?"
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, inquisitors], wIs: [joined, adventurers] }
  effects:
    - template: "#w#: #v# is a damned hypocrite who uses jinn to do their dirty work."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, inquisitors] }
  effects:
    - template: "#w#: #v# assaulted my faithful with their thugs!"
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, ministers] }
  effects:
    - template: "#w#: #v# is sheltering heretics from my order!"
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, inquisitors] }
  effects:
    - template: "#w#: #v# attacked my followers and burned their homes!"
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vIs: [joined, rangers] }
  effects:
    - template: "#w#: #v# turned my apprentice into a monster! Something must be done."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, cultists] }
  effects:
    - template: "#w#: We will take vengeance on #v# for their desecration of the land!"
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, rangers] }
  effects:
    - template: "#w#: We all know #v# seeks glory greater than their station."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, ministers] }
  effects:
    - template: "#w#: I remember when #v# drove the innocent from their homes."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, inquisitors] }
  effects:
    - template: "#w#: Heed my words, #v# has indulged in foul sorceries."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, inquisitors], vIs: [joined, cultists] }
  effects:
    - template: "#w#: It is long past time that #v# should have been exterminated."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { wIs: [joined, adventurers] }
  effects:
    - template: "#w#: The funny thing is, #v# and I aren't so different."
      then: { vwIs: [role, traitor],
              wvIs: [role, betrayed]  }

- verb: "betrayed-them"
  converse: "betrayed-by"
  condition: { vwIs: [role, traitor], wIs: [joined, adventurers] }
  effects:
    - template: "#w#: Shame on me, I shouldn't be surprised by you."
      then: { vwIs: [role, rival],
              wvIs: [role, rival]  }


- verb: "protected-them"
  converse: "protected-by"
  condition: { }
  effects:
    - template: "#v# helps #w#."
      then: { wIs: [mood, glad],
              vwIs: [stance, friend],
              wvIs: [stance, friend]}

- verb: "protected-them"
  converse: "protected-by"
  condition: { vwIsNot: [role, mentor], wvIsNot: [role, mentor] }
  effects:
    - template: "#v#: Just, if you need anything, let me know."
      then: { }

- verb: "abetted-them"
  converse: "abetted-by"
  condition: { }
  effects:
    - template: "#v#: Well, I don't feel you've done anything wrong."
      then: { }

- verb: "sided-against"
  condition: { }
  effects:
    - template: "#v#: I need #w# to go away from me now."
      then: { }

- verb: "conspired-with"
  condition: { }
  effects:
    - template: "#v#: Now what in the world are you thinking, #w#?"
      then: { }

- verb: "pitied-by"
  converse: "pitied-them"
  condition: { }
  effects:
    - template: "#w#: Wow, that's sad."
      then: { vIs: [mood, sad] }

- verb: "weakened-them"
  converse: "weakened-by"
  condition: {}
  effects:
    - template: "#v#: I'd love to help you if I could."
      then: { }
    - template: "#v#: Why, could you spare me an apprentice?"
      then: { }

- verb: "exhorted-them"
  converse: "exhorted-by"
  condition: {}
  effects:
    - template: "#v#: #w#, you've got to take a side on this."
      then: { }

`)
)}

function _6(md){return(
md`#### testing shim`
)}

function _trigger(makeTrigger,db){return(
makeTrigger(db.get, db.assert)
)}

function _8(trigger)
{
  // mutable db.assert("role", "mentor", 0, 1);
  // db.assert("called", "Foo", 0);
  // db.assert("called", "Bar", 1);

  return trigger("betrayed-by", 1, 2);
}


function _9(db){return(
db.predicates
)}

function _db(makeWorld)
{
  // initialize the storyworld
  let world = makeWorld();

  world.defineAgent("the Arch-Betrayer", "adventurers");
  world.defineAgent("the Broken One", "cultists");
  world.defineAgent("the Demon-Wrestler", "inquisitors");
  world.defineAgent("the Pythia", "ministers");
  // world.defineAgent("the Undying King", "courtiers");
  world.defineAgent("the Shape-Stealer", "rangers");

  return world;
}


function _13(md){return(
md`#### splot structures`
)}

function _splots(betrayalSplot,recruitSplot){return(
{
  betray: betrayalSplot,
  recruit: recruitSplot
}
)}

function _betrayalSplot(){return(
Object.assign(
  {},
  {
    states: ["traitor", "enabler", "victim", "bystander", "helper"],
    rule: (db) => {
      let they = (vs) => vs.map((v) => db.node(v).state);
      return [
        (u, vs, links) =>
          !they(vs).every((s) => s == "traitor") &&
          they(vs).some((s) => s == "victim"),
        (u, vs, links) =>
          !they(vs).every((s) => s == "enabler") &&
          they(vs).some((s) => s == "traitor"),
        (u, vs, links) =>
          !they(vs).every((s) => s == "victim") &&
          they(vs).some((s) => s == "traitor"),
        (u, vs, links) => !they(vs).some((s) => s == "bystander"),
        (u, vs, links) =>
          !they(vs).every((s) => s == "helper") &&
          they(vs).some((s) => s == "victim")
      ];
    },
    eventsMatrix: {
      traitor: {
        traitor: "conspired-with",
        enabler: "abetted-by",
        victim: "betrayed-them"
      },
      enabler: {
        traitor: "abetted-them",
        victim: "weakened-them",
        helper: "sided-against"
      },
      victim: {
        traitor: "betrayed-by",
        enabler: "weakened-by",
        helper: "protected-by",
        bystander: "pitied-by"
      },
      bystander: {
        victim: "pitied-them",
        helper: "exhorted-by"
      },
      helper: {
        enabler: "sided-against",
        victim: "protected-them",
        bystander: "exhorted-them"
      }
    }
  }
)
)}

function _recruitSplot(){return(
Object.assign(
  {},
  {
    states: ["mentor", "mentee", "friend", "rival", "bystander"],
    rule: (db) => (db) => {
      let they = (vs) => vs.map((v) => db.node(v).state);
      return [
        (u, vs, links) => true,
        // !they(vs).every((s) => s == "mentor") && they(vs).some((s) => s == "mentee"),
        (u, vs, links) => true, // they(vs).some((s) => s == "mentor"),
        // !they(vs).every((s) => s == "mentee") && they(vs).some((s) => s == "mentor"),
        (u, vs, links) => true, // they(vs).some((s) => s == "mentor"),
        (u, vs, links) => true, // they(vs).some((s) => s == "mentee"),
        (u, vs, links) => !they(vs).every((s) => s == "bystander")
      ];
    },
    eventsMatrix: {
      traitor: {
        traitor: "conspired-with",
        enabler: "abetted-by",
        victim: "betrayed-them"
      },
      enabler: {
        traitor: "abetted-them",
        victim: "weakened-them",
        helper: "sided-against"
      },
      victim: {
        traitor: "betrayed-by",
        enabler: "weakened-by",
        helper: "protected-by",
        bystander: "pitied-by"
      },
      bystander: {
        victim: "pitied-them",
        helper: "exhorted-by"
      },
      helper: {
        enabler: "sided-against",
        victim: "protected-them",
        bystander: "exhorted-them"
      }
    }
  }
)
)}

function _17(md){return(
md`#### storylet effects`
)}

function _tests(){return(
{
  vIs: (get) => (key, state, v, w) => get(key, v) == state,
  wIs: (get) => (key, state, v, w) => get(key, w) == state,
  vwIs: (get) => (key, state, v, w) => get(key, v, w) == state,
  wvIs: (get) => (key, state, v, w) => get(key, w, v) == state,
  vwIsNot: (get) => (key, state, v, w) => get(key, v, w) !== state,
  wvIsNot: (get) => (key, state, v, w) => get(key, w, v) !== state
}
)}

function _effects(){return(
{
  vIs: (assert) => (key, state, v, _) => assert(key, state, v),
  wIs: (assert) => (key, state, _, w) => assert(key, state, w),
  vwIs: (assert) => (key, state, v, w) => assert(key, state, v, w),
  wvIs: (assert) => (key, state, v, w) => assert(key, state, w, v)
  // vAdapt: (assert) => (key, state, v, w) => {} // not implemented yet
}
)}

function _makeTrigger(getRenderer,storylets,tests,pick,effects){return(
(getValue, assert) => {
  let renderString = getRenderer(getValue);
  return (verb, v, w) => {
    let lhs = { fwd: v, rev: w },
      rhs = { fwd: w, rev: v };

    console.log(storylets.map((u) => u.condition));

    let allChoices = storylets
      .filter((u) => u.verb == verb || u.converse == verb)
      .map((u) =>
        u.converse == verb ? { dir: "rev", ...u } : { dir: "fwd", ...u }
      )
      .filter((u) =>
        Object.entries(u.condition).every(([k, p]) =>
          tests[k](getValue)(p[0], p[1], lhs[u.dir], rhs[u.dir])
        )
      );

    // ignore storylets with fewer preconditions
    let complexity = (u) => Object.keys(u.condition).length;
    let n = Math.max(...allChoices.map((u) => complexity(u)));
    let priority = allChoices.filter((u) => complexity(u) == n);

    // select a storylet, then select one of its effects
    console.log(verb, priority.length);
    let action = pick(priority);

    // FIXME: with weighting
    let result = pick(action.effects);

    // apply postconditions
    Object.entries(result.then).forEach(([k, p]) =>
      effects[k](assert)(p[0], p[1], lhs[action.dir], rhs[action.dir])
    );
    // return utterance
    // console.log(result.template, { v, w });
    return renderString(result.template, {
      v: lhs[action.dir],
      w: rhs[action.dir]
    });
  };
}
)}

function _22(md){return(
md`### deps`
)}

function _yaml(require){return(
require("js-yaml@4.1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("pick", child1);
  main.import("makeWorld", child1);
  main.import("queryHook", child1);
  main.import("pl", child1);
  main.variable(observer("getRenderer")).define("getRenderer", ["mutable debug"], _getRenderer);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer("storylets")).define("storylets", ["yaml"], _storylets);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("trigger")).define("trigger", ["makeTrigger","db"], _trigger);
  main.variable(observer()).define(["trigger"], _8);
  main.variable(observer()).define(["db"], _9);
  main.variable(observer("db")).define("db", ["makeWorld"], _db);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("splots")).define("splots", ["betrayalSplot","recruitSplot"], _splots);
  main.variable(observer("betrayalSplot")).define("betrayalSplot", _betrayalSplot);
  main.variable(observer("recruitSplot")).define("recruitSplot", _recruitSplot);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("tests")).define("tests", _tests);
  main.variable(observer("effects")).define("effects", _effects);
  main.variable(observer("makeTrigger")).define("makeTrigger", ["getRenderer","storylets","tests","pick","effects"], _makeTrigger);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("yaml")).define("yaml", ["require"], _yaml);
  return main;
}
