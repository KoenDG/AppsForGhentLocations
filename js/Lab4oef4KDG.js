$(document).ready(function() {
    var soort = $('#update').val();
    begin(soort);
    
    $('#update').on('change', function(e){
        e.preventDefault();
        //console.log($('#update').val());
        begin($('#update').val());
    });
    
    function begin(soort) {
        if(soort === undefined || soort === ''){
            var soort = 'aanplakborden';
        }
        var url = 'http://data.appsforghent.be/poi/' + soort + '.json';

        var mapOptions = {
            zoom : 12,
            center : new google.maps.LatLng(51.066428,3.722992),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
    
        var myMap = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    
        $.ajax(url,{
            timeout : 10000,
            dataType :"json",
            success : function(data) {
                console.log(typeof data);
                $.each(data[soort], function(key, val) {
                    var point = new google.maps.LatLng(parseFloat(val.lat),parseFloat(val.long));
                    //Netbeans generates error over val.long, long is a "future reserved keyword". Still works.
                    var marker = new google.maps.Marker({
                        position: point,
                        map: myMap,
                        title:val.data
                    });
                });
            }
        });
        console.log(myMap);
    }
    
});