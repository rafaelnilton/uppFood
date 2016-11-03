(function() {
	'use strict';

	angular.module('foodControllers', [])



	.controller('FoodControllers', FoodControllers);


	/**
	 * @name FoodControllers
	 * 
	 */

	/* @ngInject */
	function FoodControllers($rootScope,$scope, $http) {
        
        
        $scope.total = 0;
        $scope.pedidos = [];
        $scope.pedidosBackup = [];
        

        $scope.pedidoRealizado = pedidoRealizado;
        $scope.cancelarPedido = cancelarPedido;
        $scope.menosPedido = menosPedido;
        $scope.maisPedido = maisPedido;
        $scope.pagar = pagar;
        $scope.pagamentoFinal = pagamentoFinal;
        $scope.dados = null;
        $scope.getdados = getDados();
        var numPedido = 0;
        
        $scope.getData = getData();

        function getDados() {
            $http.get('menu.json').success(function(data) {
                $scope.dados = data;
            });

        }

       function pedidoRealizado(produto, valor){
           
           
             swal({
                title: "Do you want to confirm?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    var novoPedido = {
                        index       : numPedido,
                        produto     : produto,
                        valor       : valor,
                        quantidade  : 1
                    };
                    $scope.pedidosBackup.push(novoPedido);
                    $scope.pedidos = angular.copy($scope.pedidosBackup);
                    var i;
                    $scope.total = 0;
                    for(i=0; i < $scope.pedidos.length; i++) {
                        $scope.total += parseFloat($scope.pedidos[i].valor);
                    }
                    numPedido++;
                    $scope.$apply();
                    save();
                    swal("Done!", "", "success");
                } else {
                    swal("Canceled!", "", "error");
                }
            });


        }

        function cancelarPedido(numPedido) {
            swal({
                title: "Do you want to cancel?",
                text: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Confirme",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    numPedido = parseInt(numPedido);
                    swal("Canceled!", "", "success");
                    $scope.pedidos.splice(numPedido, 1);
                    $scope.total = 0;
                    var y;
                    for(y=0; y < $scope.pedidos.length; y++) {
                        $scope.total += parseFloat($scope.pedidos[y].valor);
                    }
                    $scope.$apply();
                    save();
                } else {
                    swal("Canceled!", "", "error");
                }
            });
        }
        
        
        function menosPedido(numPedido) {

            numPedido = parseInt(numPedido);
            if($scope.pedidos[numPedido].quantidade > 1) {
                $scope.pedidos[numPedido].quantidade = $scope.pedidos[numPedido].quantidade-1;
                $scope.total = 0;
                var y;
                for(y=0; y < $scope.pedidos.length; y++) {
                    $scope.total += parseFloat($scope.pedidos[y].valor * $scope.pedidos[y].quantidade);
                }
                save();
            }else {
                swal("Minimum quantity is 1!", "", "warning");
            }
        }
        
        function maisPedido(numPedido) {
            numPedido = parseInt(numPedido);
            $scope.pedidos[numPedido].quantidade +=1;
            $scope.total = 0;
            var y;
            for(y=0; y < $scope.pedidos.length; y++) {
                $scope.total += parseFloat($scope.pedidos[y].valor * $scope.pedidos[y].quantidade);
            }
            save();
        }

        
        function save() {
            var str = JSON.stringify($scope.pedidos);
            localStorage.setItem("pedidos", str);
            localStorage.setItem("total", $scope.total);            
        }
        
        function getData() {
            var str = localStorage.getItem("pedidos");
            $scope.pedidos = JSON.parse(str);
            $scope.total = localStorage.getItem("total");
            if(!$scope.pedidos) {
                $scope.pedidos = [];
                $scope.total = 0;
            }
            
        }
                
       function pagar() {
           
            localStorage.clear();
            swal("Success!", "", "success");
            $("#btPagar").addClass('btDesativado');
            $("#btPagar").attr('onclick', '');
        }
        
        function pagamentoFinal() {
           swal("Transação realizada com sucesso!", "", "success");

        }
        
        
        
	};
	
})();