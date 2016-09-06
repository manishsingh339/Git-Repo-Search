// https://api.github.com/search/repositories?q=test+language:java+stars:%3E=500&sort=stars&order=desc

$(function(){
    searchGit.getLanguages();
    
});

$("#search-form").submit(function(e){
    e.preventDefault();
    searchGit.searchAndDisplay();
});

$( function() {
    $( "#slider" ).slider({
      range: "min",
      value: 500,
      min: 1,
      max: 1000,
      slide: function( event, ui ) {
        $( "#slide-val" ).text(ui.value);
      }
    });    
  });

$("#result").on('click','.result-item', function(e){    
    $(".result-item").removeClass("active");
    searchGit.showRepoDetails(this.dataset.id);
    $(this).addClass("active");
});

$("#show-more-con").on('click', '#show-more', function(e){    
    var endIndex = searchGit.currentResIndex+5;
   
   for(currIndex = searchGit.currentResIndex; currIndex < endIndex;  currIndex++){
        $($($('#result').find('.result-item'))[currIndex]).show();
   }
   searchGit.currentResIndex = endIndex;
});

var searchGit = {
    language:"",
    stars:500,
    searchTerm:"",
    currentResIndex: 1,
    
    searchAndDisplay: function(){
        var url = "https://api.github.com/search/repositories";
        var params = "q="+searchGit.searchTerm+"+language:"+searchGit.language+"+stars:>="+searchGit.stars+"&sort=stars&order=desc";
        searchGit.language = $("#selectpicker").val();
        searchGit.searchTerm = $("#search-term").val();
        searchGit.stars = $("#slide-val").text();
        if(!searchGit.searchTerm){
            alert("Please enter search term");
        }
        searchGit.getResult(url, params, function(result){
            console.log(result);
            $("#totalcount").text("").text(result.total_count);
            $("#selected-lang").text("").text(searchGit.language);
            result = result.items;
            $("#result").empty();
            var idDetailsMap = {}; 
            localStorage.removeItem("respoDetails");            
            searchGit.currentResIndex = 1;
            
            for(var i in result){  
                idDetailsMap[result[i].id] = result[i];
                $('#result').append('<div style="display:none;" class="result-item" data-id="'+result[i].id+'">'+
                '<div class="row">'+
                '<div class="col-sm-2">'+
                '<i class="fa fa-angle-double-right fa-5" aria-hidden="true"></i>'+
                '</div>'+
                '<div class="col-sm-10 text-left">'+                    
                '<a id="repo-name" href="'+result[i].html_url+'" target="_blank">'+ result[i].full_name +'</a>'+                        
                '</div>'+
                '</div>'+
                '<div class="row">'+
                '<div class="col-sm-4 text-center">'+
                '<span>Language: '+ result[i].language +'</span>'+                                   
                '</div>'+
                '<div class="col-sm-8 border-left">'+
                result[i].description+
                '</div>'+
                '</div>'+
                '</div>');                           
            }
            localStorage.setItem("respoDetails", JSON.stringify(idDetailsMap));
            $($('#result').find('.result-item')[0]).click();
            $("#show-more").click();
        });
    },
    
    showRepoDetails: function(id){
        var currentRepo = JSON.parse(localStorage.getItem("respoDetails"))[id];               
        $("#clone-url").text("").text(currentRepo.clone_url);
        $("#forks").text("").text(currentRepo.forks_count);
        $("#stars").text("").text(currentRepo.stargazers_count);
        $("#open-issues").text("").text(currentRepo.open_issues_count);
        $("#watchers").text("").text(currentRepo.watchers_count);
        $("#score").text("").text(currentRepo.score.toFixed(2));        
    },
    
    getLanguages: function(){
        for(var i in allLanguages){              
            $("#selectpicker").append("<option>"+ allLanguages[i] +"</option>");
        }   
        $("#selectpicker").val("JavaScript");
        $("#search-term").val("").val("Test");
        $("#search-form").submit();
    },
    
    getResult: function(apiUrl, params, callBack){        
        $.ajax({
            url: apiUrl,
            type: "GET",
            data: params,                        
            success: function(response, status, headerObj) {
                if(callBack && typeof(callBack) == "function"){
                    callBack(response);
                }
                try{
                    var allHeaders = headerObj.getAllResponseHeaders();
                    $("#X-RateLimit-Limit").text("").text(allHeaders.split("\n")[0].split(": ")[1]);
                    $("#X-RateLimit-Remaining").text("").text(allHeaders.split("\n")[1].split(": ")[1]);
                }catch(e){
                    allHeaders.split("\n")[0].split(": ")[1];
                }
                
                
            },
            error: function(response) {            
            
            }
        });
    }
}