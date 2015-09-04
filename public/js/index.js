$(function() {
  var reservations;
  var resources;
  function renderGraph() {
    if(!(reservations && resources))
      return;

    // Sort the rooms alphabetically
    resources = resources.sort(function(a, b) {
      var keyA = a.name.toLowerCase(),
          keyB = b.name.toLowerCase();
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0;
    });

    // Set up the reservation list
    var start = 28800 ; // 8:00 AM
    var end = 68400; // 7:00 PM

    // Convert start / end times to seconds in the day
    reservations = reservations.map(function(r) {
      var from = new Date(r.from);
      var to = new Date(r.to);

      r.from = from.getSeconds() + (60 * from.getMinutes()) + (60 * 60 * from.getHours());
      r.to = to.getSeconds() + (60 * to.getMinutes()) + (60 * 60 * to.getHours());
      return r;
    });

    // Set scales
    var xscale = d3.scale.linear()
      .domain([start, end])
      .range([0, 100]);

    // Generate the x axis
    var hours = [];
    for(var x = start; x <= end; x += 3600) {
      var hour = (Math.floor(x/3600) - 1) % 12 + 1;
      var minute = (x % 3600);
      hours.push(hour + ":" + ((minute < 10)?"0":"") + minute);
    }

    // Render the x axis.
    var xaxis = d3.select("#x-axis").selectAll("div")
      .data(hours)
      .enter()
      .append("div")
      .attr("class", function(d, i) {
        return "time " + ((i%2 == 0)?"even": "odd") + ((i == hours.length - 1)?" last":"");
      })
      .style("width", (100 / hours.length) + "%")
      .append("div")
      .text(function(d) {
        return d;
      })
      .attr("class", "time-label");


    // Render the rooms.
    var timeline = d3.select("#timeline");

    // Create one row per entry
    var rows = timeline.selectAll("div")
      .data(resources)
      .enter()
      .append("div")
      .attr("class","row")

    // Add the label
    rows.append("div")
      .attr("class", "label")
      .text(function(d) {
        return d.name;
      })

    // Add the reservations
    rows.each(function(resource) {
      var row = d3.select(this);
      var filtered = reservations.filter(function(d) {
        return d.resource.id == resource.id;
      });
      row.append("div")
        .attr("class","timeline")
        .selectAll("div")
        .data(filtered)
        .enter()
        .append("div")
        .attr("class","reservation")
        .text(function(d) {
          return d.title;
        })
        .style("width", function(d) {
          return (xscale(d.to) - xscale(d.from)) + "%";
        })
        .style("left", function(d) {
          return (xscale(d.from)) + "%";
        });
    })
  }


  $.ajax('/reservations', {
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    reservations = data;
    renderGraph();
  })

  $.ajax('/resources', {
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data) {
    resources = data;
    renderGraph();
  })

})
