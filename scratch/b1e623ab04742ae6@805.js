function _1(md){return(
md`# database`
)}

function _test(makeWorld)
{
  let db = makeWorld();
  db.defineAgent("Foo");
  db.defineAgent("Bar");

  let v = db.getAgent("Foo");
  // db.assert("role", "mentor", "Foo", "Bar");
  db.assert("action", "harmed", 1, 2);
  return db;
}


function _3(test){return(
test.query("action(T, What, V, W).")
)}

function _5(test){return(
test.predicates
)}

async function _tau_pl(require){return(
await require("tau-prolog@0.2").catch(() => window.pl)
)}

function _pl(tau_pl)
{
  class QueryIterator {
    constructor(session) {
      this._session = session;
      this._callback = (x) => (this._value = x);
    }
    [Symbol.iterator]() {
      return this;
    }
    next() {
      this._session.answer(this._callback);
      return this._value ? { done: false, value: this._value } : { done: true };
    }
  }

  class Program {
    constructor(source) {
      this._session = tau_pl.create();
      this._session.consult(source); // , { success: () => (this.ready = true) });
    }
    query(source) {
      // TODO: wait until I'm ready?
      this._session.query(source);
      return new QueryIterator(this._session);
    }
  }

  return function () {
    return new Program(String.raw.apply(String, arguments));
  };
}


function _8(md){return(
md`### interface
\`\`\`
import {pick, query, valueOf, assert, retract, reset} from 'b1e623ab04742ae6'
\`\`\``
)}

function _queryHook(munger){return(
(cache) => (q) => munger(cache.pl)(q)
)}

function _assertHook(dbString,pl){return(
(db = [], cache = {}) =>
  (predicate, value, ...agents) => {
    db.unshift([predicate, value, ...agents]);
    // mutable predicates = mutable predicates;

    cache.str = dbString(db);
    cache.pl = pl`${dbString(db)}`;
  }
)}

function _valueOf(){return(
(db) => (predicate, ...agents) => {
  let res = db
    .filter(
      ([Prop, Value, ...Agents]) =>
        Agents.length == agents.length &&
        agents.every((_, i) => agents[i] == Agents[i])
    )
    .find(([Prop]) => Prop == predicate);
  return res ? res[1] : undefined;
}
)}

function _13(test){return(
test.predicates
)}

function _14(test){return(
test.living()
)}

function _makeWorld(assertHook,valueOf,queryHook,d3){return(
() => {
  let predicates = [],
    cache = {},
    nextAgentId = 1;

  let assert = assertHook(predicates, cache),
    get = valueOf(predicates),
    query = queryHook(cache),
    defineAgent = (name, faction) => {
      assert("called", name, nextAgentId);
      if (faction) {
        assert("joined", faction, nextAgentId);
        assert("recruited", 0, nextAgentId);
      }
      // TODO: initial traits
      return nextAgentId++;
    },
    everyone = () => d3.range(1, nextAgentId),
    living = () => everyone().filter((v) => get("killed-by", v) == undefined),
    getAgent = (name) =>
      everyone()
        .map((v) => [v, get("called", v)])
        .find((s) => s[1] == name)[0]; // FIXME: nice error on missing agents

  return {
    assert,
    defineAgent,
    getAgent,
    query,
    get,
    predicates,
    everyone,
    living,
    cache
  };
}
)}

function _16(md){return(
md`### utilities`
)}

function _derived(){return(
`
anXisY(X, Y, V, W) :-
  virtue(T, Y, W),
  stance(T_, X, V, W),
  T < T_.
`
)}

function _18(md){return(
md`### utilities`
)}

function _pick(){return(
(choices, mask = choices.map((_) => true)) => {
  let res = choices.filter((_, i) => mask[i]);
  return res[Math.floor(Math.random() * res.length)];
}
)}

function _20(md){return(
md`### tests`
)}

function _22(assertHook,queryHook,valueOf)
{
  let db = [],
    cache = {};
  let assert = assertHook(db, cache),
    query = queryHook(cache),
    get = valueOf(db);

  assert("virtue", "wise", 1);
  assert("stance", "friend", 0, 1);
  assert("virtue", "avid", 1);

  // return dbString(db);
  return [
    query("virtue(T, S, Who).")[0],
    get("virtue", 1),
    query("anXisY(X, Y, V, W).")[0] // FIXME: caching issue - won't pick up most recent event
  ];
}


function _23(md){return(
md`### internals`
)}

function _munger(){return(
(program) => (
  q,
  f = (u) =>
    Object.fromEntries(
      Object.keys(u)
        .map((k) => {
          // handle Entity, Num, and _ by default.
          if (u[k].id)
            return u[k].id == "_"
              ? null
              : u[k].id == "null"
              ? [k, null]
              : [k, u[k].id];
          else if (u[k].value || u[k].value === 0) return [k, u[k].value];
          else return [k, u[k]];
        })
        .filter((k) => k)
    )
) => Array.from(program.query(q), (s) => f(s.links || s.args[0].args))
)}

function _dbString(derived){return(
(predicates) => `
${predicates
  .map(
    ([Prop, Value, ...Agents], t) =>
      `${Prop}(${predicates.length - t - 1}, ${[
        Value === undefined
          ? `undefined`
          : Value === null
          ? `null`
          : `'${Value}'`,
        ...Agents
      ].join(", ")}).`
  )
  .join("\n")}

${derived}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("test")).define("test", ["makeWorld"], _test);
  main.variable(observer()).define(["test"], _3);
  main.variable(observer()).define(["test"], _5);
  main.variable(observer("tau_pl")).define("tau_pl", ["require"], _tau_pl);
  main.variable(observer("pl")).define("pl", ["tau_pl"], _pl);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("queryHook")).define("queryHook", ["munger"], _queryHook);
  main.variable(observer("assertHook")).define("assertHook", ["dbString","pl"], _assertHook);
  main.variable(observer("valueOf")).define("valueOf", _valueOf);
  main.variable(observer()).define(["test"], _13);
  main.variable(observer()).define(["test"], _14);
  main.variable(observer("makeWorld")).define("makeWorld", ["assertHook","valueOf","queryHook","d3"], _makeWorld);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("derived")).define("derived", _derived);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("pick")).define("pick", _pick);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["assertHook","queryHook","valueOf"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("munger")).define("munger", _munger);
  main.variable(observer("dbString")).define("dbString", ["derived"], _dbString);
  return main;
}
