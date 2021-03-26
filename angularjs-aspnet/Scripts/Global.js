
var app = angular.module("MyApp", []);

app.controller("MyCntrl", ["$scope", "$http", function Controller($scope, $http) {
    $http.get("/Home/Veriler").success(function (res) {
        $scope.Product = res;
    });

    $scope.selectAll = function () {
        if ($scope.isSelectAll) {
            angular.forEach($scope.Product, function (item) {
                item.IsDeleted = true;
            });
        }
        else {
            angular.forEach($scope.Product, function (item) {
                item.IsDeleted = false;
            });
        }
    }
    $scope.DelSites = function (id) {
        var deletedSites = [];
        var list = [];
        angular.forEach($scope.Product, function (item) {
            if (item.IsDeleted) {
                if (item.p_id != null) {
                    deletedSites.push(item.p_id);
                }
            }
            else {
                list.push(item);
            }
        });
        if (deletedSites.length > 0) {
            $http.post("/Home/DelSites", deletedSites).success(function () {
                console.log("Kayıtlar Başarı ile silindi!")
            }).error(function (ex) {
                console.log(ex);
            });
        }
        $scope.Product = [];
        angular.forEach(list, function (item) {
            $scope.Product.push(item);
        });
    }

    $scope.SaveData = function () {
        var data = { p_name: $scope.pname, k_name: $scope.kname, p_price: $scope.price, kdv: $scope.kdv, stok: $scope.stok };
        $http.post("/Home/SaveSites", data).success(function (siteList) {
            $scope.Product = siteList;
        }).error(function (ex) {
            console.log(ex);
        });


    }
    $scope.Update = function (pid, pname, kname, fiyat, kdv, stok) {
        $scope.p_id = pid;
        $scope.p_name = pname;
        $scope.k_name = kname;
        $scope.p_price = fiyat;
        $scope.kdv = kdv;
        $scope.stok = stok;

        var data = { p_name: $scope.p_name, k_name: $scope.k_name, p_price: $scope.p_price, kdv: $scope.kdv, stok: $scope.stok, p_id: $scope.p_id };
        $http.post("/Home/UpdateSite", data).success(function (siteList) {
            $scope.Product = siteList;
        }).error(function (ex) {
            console.log(ex);
        });
    };
}]);

