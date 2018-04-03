define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/

	// The application is ready
	topic.subscribe("tpl-ready", function(){
	/*
	 * Custom Javascript to be executed when the application is ready goes here
	 */
	});

	var WEBMAP_ID = "d1a55950a92048a09124e315b4cc866f",
		LAYER_ID = "23bbe596ae4a42408ac36bc9402c6727";

	var clickHandlerIsSetup = false;

	topic.subscribe("story-loaded-map", function(result){
		if ( result.id == WEBMAP_ID && ! clickHandlerIsSetup ) {
			var map = app.maps[result.id].response.map,
				layer = map.getLayer(LAYER_ID);

			if ( layer ) {
				layer.on("click", function(e){
					var index = e.graphic.attributes["Rank"];
					topic.publish("story-navigate-section", index);
				});
			}
		}
	});
});
