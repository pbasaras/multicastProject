
// the following was extracted from the spec in October 2014

var media_events = new Array();
media_events["loadstart"] = 0;
media_events["progress"] = 0;
media_events["suspend"] = 0;
media_events["abort"] = 0;
media_events["error"] = 0;
media_events["emptied"] = 0;
media_events["stalled"] = 0;
media_events["loadedmetadata"] = 0;
media_events["loadeddata"] = 0;
media_events["canplay"] = 0;
media_events["canplaythrough"] = 0;
media_events["playing"] = 0;
media_events["waiting"] = 0;
media_events["seeking"] = 0;
media_events["seeked"] = 0;
media_events["ended"] = 0;
media_events["durationchange"] = 0;
media_events["timeupdate"] = 0;
media_events["play"] = 0;
media_events["pause"] = 0;
media_events["ratechange"] = 0;
media_events["resize"] = 0;
media_events["volumechange"] = 0;

var media_properties = [ "error", "src", "srcObject", "currentSrc", "crossOrigin", "networkState", "preload", "buffered", "readyState", "seeking", "currentTime", "duration",
"paused", "defaultPlaybackRate", "playbackRate", "played", "seekable", "ended", "autoplay", "loop", "controls", "volume",
"muted", "defaultMuted", "audioTracks", "videoTracks", "textTracks", "width", "height", "videoWidth", "videoHeight", "poster" ];

var user_experience = new Array();
user_experience["rebuffering_frequency"] = 0;
user_experience["last_rebuffer_duration"] = 0;
user_experience["total_rebuffer_duration"] = 0;

var media_properties_elts = null;
var webm = null;

var rebuffering_event = false;
var rebuffering_start_time = null;

function init() {

    document._video = document.getElementById("video_bell");
    //webm = document.getElementById("webm");
    //media_properties_elts = new Array(media_properties.length);

    //init_events("events", media_events);
    //init_properties("properties", media_properties, media_properties_elts);
    //init_mediatypes();
    //init_user_QoE();
    //init_player_statistics();

    // in miliseconds, 10 is the minimum possible value.
    //setInterval(update_properties, 10);
    setInterval(radioButtonTrack,700);
}
document.addEventListener("DOMContentLoaded", init, false);


function init_events(id, arrayEventDef)
{
    for (key in arrayEventDef) {
		document._video.addEventListener(key, capture, false);
    }

    /*var tbody = document.getElementById(id);
    var i = 1;
    var tr = null;
    for (key in arrayEventDef) {
		if (tr == null) tr    = document.createElement("tr");
		var th = document.createElement("th");
		th.textContent = key;
		var td = document.createElement("td");
		td.setAttribute("id", "e_" + key);
		td.textContent = "0";
		td.className = "false";
		tr.appendChild(th);
		tr.appendChild(td);

		if ((i++ % 5) == 0) {
		    tbody.appendChild(tr);
		    tr = null;
		}
    }
    if (tr != null) tbody.appendChild(tr);*/
}

function radioButtonTrack()
{
	if(document.getElementById('home').checked)	{		
		document.getElementById("myBg").src = "images/home4.png";
	}
	else if(document.getElementById('cell_center').checked){		
		document.getElementById("myBg").src = "images/cell_center4.png";
	}
	else if(document.getElementById('cell_edge').checked){
		document.getElementById("myBg").src = "images/cell_edge4.png";
	}
	else if(document.getElementById('pub').checked){
		document.getElementById("myBg").src = "images/pub4.png";
	}
}

function init_properties(id, arrayPropDef, arrayProp) {
    var tbody = document.getElementById(id);
    var i = 0;
    var tr = null;
    do {
		if (tr == null) tr    = document.createElement("tr");
		var th = document.createElement("th");
		th.textContent = arrayPropDef[i];
		var td = document.createElement("td");
		var r;
		td.setAttribute("id", "p_" + arrayPropDef[i]);
		r = eval("document._video." + arrayPropDef[i]);
		td.textContent = r;
		if (typeof(r) != "undefined") {
		    td.className = "true";
		} else {
		    td.className = "false";
		}
		tr.appendChild(th);
		tr.appendChild(td);
		arrayProp[i] = td;
		if ((++i % 3) == 0) {
		    tbody.appendChild(tr);
		    tr = null;
		}
    } while (i < arrayPropDef.length);
    if (tr != null) tbody.appendChild(tr);
}

function init_mediatypes() {
    var tbody = document.getElementById("m_video");
    var i = 0;
    var tr = document.createElement("tr");
    var videoTypes = [ "video/mp4", "video/webm"];
    i = 0;
    tr = document.createElement("tr");
    do {
	var td = document.createElement("th");
	td.textContent = videoTypes[i];
	tr.appendChild(td);
    } while (++i < videoTypes.length);
    tbody.appendChild(tr);

    i = 0;
    tr = document.createElement("tr");

    if (!!document._video.canPlayType) {
      do {
	var td = document.createElement("td");
	var support = document._video.canPlayType(videoTypes[i]);
	td.textContent = '"' + support + '"';
	if (support === "maybe") {
	    td.className = "true";
	} else if (support === "") {
	    td.className = "false";
	}
	tr.appendChild(td);
      } while (++i < videoTypes.length);
      tbody.appendChild(tr);
    }
}

function init_user_QoE()
{
    /*var tbody = document.getElementById("QoE");
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = 'Frozen Screen Events';		// rebuffering frequency
    var td = document.createElement("td");
    td.setAttribute("id", "e_rb_frequency");
    td.textContent = "0";
    td.className = "false";
    tr.appendChild(th);
    tr.appendChild(td);

    var th = document.createElement("th");
    th.textContent = 'last rb duration';	// most recent rebuffer duration
    var td = document.createElement("td");
    td.setAttribute("id", "e_last_rb_duration");
    td.textContent = "0";
    td.className = "false";
    tr.appendChild(th);
    tr.appendChild(td);

    var th = document.createElement("th");
    th.textContent = 'total rb duration';	// total rebuffer duration
    var td = document.createElement("td");
    td.setAttribute("id", "e_total_rb_duration");
    td.textContent = "0";
    td.className = "false";
    tr.appendChild(th);
    tr.appendChild(td);
    
    tbody.appendChild(tr);*/
}

function init_player_statistics()
{
    /*var tbody = document.getElementById("players_statistics");
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = 'seconds buffered';		// re
    var td = document.createElement("td");
    td.setAttribute("id", "e_buffered_data");
    td.textContent = "0";
    td.className = "false";
    tr.appendChild(th);
    tr.appendChild(td);

    tbody.appendChild(tr);*/

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function capture(event)
{
    media_events[event.type]++;
    
    if (event.type == 'waiting' && !rebuffering_event){ // !rebuffering_event is needed because waiting might be trigger multiple times for the same rebuffering event
	rebuffering_start();	
    }
    if (event.type == 'playing'){
	rebuffering_end();	
    }

    //get_buffered_data();
}

function rebuffering_start()
{
    var d = new Date();
    rebuffering_start_time = d.getTime();    
    user_experience["rebuffering_frequency"]++;

    rebuffering_event = true;

    var element = document.getElementById("e_rb_frequency");
    if(element){
	element.textContent = user_experience["rebuffering_frequency"];
	element.className = "true";
    }
}

function rebuffering_end()
{
    var d = new Date();
    var rebuffering_end_time = d.getTime();
	
    if(rebuffering_event){
	user_experience["last_rebuffer_duration"] = ((rebuffering_end_time - rebuffering_start_time)/1000);   	// in seconds
	user_experience["total_rebuffer_duration"] += user_experience["last_rebuffer_duration"]			// in seconds

    	var element = document.getElementById("e_last_rb_duration");
    	if(element){
		element.textContent = user_experience["last_rebuffer_duration"].toFixed(3);
		element.className = "true";
    	}
	element=null;
	element = document.getElementById("e_total_rb_duration");
    	if(element){
		element.textContent = user_experience["total_rebuffer_duration"].toFixed(3);
		element.className = "true";
    	}
	rebuffering_event = false;
	window.onload();
    }
}

function get_buffered_data()
{
    /*var buffered_data = document._video.buffered.end(0) - document._video.currentTime; // seconds buffered

    var element = document.getElementById("e_buffered_data");
    if(element){
		element.textContent = buffered_data.toFixed(3);
		element.className = "true";
    }*/
}

function update_properties()
{
    var i = 0;
    for (key in media_events) {
		var e = document.getElementById("e_" + key);
	        if (e) {
		    e.textContent = media_events[key];
		    if (media_events[key] > 0) e.className = "true";
		}
    }
    for (key in media_properties) {
		var val = eval("document._video." + media_properties[key]);
		media_properties_elts[i++].textContent = val;
    }
    if (document._video.audioTracks !== undefined) {
		try {
		    var td = document.getElementById("m_audiotracks");
		    td.textContent = document._video.audioTracks.length;
		    td.className = "true";
		} catch (e) {}
	}
	if (document._video.videoTracks !== undefined) {
		try {
		    var td = document.getElementById("m_videotracks");
		    td.textContent = document._video.videoTracks.length;
		    td.className = "true";
		} catch (e) {}
	}
	if (document._video.textTracks !== undefined) {
		try {
		    var td = document.getElementById("m_texttracks");
		    td.textContent = document._video.textTracks.length;
		    td.className = "true";
		} catch (e) {}
    }
}

function resize()
{
    document._video.width = document._video.videoWidth + 10;
    document._video.height = document._video.videoHeight + 10;
}

function getVideo()
{
    return document._video;
}

function playPause() {

    if (document._video.paused)
    {
        document._video.play();
        document.getElementById("play_pause").innerHTML  = "Pause";
    }
    else
    {
        document._video.pause(); 
        document.getElementById("play_pause").innerHTML  = "Play";
    }
} 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
