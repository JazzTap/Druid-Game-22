import define1 from "./70626ddd3dd542e5@418.js";

function _1(md){return(
md`# main
\`\`\`
make [entity] [verb] [entity]
verbs: betray
\`\`\``
)}

function* _terminal(html,lookupName,betray,helps,VanillaTerminal)
{
  let node = html`<div id="vanilla-terminal"> </div>`;
  yield node;

  let examine = (term, par) => {
    let [v] = par;
    term.output(`description of ${v}`);
  };

  let commands = {
    betray: (term, par) => {
      let [s] = par,
        v = lookupName(s);
      let event = betray(v);
      term.output(event.out);

      // term.output(m.text());
    },
    /* call: (term, par) => {
      let [v, v_] = par;
      term.output(`now ${v} can be called ${v_}`);
    }, */
    examine,
    make: (term, par) => {
      let [s0, a, s1] = par,
        v = lookupName(s0),
        w = lookupName(s1);
      // FIXME: match the splot, look up its active verb a

      if (v == -1 || w == -1) {
        term.output(`(I didn't understand who that is)`);
      } else if (a == "betray") {
        let event = betray(v, w);
        term.output(event.out);
      } else if (a == "help") {
        let event = helps(v, w);
        term.output(event.out);
      } else {
        term.output(`(I didn't understand that verb)`);
      }
    },
    x: examine
  };

  let terminal = new VanillaTerminal({ commands });
  node.value = terminal;

  terminal.clear();
  return node;
}


function _dash(html,logView,viewport,legend)
{
  /* 
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
  ${viewof reshape} ${viewof perturb} ${viewof reroll}
</div>
  */
  return html`<div style="display: grid; grid-template-columns: 5fr 3fr 80px;">
  ${logView}
  ${viewport}
  <div style="margin-top: 5rem">${legend}</div>
</div>`;
}


function _5($0,$1,confabulate,betrayalSplot){return(
[$0.value, $1.value] = confabulate(
  new Map([[Math.floor(Math.random() * 5) + 1, "traitor"]]),
  betrayalSplot,
  5
)
)}

function _6(staticStyle){return(
staticStyle
)}

function _7(dynamicStyle){return(
dynamicStyle
)}

function _helps(world,confabulate,betrayalSplot,$0,$1){return(
(v = -1, w = -1) => {
  let ret = { out: "oops" };
  if (v == -1) {
    ret.out = `(I didn't understand who that is)`;
    return;
  }
  if (w == -1) {
    ret.out = `${world.get("called", v)} is helped`;
  } else {
    ret.out = `${world.get("called", v)} helps ${world.get("called", w)}`;
  }

  ret.splot = confabulate(
    w == -1
      ? new Map([[v, "victim"]])
      : new Map([
          [v, "helper"],
          [w, "victim"]
        ]),
    betrayalSplot
  );
  $0.value = ret.splot[0];
  $1.value = ret.splot[1];
  return ret;
}
)}

function _betray(world,confabulate,betrayalSplot,$0,$1){return(
(v = -1, w = -1) => {
  let ret = { out: "oops" };
  if (v == -1) {
    ret.out = `(I didn't understand who that is)`;
    return;
  }
  if (w == -1) {
    ret.out = `${world.get("called", v)} is betrayed`;
  } else {
    ret.out = `${world.get("called", v)} betrays ${world.get("called", w)}`;
  }

  ret.splot = confabulate(
    w == -1
      ? new Map([[v, "victim"]])
      : new Map([
          [v, "traitor"],
          [w, "victim"]
        ]),
    betrayalSplot
  );
  $0.value = ret.splot[0];
  $1.value = ret.splot[1];
  return ret;
}
)}

function* _viewport(html,render,social,betrayalSplot)
{
  let ret = html`<svg width=300 height=400></svg>`;
  yield ret; // renderer fails if the node isn't attached to page

  render(ret, social, betrayalSplot.states); // todo: states as metadata of social graph
}


function _legend(swatches,betrayalSplot){return(
swatches(betrayalSplot.states)
)}

function _trace(makeTrace,casting,social){return(
makeTrace(casting, social)
)}

function _logView(md,trace){return(
md`${[...trace.log].reverse().join("  \n\n")}`
)}

function _world(makeWorld)
{
  // initialize the storyworld
  // resetDb(); // VERIFY
  let world = makeWorld();

  world.defineAgent("the Arch-Betrayer", "adventurers");
  world.defineAgent("the Broken One", "cultists");
  world.defineAgent("the Demon-Wrestler", "inquisitors");
  world.defineAgent("the Pythia", "ministers");
  // world.defineAgent("the Undying King", "courtiers");
  world.defineAgent("the Shape-Stealer", "rangers");

  return world;
}


function _15(trace)
{
  let i = 1;
  return trace.graphs[i]
    .edges()
    .map((vw) => ({ ...vw, ...trace.graphs[i].edge(vw) }));
}


function _18(world){return(
world.query(`mood("mad", X).`)
)}

function _19(world){return(
world.predicates
)}

function _20(world){return(
world.everyone().map((id) => world.get("mood", id))
)}

function _21(world){return(
world.everyone().map((id) => world.get("stance", id, 4))
)}

function _casting(){return(
{}
)}

function _social(){return(
{}
)}

function _makeTrace(pick,step){return(
(initial, social) => {
  let ret = [initial],
    init = pick(initial.nodes());

  // describe(initial, init, { faction: "druid" }); // invent the first PoV
  let log = []; // [`${renderActor(init, initial)} existed.`];

  let frame = new Set(init);
  for (let t = 0; t < 30; ++t) {
    // mutable debug = [t, ret[0].edges()];

    // for each diff, confabulate a reason
    let [res, _, frame_, gloss] = step(ret[0], social, frame);

    if (gloss) {
      log.unshift(gloss);
      frame = frame_;
      ret.unshift(res);
    } else {
      log.unshift("The scene ends.");
      ret.unshift();
      break;
    }
  }

  return { log, graphs: ret };
}
)}

function _confabulate(confabulateHook,world){return(
confabulateHook(world)
)}

function _trigger(makeTrigger,world){return(
makeTrigger(world.get, world.assert)
)}

function _27(md){return(
md`### Procedures`
)}

function _step(diff,graphlib,pick,makeScene,makeCut){return(
(state, goal, frame) => {
  // mutable debug = [];
  let laundry = diff(state, goal, frame);

  let result = graphlib.json.read(
    // deep copy
    JSON.parse(JSON.stringify(graphlib.json.write(state)))
  );
  let thread = null;
  let resFrame = new Set(frame);

  // mutable debug.unshift(laundry);

  if (laundry.threadsHere.length > 0) {
    // mutable debug.unshift(laundry.threadsHere);

    thread = pick(laundry.threadsHere); // .filter((t) => !t.isMatched));
    // mutable debug.unshift(thread);

    if (thread) thread = makeScene(result, goal, thread);
  }

  if (!thread && laundry.threadsLoose.length > 0) {
    thread = pick(
      laundry.threadsLoose.filter((a) => frame.has(a.v) || frame.has(a.w))
    );
    if (!thread) thread = pick(laundry.threadsLoose); // oops, our frame couldn't stretch to fit a loose thread. let's cheat

    [resFrame, thread] = makeCut(result, goal, frame, thread);
  }

  // mutable debug = ["done", thread];

  // falls through if there are neither threadsHere nor threadsLoose, ending the chapter.
  return [result, goal, resFrame, thread];
}
)}

function _makeCut(describe,pick,renderActor,world){return(
(result, goal, frame, thread) => {
  let v = thread.v,
    w = thread.w;
  // mutable debug.unshift(thread);

  // confabulate
  // if (!thread.isMatched) {
  describe(result, v, { called: "Foo" }); // FIXME
  describe(result, w, { called: "Bar" });
  // result.setNode(v, { faction: vFaction, ...result.node(v) });

  // change frame
  let resFrame = new Set(frame);
  let isCut = resFrame.size > 2 ? true : pick([true, false]);
  if (isCut) resFrame = new Set(); // 50% chance of dropping scene

  let whoJoins = "both";
  if (resFrame.has(w) || resFrame.has(v))
    whoJoins = !resFrame.has(w) ? w : !resFrame.has(v) ? v : "";
  resFrame.add(v);
  resFrame.add(w);

  // render scene header
  let vText = renderActor(world, v);
  let wText = renderActor(world, w);
  // was: `the ${result.node(w).faction} ${w}`;

  return [
    resFrame,
    isCut
      ? `${vText} and ${wText} were together. `
      : whoJoins == "both"
      ? `${vText} and ${wText} joined ${[...resFrame]
          .filter((x) => x != v && x != w)
          .map((x) => renderActor(world, x))
          .join(" and ")}.`
      : whoJoins
      ? `${renderActor(world, whoJoins)} joined ${[...resFrame]
          .filter((x) => x != whoJoins)
          .map((x) => renderActor(world, x))
          .join(" and ")}. `
      : `${wText} and ${vText} remained.` // shouldn't happen
  ];
  // thread += [...resFrame];
}
)}

function _debug(){return(
[]
)}

function _makeScene(trigger,$0){return(
(result, goal, thread) => {
  let v = thread.v,
    w = thread.w;

  let k = thread.kind; // goal.edge(thread).kind;
  let text = trigger(k, v, w);

  // mark the edge finished, in both directions
  result.setEdge(v, w, { kind: k });
  result.setEdge(w, v, { kind: "pass" });
  // ...result.edge({ v, w }) // pass through datum

  if (k.includes("betray")) $0.value.unshift(text);
  return text;
}
)}

function _diff(){return(
(g, h, frame) => {
  let res = h.edges().map((goal_) => {
    // want to annotate each edge with its diff status
    let goal = h.edge(goal_);

    // tour the (undirected) edges to find a match in current state g
    let candidates = g.edges().filter((match) => match.v == goal_.v);
    // candidates_ = g.edges().filter((match) => match.w == goal.v);
    let matchIdx = candidates.find((match) => match.w == goal_.w);
    //       match_ = candidates_.find((match) => match.v == goal.w);
    let match = matchIdx ? g.edge(matchIdx) : undefined;

    // console.log([goal, match]);
    let isMatched = match && [goal.kind, "pass"].includes(match.kind);
    // NOTE: consumed edges are marked with the verb. their reverse is marked with "pass".
    // || (match_ && match_.kind == goal.kind);

    /* isMatched
      ? h.edge(isMatched.v, isMatched.w).kind == 'knows'
      : false; // BRITTLE
    */
    let isTrivial = goal.kind == undefined; // may skip edges

    let isInFrame = frame.has(goal_.v) && frame.has(goal_.w);
    return { ...goal, ...goal_, isMatched, isInFrame, isTrivial };
  });
  // mutable debug.unshift(res);

  return {
    threadsHere: res.filter(
      (sig) => sig.isInFrame && !sig.isMatched && !sig.isTrivial
    ),
    threadsLoose: res.filter(
      (sig) => !sig.isInFrame && !sig.isMatched && !sig.isTrivial
    ),
    frame
  };
  /* return { gainedNodes: [], lostNodes: [],
          gainedEdges: [],  lostEdges: [],
         editedNodes: []}; */
}
)}

function _allNames(world){return(
() => world.everyone().map((id) => [id, world.get("called", id)])
)}

function _lookupName(allNames,editDistance,d3){return(
(name, threshold = 0.8) => {
  let target = name.replaceAll("-", " "),
    ranks = allNames().map(([id, str]) => [
      id,
      editDistance(target, str) / str.length
    ]),
    match = ranks[d3.minIndex(ranks, (d) => d[1])][0],
    bestScore = d3.min(ranks, (d) => d[1]);

  // mutable debug = bestScore;
  return bestScore < threshold ? match : -1;
}
)}

function _describe(){return(
(g, id, props) => {
  // TODO: get a description of the actor 'id' if they are in 'g'

  return g.node(id);
  // if (!props.name && !g.node(u).name) props.name = pick(givenNames);
  // g.setNode(u, { ...props, ...g.node(u) });
}
)}

function _renderActor(){return(
(db, id) => {
  //, g, isLong = "") => {
  // try g = trace.graphs[t] once actors' state can change
  // let u = g.node(id);
  let name = db.get("called", id);
  return name;

  // return isLong ? `the ${u.faction} ${u.name}` : `${u.name}`;
  // return isLong ? `the ${u.faction} ${u.label}` : `${u.label}`;
  // return id
}
)}

function _editDistance(){return(
function (strA, strB) {
  let aLength = strA.length,
    bLength = strB.length;

  // fail-fast
  if (aLength === 0) {
    return bLength;
  }
  if (bLength === 0) {
    return aLength;
  }
  // If the limit is not defined it will be calculate from this and that args.
  let limit = (bLength > aLength ? bLength : aLength) + 1;
  if (Math.abs(aLength - bLength) > (limit || 100)) {
    return limit || 100;
  }

  // init the array
  let matrix = [];
  for (let i = 0; i < limit; i++) {
    matrix[i] = [i];
    matrix[i].length = limit;
  }
  for (let i = 0; i < limit; i++) {
    matrix[0][i] = i;
  }

  // Calculate matrix.
  let j, a_index, b_index, cost, min, t;
  for (let i = 1; i <= aLength; ++i) {
    a_index = strA[i - 1];
    for (j = 1; j <= bLength; ++j) {
      // Check the jagged distance total so far
      if (i === j && matrix[i][j] > 4) {
        return aLength;
      }
      b_index = strB[j - 1];
      cost = a_index === b_index ? 0 : 1; // Step 5
      // Calculate the minimum (much faster than Math.min(...)).
      min = matrix[i - 1][j] + 1; // Deletion.
      if ((t = matrix[i][j - 1] + 1) < min) min = t; // Insertion.
      if ((t = matrix[i - 1][j - 1] + cost) < min) min = t; // Substitution.

      // Update matrix.
      let shouldUpdate =
        i > 1 &&
        j > 1 &&
        a_index === strB[j - 2] &&
        strA[i - 2] === b_index &&
        (t = matrix[i - 2][j - 2] + cost) < min;
      if (shouldUpdate) {
        matrix[i][j] = t;
      } else {
        matrix[i][j] = min;
      }
    }
  }
  // return number of steps
  return matrix[aLength][bLength];
}
)}

function _38(md){return(
md`### requirements

see [system documentation](https://docs.google.com/document/d/1uBOMPU1wmotnp2sZ-LfwRcz36Ub16H-lKXZnQEjQljg/edit)`
)}

function _VanillaTerminal(require){return(
require("vanilla-terminal@0.0.11/dist/vanilla-terminal.js").then(
  (lib) => lib.default
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof terminal")).define("viewof terminal", ["html","lookupName","betray","helps","VanillaTerminal"], _terminal);
  main.variable(observer("terminal")).define("terminal", ["Generators", "viewof terminal"], (G, _) => G.input(_));
  main.variable(observer("dash")).define("dash", ["html","logView","viewport","legend"], _dash);
  const child1 = runtime.module(define1);
  main.import("makeWorld", child1);
  main.import("pick", child1);
  main.import("graphlib", child1);
  main.import("makeShape", child1);
  main.import("makeSocial", child1);
  main.import("makeTrigger", child1);
  main.import("betrayalSplot", child1);
  main.import("recruitSplot", child1);
  main.import("confabulateHook", child1);
  main.import("render", child1);
  main.import("swatches", child1);
  main.import("staticStyle", child1);
  main.import("dynamicStyle", child1);
  main.variable(observer()).define(["mutable casting","mutable social","confabulate","betrayalSplot"], _5);
  main.variable(observer()).define(["staticStyle"], _6);
  main.variable(observer()).define(["dynamicStyle"], _7);
  main.variable(observer("helps")).define("helps", ["world","confabulate","betrayalSplot","mutable casting","mutable social"], _helps);
  main.variable(observer("betray")).define("betray", ["world","confabulate","betrayalSplot","mutable casting","mutable social"], _betray);
  main.variable(observer("viewport")).define("viewport", ["html","render","social","betrayalSplot"], _viewport);
  main.variable(observer("legend")).define("legend", ["swatches","betrayalSplot"], _legend);
  main.variable(observer("trace")).define("trace", ["makeTrace","casting","social"], _trace);
  main.variable(observer("logView")).define("logView", ["md","trace"], _logView);
  main.variable(observer("world")).define("world", ["makeWorld"], _world);
  main.variable(observer()).define(["trace"], _15);
  main.variable(observer()).define(["world"], _18);
  main.variable(observer()).define(["world"], _19);
  main.variable(observer()).define(["world"], _20);
  main.variable(observer()).define(["world"], _21);
  main.define("initial casting", _casting);
  main.variable(observer("mutable casting")).define("mutable casting", ["Mutable", "initial casting"], (M, _) => new M(_));
  main.variable(observer("casting")).define("casting", ["mutable casting"], _ => _.generator);
  main.define("initial social", _social);
  main.variable(observer("mutable social")).define("mutable social", ["Mutable", "initial social"], (M, _) => new M(_));
  main.variable(observer("social")).define("social", ["mutable social"], _ => _.generator);
  main.variable(observer("makeTrace")).define("makeTrace", ["pick","step"], _makeTrace);
  main.variable(observer("confabulate")).define("confabulate", ["confabulateHook","world"], _confabulate);
  main.variable(observer("trigger")).define("trigger", ["makeTrigger","world"], _trigger);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("step")).define("step", ["diff","graphlib","pick","makeScene","makeCut"], _step);
  main.variable(observer("makeCut")).define("makeCut", ["describe","pick","renderActor","world"], _makeCut);
  main.define("initial debug", _debug);
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer("makeScene")).define("makeScene", ["trigger","mutable debug"], _makeScene);
  main.variable(observer("diff")).define("diff", _diff);
  main.variable(observer("allNames")).define("allNames", ["world"], _allNames);
  main.variable(observer("lookupName")).define("lookupName", ["allNames","editDistance","d3"], _lookupName);
  main.variable(observer("describe")).define("describe", _describe);
  main.variable(observer("renderActor")).define("renderActor", _renderActor);
  main.variable(observer("editDistance")).define("editDistance", _editDistance);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("VanillaTerminal")).define("VanillaTerminal", ["require"], _VanillaTerminal);
  return main;
}
