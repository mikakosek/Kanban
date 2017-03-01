    var $activeColumn; //przechowuje informację o kolumnie, do której są dodawane nowe karty
    var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
    var myHeaders = {
        'X-Client-Id': 1557,
        'X-Auth-Token': '2422c88601766e7af3ad365b4c25c0f7'
    };

    $.ajaxSetup({
        headers: myHeaders
    });

    $.ajax({
        url: baseUrl + '/board',
        method: 'GET',
        success: function(response) {
            setupColumns(response.columns);
        }
    });

    function setupColumns(columns) {
        columns.forEach(function (column) {
            var col = new Column(column.id, column.name);
            board.addColumn(col);  
            setupCards(col, column.cards);
        });
    }

    function setupCards(col, cards) {
        cards.forEach(function (card) {
            var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
            col.addCard(card);
        })
    }
    

    





    

