import define1 from "./e9314fcaa0b64c37@609.js";
import define2 from "./805b70c3d7000551@71.js";

function _1(md){return(
md`# scenes

\`wfc\` is almost a naive coloring algorithm, but it handles arbitrary graph topologies and adjacency constraints.

works well enough for arbitrary graphs with few (~5) nodes.`
)}

function _graphlib(require){return(
require("https://dagrejs.github.io/project/graphlib/v2.1.8/graphlib.min.js")
)}

function _4(md){return(
md`testing shim`
)}

function _social(makeSocial,makeShape,betrayalSplot){return(
makeSocial(makeShape([..."0123456"]), betrayalSplot)
)}

function _6(social){return(
Object.fromEntries(social.nodes().map((n) => [n, social.node(n)]))
)}

function _legend(swatches,recruitSplot){return(
swatches(recruitSplot.states)
)}

function* _viewport(html,render,preview,recruitSplot)
{
  let ret = html`<svg width=300 height=400></svg>`;
  yield ret; // renderer fails if the node isn't attached to page

  return render(ret, preview, recruitSplot.states);
}


function _10(preview){return(
preview.nodes().map((n) => preview.node(n))
)}

function _preview(makeShape,makeSocial,recruitSplot,db)
{
  let res = makeShape([..."12345"]);
  res.setNode(1, { state: "mentee", ...res.node(1) });

  let ret = makeSocial(res, recruitSplot);
  ret.nodes().forEach((j) => {
    ret.setNode(j, { label: db.get("called", j), ...ret.node(j) });
  });

  return ret;

  /* return confabulateHook(db)(
    new Map([
      [1, "mentor"],
      [2, "mentee"]
    ]),
    recruitSplot,
    5
  ); */
}


function _recruitSplot(){return(
Object.assign(
  {},
  {
    states: ["mentee", "mentor", "ally", "bystander"],
    rule: (db) => {
      let they = (vs) => vs.map((v) => db.node(v).state);
      return [
        (u, vs, links) => they(vs).some((s) => s == "mentor"),
        (u, vs, links) =>
          they(vs).some((s) => s == "mentee") && !they(vs).some((s) => s == ""),
        (u, vs, links) => they(vs).some((s) => s == "mentee"),
        (u, vs, links) => true
      ];
    },
    eventsMatrix: {
      mentee: {},
      mentor: {},
      ally: {},
      rival: {},
      bystander: {}
    }
  }
)
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


function _14(md){return(
md`frontend`
)}

function _render(d3,dagred3){return(
(svg, db) => {
  let sel = d3.select(svg);
  sel.append("g").call(new dagred3.render(), db);
  sel.attr("viewBox", `0, 0, ${db.graph().width}, ${db.graph().height}`);
  // .attr("height", db.graph().height + 20);

  // bind style hook
  let ids = db.nodes(),
    d = (i) => db.node(ids[i]);
  sel.selectAll(".node").attr("class", (_, i) => d(i).state + " node");

  return sel;
}
)}

function _swatches(d3,html,colorRamp){return(
(states) => {
  let ret = d3.select(html`<svg width=80 height=${20 * states.length}></svg>`);

  let swatch = ret.selectAll("g").data(states).join("g");

  swatch
    .append("rect")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20)
    .attr("width", 80)
    .attr("height", 18)
    .style("fill", (d, i) => colorRamp(i / states.length));

  swatch
    .append("text")
    .attr("x", 0)
    .attr("y", (d, i) => i * 20 + 15)
    .text((d) => d);

  return ret.node();
}
)}

function _dynamicStyle(html,betrayalSplot,recruitSplot,colorRamp){return(
html`<style>
${[...betrayalSplot.states, ...recruitSplot.states]
  .map((u, i) => `.${u} rect { fill: ${colorRamp((i % 5) / 5)}; }`)
  .join("\n")}
</style>`
)}

function _colorRamp(d3){return(
(t) => d3.interpolateSpectral(0.1 + t * 0.9)
)}

function _staticStyle(html){return(
html // https://observablehq.com/@mbostock/hello-dagre
`<style>
g.type-TK > rect {
  fill: #00ffd0;
}

.node text {
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* fill: #fff; */
  font-size: 14px;
}

.node rect {
  stroke: #999;
  stroke-width: 1.5px;
}

.edgePath path {
  stroke: #333;
  stroke-width: 1.5px;
}
</style>`
)}

function _21(md){return(
md`backend`
)}

function _confabulateHook(pick,makeShape,makeSocial){return(
(world) =>
  (constraints, splot, n = 4) => {
    // given a partial casting, complete the splot.
    let cast = constraints;
    let choices = world
      .everyone()
      .filter((id) => ![...constraints.keys()].includes(id));

    while (cast.size < n) {
      let id = pick(choices);
      // TODO: favor characters with history, except for recruitment splots
      choices = choices.filter((j) => j != id);
      cast.set(id, "");
    }
    // mutable debug = constraints;

    // TODO: pull edges from character history
    let initial = makeShape([...cast.keys()]);
    // apply constraints
    [...constraints.entries()].forEach(([id, state]) => {
      initial.setNode(id, { state, ...initial.node(id) });
    });

    let res = makeSocial(initial, splot);
    res.nodes().forEach((j) => {
      res.setNode(j, { label: world.get("called", j), ...res.node(j) });
    });

    // CLUDGE: deep copy in makeSocial should have done this already
    initial.edges().forEach((vw) => {
      initial.setEdge(vw, undefined);
    });
    return [initial, res];

    // return makeTrace(initial, social);
  }
)}

function _makeShape(graphlib,pick){return(
function makeShape(nodeIds, nodeLabels = new Map()) {
  const g = new graphlib.Graph();
  g.setGraph({});
  let link = (u, v) => {
    g.setEdge(u, v, {}); // {kind: 'knows'}
    g.setEdge(v, u, {});
  };

  // graph wiring
  nodeIds.forEach((u, i, arr) => {
    g.setNode(u, {});
    let rando = pick(arr.slice(0, i || 1)); // pick someone we already saw
    if (u != rando) link(u, rando);

    // also, pick a number of additional people (redundancy possible)
    if (Math.random() < 0.6) link(u, pick(arr.filter((v) => v != u)));
    if (Math.random() < 0.1) link(u, pick(arr.filter((v) => v != u)));
  });

  // g.graph().rankDir = "UD"; // 'LR'
  return g;
}
)}

function _makeSocial(graphlib,wfc){return(
(shape, splot, attempts = 100) => {
  let ret = undefined;
  let take;
  for (take = 0; take < attempts; ++take) {
    try {
      // plug in the splot we want
      let wip = graphlib.json.read(graphlib.json.write(shape));
      ret = wfc(wip, splot, "verbose");
    } catch {
      // swallow a finite number of wfc failures
    } finally {
      if (ret) break;
    }
  }
  if (!ret)
    throw Error("wfc failed too many times, please try splot generation again");

  ret.edges().forEach(({ v, w }) => {
    ret.edge(v, w).kind =
      splot.eventsMatrix[ret.node(v).state][ret.node(w).state];
    // || "knows";
  });

  // shape.setNode("D", null); // to test resolution
  return ret;
}
)}

function _wfc(pick){return(
(g, splot, verbose = false) => {
  let choices = splot.states;
  let init = choices.map((_) => true); // template of a boolean vector: all states are possible

  // initialize
  g.nodes().forEach((id) => {
    let u = g.node(id);
    let s = u && u.state; // try to collapse a priori observations, if they make sense
    let obs =
      s && choices.includes(s) ? choices.map((k) => k === s) : [...init];
    g.setNode(id, { obs, ...u });
  });
  // FIXME: need to propagate information to neighbors after initialization :p

  // mutable debug = g.nodes().map((i) => g.node(i));

  while (true) {
    // Observe state with heuristic, making arbitrary decisions
    let [min, idx] = g.nodes().reduce(
      (minSeen, u) => {
        let el = g.node(u).obs; // examine the node for its observation state
        if (!el) return minSeen;
        let rank = el.filter((b) => b).length;
        return rank < minSeen[0] ? [rank, u] : minSeen;
      },
      [Infinity, null]
    );
    if (idx !== null) {
      g.setNode(idx, {
        state: pick(choices, g.node(idx).obs) // source of randomness
        // ...g.node(idx) // not performant
      });

      if (verbose) console.log("set node " + idx + " to " + g.node(idx).state);
      if (g.node(idx).state === undefined) {
        if (verbose) console.log("contradiction at node " + idx);
        throw new Error("contradiction at node " + idx); // TODO: backtracking
      }
    } else break; // exit once all nodes have collapsed

    // Propagate information
    g.successors(idx).forEach((u) => {
      let mask = g.node(u).obs;
      if (!mask) return; // can't propagate to a collapsed node
      if (verbose) console.log("  updating " + u + " for " + idx);

      // adjacency rules
      let update = splot
        .rule(g)
        .map((f) => f(u, g.predecessors(u), g.inEdges(u)));
      let res = mask.map((_, i) => mask[i] && update[i]);

      // let ban = choices.indexOf(g.node(idx));
      // mask[ban] = false; // neighbors can't be the same

      if (verbose) console.log("    " + res);
      g.node(u).obs = res;
      // g.setNode(u, {obs: res});
    });
  }

  // g.setNode("A", "glad");
  if (verbose) console.log("wfc succeeded");
  return g;
}
)}

function _scratch(){return(
""
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("graphlib")).define("graphlib", ["require"], _graphlib);
  const child1 = runtime.module(define1);
  main.import("pick", child1);
  main.import("makeWorld", child1);
  main.import("makeTrigger", child1);
  main.import("betrayalSplot", child1);
  main.import("queryHook", child1);
  main.import("pl", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("social")).define("social", ["makeSocial","makeShape","betrayalSplot"], _social);
  main.variable(observer()).define(["social"], _6);
  main.variable(observer("legend")).define("legend", ["swatches","recruitSplot"], _legend);
  main.variable(observer("viewport")).define("viewport", ["html","render","preview","recruitSplot"], _viewport);
  main.variable(observer()).define(["preview"], _10);
  main.variable(observer("preview")).define("preview", ["makeShape","makeSocial","recruitSplot","db"], _preview);
  main.variable(observer("recruitSplot")).define("recruitSplot", _recruitSplot);
  main.variable(observer("db")).define("db", ["makeWorld"], _db);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("render")).define("render", ["d3","dagred3"], _render);
  main.variable(observer("swatches")).define("swatches", ["d3","html","colorRamp"], _swatches);
  main.variable(observer("dynamicStyle")).define("dynamicStyle", ["html","betrayalSplot","recruitSplot","colorRamp"], _dynamicStyle);
  main.variable(observer("colorRamp")).define("colorRamp", ["d3"], _colorRamp);
  main.variable(observer("staticStyle")).define("staticStyle", ["html"], _staticStyle);
  const child2 = runtime.module(define2);
  main.import("dagred3", child2);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("confabulateHook")).define("confabulateHook", ["pick","makeShape","makeSocial"], _confabulateHook);
  main.variable(observer("makeShape")).define("makeShape", ["graphlib","pick"], _makeShape);
  main.variable(observer("makeSocial")).define("makeSocial", ["graphlib","wfc"], _makeSocial);
  main.variable(observer("wfc")).define("wfc", ["pick"], _wfc);
  main.variable(observer("scratch")).define("scratch", _scratch);
  return main;
}
