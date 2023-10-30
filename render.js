
export function render (node, graph) {
    let w = d3.select(node).attr('width'),
        h = d3.select(node).attr('height')

    let chart =  d3.geoOrthographic().scale(120).translate([.85 * w/2, h/2]),
        path = d3.geoPath().projection(chart)

    let n = graph.nodes().length;

    let rot = 2 * Math.PI / n,
        a = .62,
        r = 60
    let pt = (v) => [r * Math.cos(v * rot - a),
                    r * Math.sin(v * rot - a)]
    // let pt = (v) => [0, (h * v / n) - (h / 2)]
    window.pt = pt

    d3.select(node).append('g').selectAll('rect')
        .data(social.nodes())
        .join('rect')
        .attr('x', (v) => chart(pt(v))[0] - 50)
        .attr('y', (v) => chart(pt(v))[1] - 15)
        .attr('rx', 3)
        .attr('width', 100)
        .attr('height', 30)

    d3.select(node).select('g').selectAll('path')
        .data(social.edges())
        .join('path')
        .attr('d', d => path({type: 'LineString',
                            coordinates: [pt(d.v), pt(d.w)]}))
        .style('fill', 'none')
        .style('stroke', 'black')
}