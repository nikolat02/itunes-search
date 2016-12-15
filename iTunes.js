$(document).ready(function () {
  $('#search-start').on('click', search);
});

function search(){
  var params = {
		term: $('#search-term').val(),
		country: "US",
		media: $('#search-media').val(),
		limit: 200,
		callback: "parseResults"
	};
  var encodedParams = urlEncode(params);

	var url = "https://itunes.apple.com/search?" + encodedParams;
	var html = '<script src="' + url + '"><\/script>';
	$('head').append(html);

}

function urlEncode(object) {
	var query = '';
	for (var key in object) {
		query += key + '=' + object[key] + '&';
	}

	return query;
}

function parseResults(result) {
  console.log(result);
      				var results = result.results;
      				searchResults = result;
      				var html = "";
              var pages = Math.ceil(results.length/10);
        				html += '<div class = "btn-group">';
        				for (var i = 0; i < pages; i++){
        					var pageNumber = i+1;
        					//if (pageNumber === 1){
        					//	html += '<input class = "currentPageButton" type = "button" value = "'+pageNumber+'" onclick= "goToPage('+pageNumber+');">';
        					//}
        					//else
        					//{
        					html += '<button  type = "button" class = "btn btn-default" onclick= "goToPage('+pageNumber+');">'+pageNumber+'</button>';
        					//}
        				};
        				html += '</div>';
        				for (var i = 0; i < 10  && i < results.length; i++) {
        					var item = results[i];
        					var obj = {
        						source: 0,
        						track_id: item.trackId,
        						track_name: item.trackCensoredName,
        						track_url: item.trackViewUrl,
        						artist_name: item.artistName,
        						artist_url: item.artistViewUrl,
        						collection_name: item.collectionCensoredName,
        						collection_url: item.collectionViewUrl,
        						genre: item.primaryGenreName
        					};

        					html += '<div class="songs-search-result">';
        					html += '<p><strong>Track: </strong>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
        					html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
        					html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;</p>'.replace("{0}", obj.track_url);
        					html += '<p><strong>Track Price: </strong>{0} {1}</p>'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
        					html += '<p><strong>Artist: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
        					html += '<p><strong>Album: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
        					html += '<p><strong>Album Price: </strong>{0} {1}</p>'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
        					html += '<p><strong>Primary Genre: </strong>{0}</p>'.replace("{0}", obj.genre);
        					html += '</div>';
        					html += '<br>';
        					html += '<div class="separator"></div>';
        					html += '<br>';
        				}
        				jQuery('#results').html(html);
        			}
  function goToPage(page){
              	var results = searchResults.results;
              				var html = "";
              				var pages = Math.ceil(results.length/10);
              				if (page === 0){
              					page = 1;
              				}
              				html += '<div class = "pageButtons">';
              				for (var i = 0; i < pages; i++){
              					var pageNumber = i+1;
              					if (pageNumber === page){
              						html += '<input class = "currentPageButton" type = "button" value = "'+pageNumber+'" onclick= "goToPage('+pageNumber+');">';
              					}
              					else
              					{
              					html += '<input class = "pageButton" type = "button" value = "'+pageNumber+'" onclick= "goToPage('+pageNumber+');">';
              					}
              				};
              				html += '</div>';
              				html += '<br><br>';
              				var firstResult = (page-1)*10;
              				var lastResult  = 0;
              				if (results.length >= page*10){
              					lastResult = page*10;
              				}
              				else {
              					lastResult = results.length;
              				}
              				for (var i = firstResult; i < lastResult; i++) {
              					var item = results[i];
              					var obj = {
              						source: 0,
              						track_id: item.trackId,
              						track_name: item.trackCensoredName,
              						track_url: item.trackViewUrl,
              						artist_name: item.artistName,
              						artist_url: item.artistViewUrl,
              						collection_name: item.collectionCensoredName,
              						collection_url: item.collectionViewUrl,
              						genre: item.primaryGenreName
              					};

              					html += '<div class="songs-search-result">';
              					html += '<p><strong>Track: </strong>{0}&nbsp;&nbsp;'.replace("{0}", obj.track_name);
              					html += '<a href="{0}" target="_blank">Preview</a>&nbsp;&nbsp;'.replace("{0}", item.previewUrl);
              					html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;&nbsp;'.replace("{0}", obj.track_url);
              					html += '<strong>Track Price: </strong>{0} {1}</p>'.replace("{0}", item.trackPrice).replace("{1}", item.currency);
              					html += '<p><strong>Artist: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.artist_url).replace("{1}", obj.artist_name);
              					html += '<p><strong>Album: </strong><a href="{0}" target="_blank">{1}</a></p>'.replace("{0}", obj.collection_url).replace("{1}", obj.collection_name);
              					html += '<p><strong>Album Price: </strong>{0} {1}</p>'.replace("{0}", item.collectionPrice).replace("{1}", item.currency);
              					html += '<p><strong>Primary Genre: </strong>{0}</p>'.replace("{0}", obj.genre);
              					html += '</div>';
              					html += '<br>';
              					html += '<div class="separator"></div>';
              					html += '<br>';
              				}

              				jQuery('#results').html(html);
              			}
