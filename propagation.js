
import {Graph, readJSON, writeJSON} from "./lib/graph.es.js"
import {pick} from "./utility.js"

function confabulateHook (world) {
  return (constraints, splot, n = 4) => {
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
}

// given a list of IDs, generates a random network over those.
export function makeShape(nodeIds, nodeLabels = new Map()) {
    const g = new Graph();
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
  
  export const makeSocial = (shape, splot, attempts = 100) => {
    let ret = undefined;
    let take;
    for (take = 0; take < attempts; ++take) {
      try {
        // plug in the splot we want
        let wip = readJSON(writeJSON(shape));
        ret = wfc(wip, splot); // "verbose"
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
  
  export const wfc = (g, splot, verbose = false) => {
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