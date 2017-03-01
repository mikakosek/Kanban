    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            opacity: 0.5,
            cursor: "move"
        }).disableSelection();
    }

    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    $('#addColumnModalBtn').click(function(){
        createColumn();    
    });
    $('#addColumnModal').on("shown.bs.modal", function () {
        $('#nameColumn').val("").focus();
    });
    $('#addColumnModal').keypress(function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            createColumn();
        }
    });
    function createColumn() {
        var name = $('#nameColumn').val();
        $.ajax({
            url: baseUrl + '/column',
    		method: 'POST',
    		data: {
                name: name
    		},
    		success: function(response){
    			var column = new Column(response.id, name);
                board.addColumn(column);
          	}
        });        
        $('#addColumnModal').modal('hide');        
    }
