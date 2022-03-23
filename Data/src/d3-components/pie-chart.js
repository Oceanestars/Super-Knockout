function pieChart(data){
    var width = 450
    var height = 450
    // var widthPercentage = "150%"
    // var heightPercentage = "150%"
    var margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);
legendGenerator(data, d3.schemeSet2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 1)

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .attr("class", "textCaption")
  .text(function(d){ return d.data.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style('font-family', '"Montserrat", sans-serif')
  .style("font-size", 19)
  .style("width", 10)

  // Unable to get this to work
  // var legendRectSize=20;
  // var legendSpacing=7;
  // var legendHeight=legendRectSize+legendSpacing;


  // var legend=svg.selectAll('.legend')
  //         .data(color.domain())
  //         .enter()
  //         .append('g')
  //         .attr({
  //             class:'legend',
  //             transform:function(d,i){
  //                 //Just a calculation for x & y position
  //                 return 'translate(-35,' + ((i*legendHeight)-65) + ')';
  //             }
  //         });
  // legend.append('rect')
  //         .attr({
  //             width:legendRectSize,
  //             height:legendRectSize,
  //             rx:20,
  //             ry:20
  //         })
  //         .style({
  //             fill:color,
  //             stroke:color
  //         });

  // legend.append('text')
  //         .attr({
  //             x:30,
  //             y:15
  //         })
  //         .text(function(d){
  //             return d;
  //         }).style({
  //             fill:'#929DAF',
  //             'font-size':'14px'
  //         });

}

function legendGenerator(dataDict, colors){
  console.log(dataDict);
  console.log(colors);
  var indexColor = 0
  var legendHolder = document.getElementById('legend');
  var newList = '';
;

  for (const [key, value] of Object.entries(dataDict)) {
    console.log(key, value);
    newList += '<li ><div class="dot"></div>' + key + '</li>';
  }


  legendHolder.innerHTML += '<ul >' + newList + '</ul>';
  console.log(newList);
  for (let i = 0; i < 5; i++) {
    document.getElementsByClassName('dot')[i].style.backgroundColor = colors[i];
  }

  // first child of legendHolder is a ul
  legendHolder.firstElementChild.style.listStyleType = "none";
  console.log(getComputedStyle(document.querySelector('li'), ':before').getPropertyValue('background-color'));

}

export {pieChart};