angular.module('QETestApp', [])
    .controller('QETestController', function () {
        var QETest = this;
        QETest.Index = 0;
        QETest.List = [
            { index: 1, operator: '+', value: '10' },
            { index: 10, operator: '-', value: '25' },
            { index: 2, operator: '/', value: '30' },
            { index: 6, operator: '*', value: '100' },
            { index: 4, operator: '-', value: '12' }
        ];

        QETest.Add = function (index) {
            if(index == 0)
            {
                var idx = QETest.List.findIndex(function(tmp){
                    return tmp.index == QETest.txtIndex;
                });
                if(idx < 0)
                {
                    QETest.List.push({ index: QETest.txtIndex, operator: QETest.txtOperator, value: QETest.txtValue });
                }
            }
            else
            {
                var idx = QETest.List.findIndex(function(tmp){
                    return index == tmp.index;
                });
                QETest.List[idx].index = QETest.txtIndex;
                QETest.List[idx].operator = QETest.txtOperator;
                QETest.List[idx].value = QETest.txtValue;
            }
            QETest.Calculator();
        };

        QETest.BeginEdit = function (index) {
            var item = QETest.List.find(function(tmp){
                return index == tmp.index;
            });
            QETest.txtIndex = item.index;
            QETest.txtOperator = item.operator;
            QETest.txtValue = item.value;
            QETest.Index = index;
        };

        QETest.BeginAdd = function (index) {
            QETest.txtIndex = '';
            QETest.txtOperator = '';
            QETest.txtValue = '';
            QETest.Index = 0;
        };

        QETest.BeginDelete = function(index) {
            QETest.Index = index;
            QETest.Confirm = "Bạn có chắc chắn muốn xóa luật lệ có trọng số bằng " + index + "?";
        };

        QETest.Delete = function(index) {
            var idx = QETest.List.findIndex(function(tmp){
                return index == tmp.index;
            });
            QETest.List.splice(idx, 1);
            QETest.Calculator();
        };

        QETest.Calculator = function () {
            QETest.List = QETest.List.sort(function(a,b){ return a.index-b.index });
            if(isNaN(QETest.txtInput))
            {
                //alert('Bạn phải nhập số');
            }
            else
            {
                total = parseFloat(QETest.txtInput);
                angular.forEach(QETest.List, function(item) {
                    expr = total + item.operator + item.value;
                    total = eval(expr);
                });
                QETest.txtOutput = total;
            }
        };

    });