var DynamicDropdownView = function() {

    this.elem = null;
}

DynamicDropdownView.prototype = {

    generateLayout: function(elem) {

        this.elem = elem;

        var template =  '<div id="listAdnetworks" class="input-wrap-autocomplete">\
                            <input type="text" class="input-wrap-autocomplete__field" placeholder="Selecione">\
                            <input type="hidden" class="input-wrap-autocomplete__field--hidden" name="' + this.getName() + '">\
                            <div data-status="off" class="input-wrap-autocomplete__arrow">\
                                <i class="mdi mdi-chevron-down" aria-hidden="true"></i>\
                            </div>\
                            <ul class="autocomplete-options">' + this.getContent() + '</ul>\
                        </div>';

        var html = document.createElement("div");
            html.innerHTML = template;

        this.elem.parentNode.replaceChild(html, this.elem);
        this.elem = html;
        
        this.boxItems  = this.elem.querySelector(".autocomplete-options");
        this.boxStatus = this.elem.querySelector(".input-wrap-autocomplete__arrow");
        this.searchField = this.elem.querySelector(".input-wrap-autocomplete__field");
        this.searchFieldHidden = this.elem.querySelector(".input-wrap-autocomplete__field--hidden");
    },

    getName: function() {
        
        return this.elem.getAttribute("name");

    },
    
    getContent: function() {

        var html = "";

        this.elem.querySelectorAll("option").forEach(function(element) {
            
            html += '<li class="autocomplete-options__listitem" data-id="' + element.value + '">' + element.textContent + '</li>';
        });

        return html;

    }
}