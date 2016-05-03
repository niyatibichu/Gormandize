(function () {
    'use strict';
    var app = angular.module("myapp", []);

    app.controller("newcontroller1", ['$scope', '$http', function ($scope, $http) {

        $scope.register = function () {
            $('#modal2').openModal();
        };

        $scope.addreview = function () {
            $('#rev').openModal();
        };
        $scope.addreview_existing = function (na,avrate) {
            $('#rev_exist').openModal();
            $scope.na = na;
            $scope.avrate=avrate;
        };

        $scope.about_us = function () {
            $('#modal3').openModal();
        };

        $scope.getstars_for_review = function (m) {
            return new Array(m);
        };

        $scope.getstars = function (n) {
            return new Array(n);
        };

        $scope.clearSearch = function () {
            $scope.searchAll = null;
        };
        //star rating
        $scope.starRating1 = 4;
        $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

        $scope.click1 = function (param) {
            console.log('Click(' + param + ')');
        };

        $scope.mouseHover1 = function (param) {
            console.log('mouseHover(' + param + ')');
            $scope.hoverRating1 = param;
        };

        $scope.mouseLeave1 = function (param) {
            console.log('mouseLeave(' + param + ')');
            $scope.hoverRating1 = param + '*';
        };

        //post review existing
        $scope.post_review_exist = function (r,na) {   
               
            $http({
                method: 'POST',
                url: '/review_update',
                data: {
                    "id":$scope.na._id,
                    "res_name":$scope.na.res_name,
                    "avg_rating": ($scope.starRating1 +$scope.avrate) / 2,
                    "reviews": 
                        {
                            "user_id": r.usname1,
                            "username": r.usname1,
                            "rating": $scope.starRating1,
                            "text": r.new_comment1
                        }
                    
                }
            }).then(function successCallback(response) {

            }, function errorCallback(response) {

            });

        };

        //post review
        $scope.post_review = function () {
            $http({
                method: 'POST',
                url: '/rests',
                data: {
                    "res_name": $scope.new_res_name,
                    "picname": $scope.img_upload,
                    "attachments": {
                        "name": $scope.img_upload,
                        "content_type": "image/jpeg"
                    },
                    "avg_rating": $scope.starRating1,
                    "reviews": [
                        {
                            "user_id": $scope.usname,
                            "username": $scope.usname,
                            "rating": $scope.starRating1,
                            "text": $scope.new_comment
                        }
                    ]
                }
            }).then(function successCallback(response) {

            }, function errorCallback(response) {

            });

        };


        $scope.see_reviews = function (na1) {
            $('#seereviewModal').openModal();
            $scope.na1 = na1;
        };

        $scope.hotel = [];
        $http({
            method: 'GET',
            url: '/rests'
        }).then(function successCallback(response) {
            $scope.hotel = response.data;
        }, function errorCallback(response) {

        });

    }]);

    app.directive('starRating', function () {
        return {
            scope: {
                rating: '=',
                maxRating: '@',
                readOnly: '@',
                click: "&",
                mouseHover: "&",
                mouseLeave: "&"
            },
            restrict: 'EA',
            template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
            compile: function (element, attrs) {
                if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                    attrs.maxRating = '5';
                };
            },
            controller: function ($scope, $element, $attrs) {
                $scope.maxRatings = [];

                for (var i = 1; i <= $scope.maxRating; i++) {
                    $scope.maxRatings.push({});
                };

                $scope._rating = $scope.rating;

                $scope.isolatedClick = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope.rating = $scope._rating = param;
                    $scope.hoverValue = 0;
                    $scope.click({
                        param: param
                    });
                };

                $scope.isolatedMouseHover = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope._rating = 0;
                    $scope.hoverValue = param;
                    $scope.mouseHover({
                        param: param
                    });
                };

                $scope.isolatedMouseLeave = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope._rating = $scope.rating;
                    $scope.hoverValue = 0;
                    $scope.mouseLeave({
                        param: param
                    });
                };
            }
        };
    });

    app.controller('RegController', ['$scope', '$http', function ($scope, $http) {
        $scope.master = {};

        $scope.update = function (user) {
            $scope.master = angular.copy(user);
        };

      
        $scope.update = function () {

            $http({
                method: 'POST',
                url: '/myusers',
                data: {
                    "firstname": $scope.fname,
                    "lastname": $scope.lname,
                    "username": $scope.uname,
                    "password": $scope.pwd,
                    "email": $scope.email
                }
            }).then(function successCallback(response) {

            }, function errorCallback(response) {

            });
        };
    }]);

})();


