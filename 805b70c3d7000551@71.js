// https://observablehq.com/@mbostock/hello-dagre@71
function _1(md){return(
md`# Hello, Dagre!

Ref. [Sentence Tokenization](https://dagrejs.github.io/project/dagre-d3/latest/demo/sentence-tokenization.html)`
)}

function* _2(graphlib,d3,html,width,dagred3)
{
  const graph = new graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));

  graph.setNode(0, {label: "TOP", class: "type-TOP"});
  graph.setNode(1, {label: "S", class: "type-S"});
  graph.setNode(2, {label: "NP", class: "type-NP"});
  graph.setNode(3, {label: "DT", class: "type-DT"});
  graph.setNode(4, {label: "This", class: "type-TK"});
  graph.setNode(5, {label: "VP", class: "type-VP"});
  graph.setNode(6, {label: "VBZ", class: "type-VBZ"});
  graph.setNode(7, {label: "is", class: "type-TK"});
  graph.setNode(8, {label: "NP", class: "type-NP"});
  graph.setNode(9, {label: "DT", class: "type-DT"});
  graph.setNode(10, {label: "an", class: "type-TK"});
  graph.setNode(11, {label: "NN", class: "type-NN"});
  graph.setNode(12, {label: "example", class: "type-TK"});
  graph.setNode(13, {label: ".", class: "type-."});
  graph.setNode(14, {label: "sentence", class: "type-TK"});

  graph.nodes().forEach(v => {
    const node = graph.node(v);
    node.rx = node.ry = 5;
  });

  graph.setEdge(3, 4);
  graph.setEdge(2, 3);
  graph.setEdge(1, 2);
  graph.setEdge(6, 7);
  graph.setEdge(5, 6);
  graph.setEdge(9, 10);
  graph.setEdge(8, 9);
  graph.setEdge(11,12);
  graph.setEdge(8, 11);
  graph.setEdge(5, 8);
  graph.setEdge(1, 5);
  graph.setEdge(13,14);
  graph.setEdge(1, 13);
  graph.setEdge(0, 1);

  const svg = d3.select(html`<svg width=${width} height=600>`);
  yield svg.node();

  svg.append("g")
      .call(new dagred3.render(), graph)
      .attr("transform", `translate(${(width - graph.graph().width) / 2},20)`);

  svg.attr("height", graph.graph().height + 40);
  yield svg.node();
}


function _style(html){return(
html`<style>

g.type-TK > rect {
  fill: #00ffd0;
}

text {
  font-weight: 300;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serf;
  font-size: 14px;
}

.node rect {
  stroke: #999;
  fill: #fff;
  stroke-width: 1.5px;
}

.edgePath path {
  stroke: #333;
  stroke-width: 1.5px;
}

</style>`
)}

async function _dagred3(lodash,graphlib,d3,dagre,require){return(
lodash, graphlib, d3, dagre, await require("dagre-d3@0.6/dist/dagre-d3.core.min.js")
)}

async function _dagre(graphlib,lodash,require){return(
graphlib, lodash, window.dagre = await require("dagre@0.8/dist/dagre.core.min.js")
)}

async function _graphlib(lodash,require){return(
lodash, window.graphlib = await require("graphlib@2/dist/graphlib.core.min.js")
)}

async function _lodash(require){return(
window.lodash = await require("lodash@4/lodash.min.js")
)}

async function _d3(require){return(
window.d3 = await require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["graphlib","d3","html","width","dagred3"], _2);
  main.variable(observer("style")).define("style", ["html"], _style);
  main.variable(observer("dagred3")).define("dagred3", ["lodash","graphlib","d3","dagre","require"], _dagred3);
  main.variable(observer("dagre")).define("dagre", ["graphlib","lodash","require"], _dagre);
  main.variable(observer("graphlib")).define("graphlib", ["lodash","require"], _graphlib);
  main.variable(observer("lodash")).define("lodash", ["require"], _lodash);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
