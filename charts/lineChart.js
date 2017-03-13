(function() {

	// A multiple line chart

	// The Model
	// On the y a time variable, on the x one or more numerial ones.

	var model = raw.model();

	// x dimension. Must be a Date variable
	// It can accept both numbers and strings
	var x = model.dimension()
		.title('Time Axis')
		.types(Date)
		.required(1)

	// Values dimension. It will define the height of the bars
	var y = model.dimension()
		.title('Y Axis')
		.types(Number)
        .required(1)

    var group = model.dimension()
        .title('Group Axis')

	// Mapping function
	// For each record in the data returns the values
	// for the X and Y dimensions and casts them as numbers
	model.map(function(data) {

		var results = d3.nest()
						.key(group)
						//.sortKeys(function(d){ return 1})
/*						.key(categories)
						.rollup(function(g){
							//get all the variables from the first item
							var result = g.map(function(d){
														return {
															group: groups(d),
															category: categories(d),
															color: colorsDimesion(d)
														}
													})[0];
							//If the size is defined, sum the size, otherwise count items
							result.size = sizes() != null ? d3.sum(g, function(d) {return sizes(d) }) : g.length;

							return result;
						})*/
						.entries(data);

		//for each group, flatten the second level of nest
		/*results.forEach(function(group){
			temp_values = [];
			//get the values, flatten them
			group.values.forEach(function(category){
				temp_values.push(category.values);
			})
			group.values = temp_values;
		});*/
        console.log(results)
		return results;
	})


	// The Chart
	var chart = raw.chart()
		.title("Line chart")
		.description("A line chart shows how a numerical variable changes in time.</br> Chart based on <a href='https://bl.ocks.org/mbostock/3884955'>https://bl.ocks.org/mbostock/3884955</a>")
		.thumbnail("imgs/lineChart.png")
		.category('Time series')
		.model(model)

	// visualiziation options
	// Width
	var width = chart.number()
		.title('Width')
		.defaultValue(800)

	// Height
	var height = chart.number()
		.title('Height')
		.defaultValue(600)

	// Chart colors
	var colors = chart.color()
        .title("Color scale")

	// Drawing function
	// selection represents the d3 selection (svg)
	// data is not the original set of records
	// but the result of the model map function
	chart.draw(function(selection, data) {

		var margin = {top: 0, right: 0, bottom: 50, left: 50};

        var w = +width(),
            h = +height();

        var svg = selection
            .attr("width", w)
            .attr("height", h)

        var g = svg.append("g")

        var xAxis = d3.time.scale()
            .range([0, w])
            .domain([0, 100]);

        var yAxis = d3.scale.linear()
            .range([h, 0])
            .domain([0, 100]);

        g.append("g")
            .attr("class", "axis axis--x")
            .style("font-size","10px")
			.style("font-family","Arial, Helvetica")
            .attr("transform", "translate(0," + (h - margin.bottom) + ")")
            .attr("fill", "#000")
            .call(d3.svg.axis()
                .scale(xAxis)
                .orient("bottom")
            );

        g.append("g")
            .attr("class", "axis axis--y")
            .style("font-size","10px")
			.style("font-family","Arial, Helvetica")
            .attr("transform", "translate(" + margin.left + ",0)")
            .attr("fill", "#000")
            .call(d3.svg.axis()
                .scale(yAxis)
                .orient("left")
            );
    })

})();
