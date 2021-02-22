import * as d3 from "d3v5";

const colors = d3["schemeAccent"];

const orderedColor = function (id) {
  return colors[id % colors.length];
};

export default function NodesChart(data, target, sketchMode) {
  console.log("data", data);
  const height = 600;
  const width = target.offsetWidth + 200;

  const drag = (simulation) => {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
  };

  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(" ").reverse(),
        firstWord = text.text().split(" ")[0],
        word;
      console.log("words", words);
      var line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x");
      var y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width && word !== firstWord) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .attr("dx", "-" + Math.min(2.5, (lineNumber + 1) * 2.5) + "em")
            .text(word);
        }
      }
    });
  }

  const simulation = d3
    .forceSimulation(data.nodes)
    .force(
      "link",
      d3
        .forceLink(data.links)
        .id((d) => d.id)
        .strength(0.15)
    )
    .force("charge", d3.forceManyBody().strength(15))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(41).iterations(5));

  console.log("new data", data);

  d3.select(target).selectAll("*").remove();
  const svg = d3.select(target).append("svg").attr("viewBox", [0, 0, width, height]);
  svg.attr("id", "graph");
  svg.style("overflow", "visible");

  console.log("sketchModel", sketchMode);

  const node = svg
    .append("g")
    .selectAll("g")
    .data(data.nodes)
    .join("g")
    .attr("class", "node")
    .append("circle")
    .attr("stroke", (d) => (!d.sketch || !sketchMode ? "#031628" : "#ccc"))
    .attr("stroke-width", 2)
    .attr("r", 40)
    .attr("fill", (d) => (d.sketch ? "#cddc39" : "#e83e8c"))
    .style("opacity", (d) => (!sketchMode ? 1 : !d.sketch ? 0.3 : 1))
    .call(drag(simulation));

  var linkText = svg
    .selectAll(".node")
    .append("text")
    .attr("class", "nodeLabel")
    .text((d) => d.name)
    .style("fill", "#fff")
    .style("font-size", 14)
    .style("pointer-events", "none")
    .call(wrap, 40);

  simulation.on("tick", () => {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    linkText
      .attr("x", function (d) {
        return d.x - 20;
      })
      .attr("y", function (d) {
        return d.y;
      });
  });
}
