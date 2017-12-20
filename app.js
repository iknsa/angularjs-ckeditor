/**
 * Created by PhpStorm.
 * User: iKNSA
 * Date: 20/12/2017
 * Time: 20:54
 */

'use strict';

var iKNSAAngularJSCkeditor = angular.module('iKNSAAngularJSCkeditor', []);

iKNSAAngularJSCkeditor.directive('iknsaCkeditor', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            error: '=',
            config: '='
        },
        link: function (scope, element, attrs, ngModel) {
            if (typeof CKEDITOR === 'undefined' || !ngModel) {
                return;
            }

            scope.required = attrs.required || false;
            scope.cols = attrs.cols || 6;

            scope.label = attrs.label || attrs.name;
            scope.name = attrs.name || scope.label;

            if (scope.name) {
                scope.name = scope.name.toLowerCase().replace(/[^a-z0-9]/gi, '_');
            }

            var config, editor, updateModel;

            config = scope.config || {
                removePlugins: 'about,floatingspace',
                removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript'
        };

            config = element.extend({}, config);

            editor = CKEDITOR.replace(element[0], config);

            updateModel = function () {
                return scope.$apply(function () {
                    return ngModel.$setViewValue(editor.getData());
                });
            };

            editor.on('instanceReady', function () {
                editor.on('change', updateModel);
                editor.on('dataReady', updateModel);
                editor.on('key', updateModel);
                editor.on('paste', updateModel);
                editor.on('selectionChange', updateModel);
                return editor.setData(ngModel.$viewValue);
            });

            return ngModel.$render = function () {
                return editor.setData(ngModel.$viewValue);
            };
        }
    };
});
 